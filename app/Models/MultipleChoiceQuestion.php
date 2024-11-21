<?php

namespace App\Models;

class MultipleChoiceQuestion extends Question
{
    public function checkAnswer($userAnswer)
    {
        return $userAnswer === $this->correct_answer;
    }
}
