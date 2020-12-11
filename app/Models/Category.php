<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $table = "category";

    protected $fillable = [
        'category',
        'code',
        'description',
        'value',
        'user_id',
        'create_at',
        'update_at',
        'purse'
    ];
    public $timestamps = false;
}
