<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TransactionController extends Controller
{
    function index()
    {
        $transactions = Transaction::with(['users','vendors'])->get();
        return Inertia::render('admin/transaction/Index',['transactions' => $transactions]);
    }
}
