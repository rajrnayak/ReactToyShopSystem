<?php

namespace App\Http\Controllers;

use App\Models\AgencyOrVendor;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AgencyOrVendorController extends Controller
{
    function index()
    {
        $agencies_or_vendors = AgencyOrVendor::all();
        return Inertia::render('admin/agencyOrVendor/Index',['agencies_or_vendors' => $agencies_or_vendors]);
    }

    function storeOrUpdate(Request $request ,AgencyOrVendor $agency_or_vendor)
    {
        $request->validate([
            'type' => ['required'],
            'name' => ['required', 'max:50'],
            'mobile_number' => ['required', 'max:10'],
            'email' => ['required', 'max:50', 'email'],
        ]);

        $agency_or_vendor->fill([
            'type' => $request->type,
            'name' => $request->name,
            'mobile_number' => $request->mobile_number,
            'email' => $request->email,
        ])->save();

    }

    function destroy(AgencyOrVendor $agency_or_vendor)
    {
        $agency_or_vendor->delete();
    }
}
