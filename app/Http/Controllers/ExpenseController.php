<?php

namespace App\Http\Controllers;

use App\Http\Requests\ExpenseRequest;
use App\Models\AgencyOrVendor;
use App\Models\Category;
use App\Models\Expense;
use App\Models\SubCategory;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ExpenseController extends Controller
{
    function index()
    {

        $expenses = Expense::with(['subCategories:id,name,category_id',
        'subCategories.categories' => function ($query) {
            $query->select('id','name');
        },
        'vendors:id,name'])->get(['id','date','time','sub_category_id','vendor_id','amount']);

        return Inertia::render('admin/expense/Index',['expenses' => $expenses]);
    }

    function storeOrUpdate(ExpenseRequest $request,Expense $expense)
    {

        // $expense->fill([
        //     'date' => $request->input('date'),
        //     'time' => $request->input('time'),
        //     'sub_category_id' => $request->input('sub_category'),
        //     'vendor_id' => $request->input('vendor'),
        //     'amount' => $request->input('amount'),
        // ])->save();

        // transaction

        $data = [
            'date' => $request->input('date'),
            'vendor_id' => $request->input('vendor'),
            'user_id' => Auth::user()->id,
            'credit' => 0,
            'debit' => 0,
            'balance' => 0,
           ];

        $new_amount = $request->input('amount');
        $old_amount = $expense->amount;

        $vendor = AgencyOrVendor::where('id',$data['vendor_id'])->get('balance');

        if($expense->id == null){

            $data['debit'] = $new_amount;
            $data['balance'] = $vendor[0]->balance - $data['debit'];

        }else{
            if ($new_amount > $old_amount) {

                $data['debit'] = $new_amount - $old_amount;
                $data['balance'] = $vendor[0]->balance - $data['debit'];

            }elseif($new_amount < $old_amount){

                $data['credit'] = $old_amount - $new_amount;
                $data['balance'] = $vendor[0]->balance + $data['credit'];

            }
        }

        $transaction = new Transaction;
        $transaction->fill([
            'date' => $data['date'],
            'vendor_id' => $data['vendor_id'],
            'user_id' => $data['user_id'],
            'credit' => $data['credit'],
            'debit' => $data['debit'],
            'balance' => $data['balance'],
        ])->save();

        $vendor = AgencyOrVendor::where('id', $data['vendor_id'])
        ->update(['balance' => $data['balance']]);

    }

    function destroy(Expense $expense)
    {
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
