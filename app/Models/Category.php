<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{
    use HasFactory;

    protected $table = 'categories';

    protected $guarded = [];

    public function subCategories() : HasMany
    {
        return $this->hasMany(SubCategory::class, 'category_id', 'id');
    }
}
