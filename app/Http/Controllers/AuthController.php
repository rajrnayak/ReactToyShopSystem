<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AuthController extends Controller
{
    function login()
    {
        return Inertia::render('Login');
    }

    function  loginPost(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['bail' ,'required', 'max:50', 'email'],
            'password' => ['bail' ,'required','min:6','max:8'],
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            return;
        }else {
            return redirect()->back()->withErrors(['email' => 'These credentials do not match our records.']);
        }
    }

    public function logout(){
        if (Auth::check()) {
            Auth::logout();
            Session()->flush();
            Session()->regenerate();
            return to_route('login');
        }
        return to_route('login');
    }

}
