<?php

namespace App\Http\Controllers;

use App\Models\Quizzes;
use App\Models\Results;

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
        $results = Results::where('user_id',auth()->id())->get();
        $data = [
            'results' => $results
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
            'work_date' => 'required|date',
            'start_time'=> 'required|date_format:H:i',
            'end_time'  => 'nullable|date_format:H:i|after:start_time',
            'score'     => 'nullable|integer|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        Results::create([
            'quiz_id' => $request->quiz_id,
            'work_date' => $request->work_date,
            'start_time' => $request->start_time,
            'end_time' => $request->end_time,
            'score' => $request->score,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Work Log created successfully !',
        ]);
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
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validator = Validator::make($request->all(), [
            'quiz_id'   => 'required|exists:quizzes,id',
            'work_date' => 'required|date',
            'start_time'=> 'required|date_format:H:i',
            'end_time'  => 'required|date_format:H:i',
            'score'     => 'required|integer|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $result = Results::find($id);
        $result->update([
            'quiz_id'   => $request->quiz_id,
            'work_date' => $request->work_date,
            'start_time'=> $request->start_time,
            'end_time'  => $request->end_time,
            'score'     => $request->score,
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
}
