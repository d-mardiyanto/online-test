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

        $groupedAnswers = $answers->groupBy('quiz_id');
        $score = 100;

        foreach ($groupedAnswers as $quizId => $quizAnswers) {
            $correctCount = 0;
            $wrongCount = 0;

            foreach ($quizAnswers as $answer) {
                $quiz = $answer->quiz;
                $result_header = $answer->result;
                $correctAnswer = $answer->question->correct_answer;
                $userAnswer = $answer->answer;

                // Check if the user's answer is correct
                if ($userAnswer == $correctAnswer) {
                    $correctCount++; // Count correct answers
                } else {
                    $wrongCount++; // Count wrong answers
                }
            }
            $nSoal = $correctCount + $wrongCount; // Jumlah Seluruh Soal
            $pn = $score/$nSoal; // Point Per Soal
            $tn = $pn * $correctCount; // Score Akhir
            $results[$quizId] = [
                'quiz' => $quiz,
                'header' => $result_header,
                'score' => $tn,
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
