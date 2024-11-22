<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Quizzes extends Model
{
    protected $fillable = [
        'title',
        'description',
        'start_date',
        'exp_date',
        'time_limit',
        'pass_mark',
        'attempt',
        'created_by',
    ];
    
    public function results()
    {
        return $this->hasMany(Results::class,'quiz_id');
    }
}
