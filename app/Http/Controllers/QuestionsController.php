<?php

namespace App\Http\Controllers;

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

class QuestionsController extends Controller
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
            'quiz_id' => 'required|exists:quizzes,id',
            'type' => 'required|string',
            'order_number' => 'required|integer',
            'content' => 'required|string',
            'options' => 'required',
            'correct_answer' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
            // return redirect()->back()->withErrors($validator)->withInput();
        }

        // $rawOptions= json_encode($request->options);
        // $decodedOptions = json_decode($rawOptions, true);

        Questions::create([
            'quiz_id' => $request->quiz_id,
            'type' => $request->type,
            'order_number' => $request->order_number,
            'content' => $request->content,
            'options' => $request->options,
            'correct_answer' => $request->correct_answer,
        ]);

        return redirect()->back()
            ->with('success', 'Question created successfully !');

        // return response()->json([
        //     'success' => true,
        //     'message' => 'Question created successfully !',
        // ]);
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
        $quiz = Quizzes::select('id','title')->find($id);
        $question = Questions::where('quiz_id',$id)->get();
        $data = [
            'quiz'=>$quiz,
            'questions'=>$question
        ];
        return Inertia::render('Questions/Edit',$data);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validator = Validator::make($request->all(), [
            'quiz_id' => 'required|exists:quizzes,id',
            'type' => 'required|string',
            'order_number' => 'required|integer',
            'content' => 'required|string',
            'options' => 'nullable|array',
            'correct_answer' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $question = Questions::find($id);

        $question->update([
            'quiz_id'       => $request->quiz_id,
            'type'          => $request->type,
            'order_number'  => $request->order_number,
            'content'       => $request->content,
            'options'       => json_encode($request->options), // Store options as JSON
            'correct_answer' => $request->correct_answer,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Question updated successfully !',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $question = Questions::find($id);
        $question->delete();
        return response()->json([
            'success' => true,
            'message' => 'Question deleted !',
        ]);
    }
}
