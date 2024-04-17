<?php

namespace App\Http\Controllers;

use App\Http\Requests\PaymentRequest;
use App\Models\AgencyOrVendor;
use App\Models\Payment;
use App\Models\Transaction;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PaymentController extends Controller
{
    function index()
    {

        $query = Payment::query();

        $query->with([
            'vendors:id,name',
        ]);

        $query->select([
            'id',
            'vendor_id',
            'date',
            DB::raw("DATE_FORMAT(time, '%H:%i') as time"),
            'type',
            'amount',
        ]);

        return Inertia::render('admin/payment/Index',['payments' => $query->get()]);
    }

    function storeOrUpdate(PaymentRequest $request,Payment $payment)
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

            $vendor = AgencyOrVendor::where('id', $data['vendor_id'])->first();

            $new_amount = $request->amount;
            $old_amount = $payment->amount;

            if($payment->id == null){

                if($request->type == '1'){

                    $data['credit'] = $new_amount;
                    $data['balance'] = $vendor->balance + $data['credit'];

                }
                elseif ($request->type == '2') {

                    $data['debit'] = $new_amount;
                    $data['balance'] = $vendor->balance - $data['debit'];

                }
            }
            else
            {

                if ($data['vendor_id'] != $payment->vendor_id) {

                    $this->olderVendorTransaction($data , $payment->vendor_id ,$payment->type, $old_amount);

                    if($request->type == 1){

                        $data['credit'] = $new_amount;
                        $data['balance'] = $vendor->balance + $data['credit'];

                    }
                    elseif ($request->type == 2) {

                        $data['debit'] = $new_amount;
                        $data['balance'] = $vendor->balance - $data['debit'];

                    }

                }
                else{

                    if($request->type == $payment->type){

                        if($request->type == 1){

                            if ($new_amount > $old_amount) {

                                $data['credit'] = $new_amount - $old_amount;
                                $data['balance'] = $vendor->balance + $data['credit'];

                            }elseif($new_amount < $old_amount){

                                $data['debit'] = $old_amount - $new_amount;
                                $data['balance'] = $vendor->balance - $data['debit'];

                            }elseif($new_amount == $old_amount){

                                $data['balance'] = $vendor->balance;

                            }

                        }elseif ($request->type == 2) {

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

                    }else{

                        $this->oldTypeTransaction($data,$request->type,$old_amount,$vendor->balance);

                        $updated_vendor = AgencyOrVendor::where('id', $data['vendor_id'])->first();

                        if($request->type == 1){

                            $data['credit'] = $new_amount;
                            $data['balance'] = $updated_vendor->balance + $data['credit'];

                        }elseif ($request->type == 2) {

                            $data['debit'] = $new_amount;
                            $data['balance'] = $updated_vendor->balance - $data['debit'];

                        }
                    }
                }
            }

            $this->transaction($data);

            // transaction end

            $payment->fill([
                'vendor_id' => $request->vendor,
                'date' => $request->date,
                'time' => $request->time,
                'type' => $request->type,
                'amount' => $request->amount,
            ])->save();

            DB::commit();

        } catch (\Throwable $th) {

            DB::rollBack();
            throw $th;
        }
    }

    function olderVendorTransaction($data , $vendor_id , $type , $old_amount){

        $old_vendor = AgencyOrVendor::where('id',$vendor_id)->first();

        if($type != 1){

            $data['credit'] = $old_amount;
            $data['balance'] = $old_vendor->balance + $data['credit'];

        }elseif ($type != 2) {

            $data['debit'] = $old_amount;
            $data['balance'] = $old_vendor->balance - $data['debit'];

        }

        $data['vendor_id'] = $vendor_id;

        $this->transaction($data);

    }

    function oldTypeTransaction($data,$type,$old_amount,$balance){

        if($type == 1){

            $data['credit'] = $old_amount;
            $data['balance'] = $balance + $data['credit'];

        }elseif ($type == 2) {

            $data['debit'] = $old_amount;
            $data['balance'] = $balance - $data['debit'];

        }

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

    function destroy(Payment $payment)
    {

        $data = [
            'date' => Carbon::now(),
            'vendor_id' => $payment->vendor_id,
            'user_id' => Auth::user()->id,
            'credit' => 0,
            'debit' => 0,
            'balance' => 0,
           ];

        $old_vendor = AgencyOrVendor::where('id',$data['vendor_id'])->first();

        if($payment->type != 1){

            $data['credit'] = $payment->amount;
            $data['balance'] = $old_vendor->balance + $data['credit'];

        }elseif ($payment->type != 2) {

            $data['debit'] = $payment->amount;
            $data['balance'] = $old_vendor->balance - $data['debit'];

        }

        $this->transaction($data);

        $payment->delete();
    }

    function getVendors(){
        $vendors = AgencyOrVendor::all(['id','name']);
        return $vendors;
    }

}
