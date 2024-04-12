<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Expense extends Model
{
    use HasFactory;

    protected $table = 'expenses';

    protected $guarded = [];

    public function subCategories() : HasOne
    {
        return $this->hasOne(SubCategory::class,'id' ,'sub_category_id');
    }

    public function vendors() : HasOne
    {
        return $this->hasOne(AgencyOrVendor::class,'id' ,'vendor_id');
    }
}
