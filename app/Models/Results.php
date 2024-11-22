<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Results extends Model
{
    protected $fillable = [
        'quiz_id',
        'user_id',
        'work_date',
        'start_time',
        'end_time',
        'score',
    ];

    // Relationship with Quiz
    public function quiz()
    {
        return $this->belongsTo(Quizzes::class,'quiz_id');
    }

    // Relationship to the user
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
