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

    function storeOrUpdate(User $user,Request $request)
    {
        $request->validate([
            'user_name' => ['required', 'max:50'],
            'email' => ['required', 'max:50', 'email'],
        ]);

        $user->fill([
            'user_name' => $request->user_name,
            'email' => $request->email,
            'password' => Hash::make('123456'),
        ])->save();
    }

    function destroy(User $user){
        $user->delete();
    }

}
