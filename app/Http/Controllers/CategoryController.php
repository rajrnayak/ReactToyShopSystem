<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    function index()
    {
        return Inertia::render('admin/category/Index');
    }

    function create()
    {
        return Inertia::render('admin/category/Create');
    }

    function storeOrUpdate(Request $request)
    {

        $request->validate([
            'name' => ['required', 'max:50'],
            'sub_category.*' => ['required']
        ]);


    }

}
