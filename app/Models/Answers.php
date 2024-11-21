<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Answers extends Model
{
    protected $fillable = [
        'quiz_id',
        'question_id',
        'user_id',
        'answer',
    ];

    // If 'options' is JSON, you can cast it
    protected $casts = [
        'answer' => 'array',
    ];

    public function question() {
        return $this->belongsTo(Questions::class);
    }

    public function quiz() {
        return $this->belongsTo(Quizzes::class);
    }
}
