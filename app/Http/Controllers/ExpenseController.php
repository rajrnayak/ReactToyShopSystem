<?php

namespace App\Http\Controllers;

use App\Http\Requests\ExpenseRequest;
use App\Models\AgencyOrVendor;
use App\Models\Category;
use App\Models\Expense;
use App\Models\SubCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExpenseController extends Controller
{
    function index()
    {
        $expenses = Expense::with(['subCategories','vendors'])->get();
        return Inertia::render('admin/expense/Index',['expenses' => $expenses]);
    }

    function storeOrUpdate(ExpenseRequest $request,Expense $expense)
    {

        $expense->fill([
            'date' => $request->input('date'),
            'time' => $request->input('time'),
            'sub_category_id' => $request->input('sub_category'),
            'vendor_id' => $request->input('vendor'),
            'amount' => $request->input('amount'),
        ])->save();

    }

    function destroy(Expense $expense)
    {
        dd($expense);
        // $agency_or_vendor->delete();
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
