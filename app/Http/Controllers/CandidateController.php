<?php

namespace App\Http\Controllers;

use App\Models\Candidates;
use App\Models\Answers;
use App\Models\User;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

use Inertia\Inertia;
use Inertia\Response;

class CandidateController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $candidates = User::where('roles','Candidate')->get();
        $data = [
            'candidates'=>$candidates
        ];
        return Inertia::render('Candidate/Main',$data);
    }
    
    public function edit(string $id)
    {
        $candidate = User::find($id);
        $answers = Answers::with(['question','quiz','result'])
                    ->where('user_id',$id)->get(); // Fetch answers with related questions
        $results = [];

        // Group answers by quizzes
        $groupedAnswers = $answers->groupBy('quiz_id');

        foreach ($groupedAnswers as $quizId => $quizAnswers) {
            $score = 0;
            $correctCount = 0;
            $wrongCount = 0;

            foreach ($quizAnswers as $answer) {
                $quiz = $answer->quiz;
                $result_header = $answer->result;
                $correctAnswer = $answer->question->correct_answer;
                $userAnswer = $answer->answer;

                // Check if the user's answer is correct
                if ($userAnswer == $correctAnswer) {
                    $score += 5; // Add points
                    $correctCount++; // Count correct answers
                } else {
                    $score -= 3; // Subtract points
                    $wrongCount++; // Count wrong answers
                }
            }

            // Save results for this quiz
            $results[$quizId] = [
                'quiz' => $quiz,
                'header' => $result_header,
                'score' => $score,
                'correct' => $correctCount,
                'wrong' => $wrongCount,
            ];
        }
        $data = [
            'candidate'=>$candidate,
            'results'=>$results
        ];
        return Inertia::render('Candidate/Edit',$data);
    }
}
