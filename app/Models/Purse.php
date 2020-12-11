<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Purse extends Model
{
    use HasFactory;

    protected $table = "purse";

    protected $fillable = [
        "name",
        "reference",
        "description",
        "status",
        "user_id",
        "create_at",
        "update_at"
    ];

    public function user_id() {
        return $this->belongsTo(User::class, 'user_id');
    }
}
