<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Questions extends Model
{
    protected $fillable = [
        'quiz_id',
        'type',
        'order_number',
        'content',
        'options',
        'correct_answer',
    ];

    // If 'options' is JSON, you can cast it
    protected $casts = [
        'options' => 'array',
        'correct_answer' => 'array'
    ];

    // Relationship with Quiz
    public function quiz()
    {
        return $this->belongsTo(Quizzes::class);
    }
}
