<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Transaction extends Model
{
    use HasFactory;

    protected $table = 'transactions';

    protected $guarded = [];

    public function users() : HasOne
    {
        return $this->hasOne(User::class,'id' ,'user_id');
    }

    public function vendors() : HasOne
    {
        return $this->hasOne(AgencyOrVendor::class,'id' ,'vendor_id');
    }

}
