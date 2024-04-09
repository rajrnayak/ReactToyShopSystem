<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AgencyOrVendor extends Model
{
    use HasFactory;
    protected $table = 'agency_or_vendors';
    protected $primary_key = 'id';
    protected $fillable = [
        'type',
        'name',
        'mobile_number',
        'email',
    ];
}
