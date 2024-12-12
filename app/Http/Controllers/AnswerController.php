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

use Inertia\Inertia;
use Inertia\Response;

class AnswerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
            'quiz_id' => 'required|integer|exists:quizzes,id',
            'answers' => 'required|array',
            'answers.*.question_id' => 'required|integer|exists:questions,id',
            'answers.*.answer' => 'required', 
        ]);

        if ($validator->fails()) {
            // return response()->json($validator->errors(), 422);
            return redirect()->back()->withErrors($validator)->withInput();
        }

        $userId = auth()->id();
        $quizId = $request->input('quiz_id');
        $answers = $request->input('answers');

        $formattedAnswers = collect($answers)->map(function ($answer) use ($userId, $quizId) {
            return [
                'quiz_id' => $quizId,
                'question_id' => $answer['question_id'],
                'user_id' => $userId,
                'answer' => json_encode(
                    is_array($answer['answer']) ? $answer['answer'] : [$answer['answer']]
                ), 
            ];
        })->toArray();

        Answers::insert($formattedAnswers);

         return redirect()->route('results')
            ->with('success', 'Successfully Submitted !');
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
        $quiz = Quizzes::find($id);
        $question = Questions::where('quiz_id',$id)->get();
        $data = [
            'quiz'=>$quiz,
            'questions'=>$question
        ];
        return Inertia::render('Answer/Edit',$data);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validator = Validator::make($request->all(), [
            'quiz_id' => 'required|integer|exists:quizzes,id',
            'question_id' => 'required',
            'user_id' => 'required|integer|exists:users,id',
            'answer' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $answer = Answers::find($id);
        $answer->update([
            'quiz_id' => $request->quiz_id,
            'question_id' => $request->question_id,
            'user_id' => $request->user_id,
            'answer' => $request->answer,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Answer updated !',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $answer = Answers::find($id);
        $answer->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'Answer deleted !',
        ]);
    }

    public function calculateMatch(Request $request)
    {
        $request->validate([
            'input1' => 'required|string',
            'input2' => 'required|string',
        ]);

        $input1 = strtoupper($request->input1);
        $input2 = strtoupper($request->input2);

        $uniqueChars = count_chars($input1, 3);
        $uniqueCount = strlen($uniqueChars);
        $matchCount = 0;

        foreach (str_split($uniqueChars) as $char) {
            if (str_contains($input2, $char)) {
                $matchCount++;
            }
        }

        $percentage = ($uniqueCount > 0) ? ($matchCount / $uniqueCount) * 100 : 0;

        return response()->json([
            'match_count' => $matchCount,
            'percentage' => round($percentage, 2),
        ]);
    }

}
