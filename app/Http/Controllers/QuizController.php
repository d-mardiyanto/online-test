<?php

namespace App\Http\Controllers;

use App\Models\Quizzes;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;

use Illuminate\Validation\Rules;

use Carbon\Carbon;

use Inertia\Inertia;
use Inertia\Response;

class QuizController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if(Auth::user()->roles=='Candidate'){
            $userId = auth()->id();
            
            $quizzes = Quizzes::with('results')->get()->map(function ($quiz) use ($userId) {
                $today = Carbon::now(); // Current date and time using Carbon
                if ($quiz->start_date > $today) {
                    $quiz->status = 'Cannot Start Quiz'; // Quiz hasn't started yet
                } elseif ($quiz->exp_date < $today) {
                    $quiz->status = 'Expire'; // Quiz has expired
                } else {
                    $quiz->status = $quiz->results->where('user_id', $userId)->isNotEmpty() ? 'Done' : 'Not Done'; // Quiz is ongoing
                }
                return $quiz;
            });
            $data = [
                'quizzes'=>$quizzes
            ];
        }else{
            $quizzes = Quizzes::all();
            $data = [
                'quizzes'=>$quizzes
            ];
        }
        return Inertia::render('Quiz/Main',$data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Quiz/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'required|date',
            'exp_date' => 'required|date|after:start_date',
            'time_limit' => 'required|integer|min:1',
            'pass_mark' => 'required|integer|min:1|max:100',
            'attempt' => 'required|integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $quiz = Quizzes::create([
            'title' => $request->title,
            'description' => $request->description,
            'start_date' => $request->start_date,
            'exp_date' => $request->exp_date,
            'time_limit' => $request->time_limit,
            'pass_mark' => $request->pass_mark,
            'attempt' => $request->attempt,
            'created_by' => auth()->id(), // Assuming the authenticated user
        ]);

         return redirect()->route('quiz')
                ->with('success', 'Quiz successfully created!');
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
        $data = [
            'quiz'=>$quiz
        ];
        return Inertia::render('Quiz/Edit',$data);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validator = Validator::make($request->all(), [
            'title'       => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_date'  => 'required|date',
            'exp_date'    => 'required|date|after:start_date',
            'time_limit'  => 'required|integer|min:1',
            'pass_mark'   => 'required|integer|min:1|max:100',
            'attempt'     => 'required|integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
            // return redirect()->back()->withErrors($validator)->withInput();
        }

        $quiz = Quizzes::find($id);

        $quiz->update([
            'title'       => $request->title,
            'description' => $request->description,
            'start_date'  => $request->start_date,
            'exp_date'    => $request->exp_date,
            'time_limit'  => $request->time_limit,
            'pass_mark'   => $request->pass_mark,
            'attempt'     => $request->attempt,
            'created_by'  => auth()->id(), // Assuming the authenticated user
        ]);

        return redirect()->route('quiz')
            ->with('success', 'Successfully Updated Quiz Header!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $quiz = Quizzes::find($id);
        $quiz->delete();
        return redirect()->route('quiz')
            ->with('success', 'Successfully Deleted Quiz Header!');
    }
}
