<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Candidates extends Model
{
    protected $fillable = [
        'photo',
        'name',
        'gender',
        'birthdate',
        'address',
        'religion',
        'email',
        'phone',
        'files',
        'status'
    ];

    // If 'options' is JSON, you can cast it
    protected $casts = [
        'files' => 'array',
    ];
}
