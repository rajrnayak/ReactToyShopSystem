<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AgencyOrVendor extends Model
{
    use HasFactory;

    protected $table = 'agencies_vendors';

    protected $guarded = [];

    public const TYPE = [
        'agency' => 1,
        'vendor' => 2,
        'individual' => 3,
    ];
}
