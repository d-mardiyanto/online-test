<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\QuizController;
use App\Http\Controllers\QuestionsController;
use App\Http\Controllers\AnswerController;
use App\Http\Controllers\ResultController;

use App\Http\Controllers\CandidateController;

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('candidate',CandidateController::class)
    ->names([
        'index'=>'candidate'
    ]);

    Route::resource('quiz',QuizController::class)
    ->names([
        'index'=>'quiz'
    ]);

    Route::resource('questions',QuestionsController::class)
    ->names([
        'index'=>'questions'
    ]);

    Route::resource('answer',AnswerController::class)
    ->names([
        'index'=>'questions'
    ]);
    Route::post('/character-match', [AnswerController::class, 'calculateMatch'])->name('answer.character-match');

    Route::resource('results',ResultController::class)
    ->names([
        'index'=>'results'
    ]);

    Route::get('results/scores/{id}',[ResultController::class,'calculateScores'])->name('results.scores');
});



require __DIR__.'/auth.php';
