<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends Controller
{
    function index()
    {
        $users = User::all();
        return Inertia::render('admin/user/Index',['all_users' => $users]);
    }

    function create()
    {
        return Inertia::render('admin/user/Create');
    }

    function storeOrUpdate(User $user,Request $request)
    {
        $user->fill([
            'user_name' => $request->user_name,
            'email' => $request->email,
            'password' => Hash::make('123456'),
        ])->save();
    }
}
