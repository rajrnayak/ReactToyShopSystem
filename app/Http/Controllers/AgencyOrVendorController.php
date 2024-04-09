<?php

namespace App\Http\Controllers;

use App\Models\AgencyOrVendor;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AgencyOrVendorController extends Controller
{
    function index()
    {
        $agency_or_vendors = AgencyOrVendor::all();
        return Inertia::render('admin/agencyOrVendor/Index',['agency_or_vendors' => $agency_or_vendors]);
    }

    function form()
    {
        return Inertia::render('admin/agencyOrVendor/Form');
    }

    function storeOrUpdate(AgencyOrVendor $agency_or_vendor,Request $request)
    {
        $agency_or_vendor->fill([
            'type' => $request->type,
            'name' => $request->name,
            'mobile_number' => $request->mobile_number,
            'email' => $request->email,
        ])->save();
    }
}
