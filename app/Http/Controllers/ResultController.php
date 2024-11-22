<?php

namespace App\Http\Controllers;

use App\Models\Answers;
use App\Models\Results;
use App\Models\Quizzes;
use App\Models\Questions;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

use Illuminate\Validation\Rules;

use Carbon\Carbon;

use Inertia\Inertia;
use Inertia\Response;

class ResultController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $answers = Answers::with(['question','quiz','result'])
                    ->where('user_id',auth()->id())->get(); // Fetch answers with related questions
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
            'results' => $results,
        ];
        return Inertia::render('Results',$data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'quiz_id'   => 'required|exists:quizzes,id',
            'work_date' => 'required',
            'start_time'=> 'required',
        ]);

        if ($validator->fails()) {
            // return response()->json($validator->errors(), 422);
            return redirect()->back()->withErrors($validator)->withInput();
        }

        $result = Results::create([
            'quiz_id' => $request->quiz_id,
            'user_id' => auth()->id(),
            'work_date' => $request->work_date,
            'start_time' => $request->start_time,
        ]);

         return redirect()->route('results.edit',$result->id)
            ->with('success', 'Test Start !');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $result = Results::find($id);
        $quiz = Quizzes::find($result->quiz_id);
        $question = Questions::where('quiz_id',$result->quiz_id)->get();
        $data = [
            'result'=>$result,
            'quiz'=>$quiz,
            'questions'=>$question
        ];
        return Inertia::render('Answer/Test',$data);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validator = Validator::make($request->all(), [
            'end_time'  => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $result = Results::find($id);
        $result->update([
            'end_time'  => $request->end_time,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Work Log Updated successfully !',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $result = Results::find($id);
        $result->delete();
        return response()->json([
            'success' => true,
            'message' => 'Work Log deleted successfully !',
        ]);
    }

    public function calculateScores(string $id)
    {
        $answers = Answers::with('question')
                    ->where('user_id',$id)->get(); // Fetch answers with related questions
        $results = [];

        // Group answers by quizzes
        $groupedAnswers = $answers->groupBy('quiz_id');

        foreach ($groupedAnswers as $quizId => $quizAnswers) {
            $score = 0;
            $correctCount = 0;
            $wrongCount = 0;

            foreach ($quizAnswers as $answer) {
                $correctAnswer = json_decode($answer->question->correct_answer,TRUE);
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
                'score' => $score,
                'correct' => $correctCount,
                'wrong' => $wrongCount,
            ];
        }

        // Pass data to the frontend
        return response()->json([
            'results' => $results,
        ]);
    }
}
