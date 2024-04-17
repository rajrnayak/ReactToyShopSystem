<?php

namespace App\Http\Controllers;

use App\Http\Requests\ExpenseRequest;
use App\Models\AgencyOrVendor;
use App\Models\Category;
use App\Models\Expense;
use App\Models\SubCategory;
use App\Models\Transaction;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class ExpenseController extends Controller
{
    function index():Response
    {

        $query = Expense::query();

        $query->with([
            'subCategories:id,name,category_id',
            'subCategories.categories' => function ($query) {
                $query->select('id','name');
            },
            'vendors:id,name',
        ]);

        $query->select([
            'id',
            'date',
            DB::raw("DATE_FORMAT(time, '%H:%i') as time"),
            'sub_category_id',
            'vendor_id',
            'amount'
        ]);

        return Inertia::render('admin/expense/Index',['expenses' => $query->get()]);
    }

    function storeOrUpdate(ExpenseRequest $request,Expense $expense)
    {
        try {
            DB::beginTransaction();

            // transaction start

            $data = [
                'date' => $request->date,
                'vendor_id' => $request->vendor,
                'user_id' => Auth::user()->id,
                'credit' => 0,
                'debit' => 0,
                'balance' => 0,
            ];

            $new_amount = $request->amount;
            $old_amount = $expense->amount;

            $vendor = AgencyOrVendor::where('id',$data['vendor_id'])->first();

            if($expense->id == null){

                $data['debit'] = $new_amount;
                $data['balance'] = $vendor->balance - $data['debit'];

            }else{

                if ($data['vendor_id'] != $expense->vendor_id) {

                    $this->olderVendorTransaction($data , $expense->vendor_id , $old_amount);

                    $data['debit'] = $new_amount;
                    $data['balance'] = $vendor->balance - $data['debit'];

                }else{
                    if ($new_amount > $old_amount) {

                        $data['debit'] = $new_amount - $old_amount;
                        $data['balance'] = $vendor->balance - $data['debit'];

                    }elseif($new_amount < $old_amount){

                        $data['credit'] = $old_amount - $new_amount;
                        $data['balance'] = $vendor->balance + $data['credit'];

                    }elseif($new_amount == $old_amount){

                        $data['balance'] = $vendor->balance;

                    }
                }
            }

            $this->transaction($data);

            // transaction end

            $expense->fill([
                'date' => $request->date,
                'time' => $request->time,
                'sub_category_id' => $request->sub_category,
                'vendor_id' => $request->vendor,
                'amount' => $request->amount,
            ])->save();

            DB::commit();

        } catch (\Throwable $th) {

            DB::rollBack();
            throw $th;
        }
    }

    function olderVendorTransaction($data , $vendor_id , $old_amount){

        $old_vendor = AgencyOrVendor::where('id',$vendor_id)->first();

        $data['credit'] = $old_amount;
        $data['balance'] = $old_vendor->balance + $data['credit'];
        $data['vendor_id'] = $vendor_id;

        $this->transaction($data);

    }

    function transaction($data){
        $transaction = new Transaction;
        $transaction->fill([
            'date' => $data['date'],
            'vendor_id' => $data['vendor_id'],
            'user_id' => $data['user_id'],
            'credit' => $data['credit'],
            'debit' => $data['debit'],
            'balance' => $data['balance'],
        ])->save();

        AgencyOrVendor::where('id', $data['vendor_id'])
        ->update(['balance' => $data['balance']]);
    }

    function destroy(Expense $expense)
    {
        $data = [
            'date' => Carbon::now(),
            'vendor_id' => $expense->vendor_id,
            'user_id' => Auth::user()->id,
            'credit' => 0,
            'debit' => 0,
            'balance' => 0,
           ];

        $old_vendor = AgencyOrVendor::where('id',$data['vendor_id'])->first();

        $data['credit'] = $expense->amount;
        $data['balance'] = $old_vendor->balance + $data['credit'];

        $this->transaction($data);

        $expense->delete();
    }

    function getCategories(){
        $categories = Category::all(['id','name']);
        return $categories;
    }

    function getSubCategories($category){
        $sub_categories = SubCategory::where('category_id',$category)->get(['id','name']);
        return $sub_categories;
    }

    function getVendors(){
        $vendors = AgencyOrVendor::all(['id','name']);
        return $vendors;
    }

}
