<?php

use App\Http\Controllers\AnswerController;


use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Route;



uses(RefreshDatabase::class);

beforeEach(function () {
    // Ensure the route is defined
    Route::post('/character-match', [AnswerController::class, 'calculateMatch']);
});


it('calculates percentage of matching characters', function () {
    $response = $this->postJson('/character-match', [
        'input1' => 'XYZ',
        'input2' => 'Gallant Duck',
    ]);

    $response->assertStatus(200)
    ->assertJson([
        'match_count' => 2, // Characters 'A' and 'D' are present
        'percentage' => 40.00, // 2/5 = 40%
    ]);
});

it('returns 0% when no characters match', function () {
    $response = $this->postJson('/character-match', [
        'input1' => 'XYZ',
        'input2' => 'Gallant Duck',
    ]);

    $response->assertStatus(200)
    ->assertJson([
        'match_count' => 0, // No characters match
        'percentage' => 0.00,
    ]);
});

it('returns validation error when inputs are missing', function () {
    $response = $this->postJson('/character-match', []);

    $response->assertStatus(422)
        ->assertJsonValidationErrors(['input1', 'input2']);
});
