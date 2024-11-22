<?php

namespace App\Http\Controllers;

use App\Models\Candidates;
use App\Models\Answers;
use App\Models\Users;

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
        $candidates = Candidates::all();
        $data = [
            'candidates'=>$candidates
        ];
        return Inertia::render('Candidate/Main',$data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Candidate/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'photo' => 'image|mimes:jpeg,jpg,png|max:2048',
            'name' => 'required|string|max:255',
            'gender' => 'required|string|in:male,female',
            'birthdate' => 'required|date',
            'address' => 'required|string|max:500',
            'religion' => 'nullable|string|max:100',
            'email' => 'required|email|unique:people,email',
            'phone' => 'required|string|max:15',
            'files' => 'nullable|string|max:500', // Adjust for file handling
        ]);

        if ($validator->fails()) {
            // return response()->json($validator->errors(), 422);
            return redirect()->back()->withErrors($validator)->withInput();
        }

        if ($request->hasFile('photo')) {
            // File is present, proceed with file handling
            $image = $request->file('photo');
            $image->storeAs('public/candidates', $image->hashName());
            Candidates::create([
                'photo'=> $image->hashName(),
                'name' => $request->name,
                'gender' => $request->gender,
                'birthdate' => $request->birthdate,
                'address' => $request->address,
                'religion' => $request->religion,
                'email' => $request->email,
                'phone' => $request->phone,
                'files' => json_encode($request->files),
            ]);
        }else{
            Candidates::create([
                'name' => $request->name,
                'gender' => $request->gender,
                'birthdate' => $request->birthdate,
                'address' => $request->address,
                'religion' => $request->religion,
                'email' => $request->email,
                'phone' => $request->phone,
                'files' => json_encode($request->files),
            ]);
        }
        // return response()->json([
        //     'success' => true,
        //     'message' => 'Successfully Submitted !',
        // ]);
        return redirect()->route('candidate')
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
        $candidate = Candidates::find($id);
        $user = Users::where('email',$candidate->email)->first();
        $answers = Answers::with('question')
                    ->where('user_id',$user->id)->get(); // Fetch answers with related questions
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
        $data = [
            'candidate'=>$candidate,
            'results'=>$results
        ];
        return Inertia::render('Candidate/Edit',$data);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validator = Validator::make($request->all(), [
            'photo' => 'image|mimes:jpeg,jpg,png|max:2048',
            'name' => 'required|string|max:255',
            'gender' => 'required|string|in:male,female',
            'birthdate' => 'required|date',
            'address' => 'required|string|max:500',
            'religion' => 'nullable|string|max:100',
            'email' => 'required|email|unique:people,email',
            'phone' => 'required|string|max:15',
            'files' => 'nullable|string|max:500', // Adjust for file handling
            'status' => 'required',
        ]);

        if ($validator->fails()) {
            // return response()->json($validator->errors(), 422);
            return redirect()->back()->withErrors($validator)->withInput();
        }

        $candidates = Candidates::find($id);

        if ($request->hasFile('photo')) {
            // File is present, proceed with file handling
            $image = $request->file('photo');
            $image->storeAs('public/candidates', $image->hashName());
            
            Storage::delete('public/candidates'.$candidates->photo);
            $candidates->update([
                'photo'=> $image->hashName(),
                'name' => $request->name,
                'gender' => $request->gender,
                'birthdate' => $request->birthdate,
                'address' => $request->address,
                'religion' => $request->religion,
                'email' => $request->email,
                'phone' => $request->phone,
                'files' => json_encode($request->files),
                'status' => $request->status,
            ]);
        }else{
            $candidates->update([
                'name' => $request->name,
                'gender' => $request->gender,
                'birthdate' => $request->birthdate,
                'address' => $request->address,
                'religion' => $request->religion,
                'email' => $request->email,
                'phone' => $request->phone,
                'files' => json_encode($request->files),
                'status' => $request->status,
            ]);
        }

        // return response()->json([
        //     'success' => true,
        //     'message' => 'Candidates Record Updated !',
        // ]);
        return redirect()->route('candidate')
            ->with('success', 'Candidates Record Updated !');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $candidates = Candidates::find($id);
        Storage::delete('public/staff'.$candidates->photo);
        $candidates->delete();

        // return response()->json([
        //     'success' => true,
        //     'message' => 'Record Deleted !',
        // ]);

        return redirect()->route('candidate')
            ->with('success', 'Record Deleted !');
    }
}
