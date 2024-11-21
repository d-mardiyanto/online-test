<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class QuestionsSeeder extends Seeder
{
    public function run()
    {
        $questions = [
            // Questions for quiz_id = 1
            [
                'quiz_id' => 1,
                'type' => 'radio',
                'order_number' => 1,
                'content' => 'What is the capital of France?',
                'options' => json_encode(['A' => 'Berlin', 'B' => 'Madrid', 'C' => 'Paris', 'D' => 'Rome']),
                'correct_answer' => json_encode(['C']),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'quiz_id' => 1,
                'type' => 'radio',
                'order_number' => 2,
                'content' => 'Which planet is known as the Red Planet?',
                'options' => json_encode(['A' => 'Earth', 'B' => 'Mars', 'C' => 'Jupiter', 'D' => 'Saturn']),
                'correct_answer' => json_encode(['B']),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'quiz_id' => 1,
                'type' => 'radio',
                'order_number' => 3,
                'content' => 'What is the largest ocean on Earth?',
                'options' => json_encode(['A' => 'Atlantic', 'B' => 'Indian', 'C' => 'Pacific', 'D' => 'Arctic']),
                'correct_answer' => json_encode(['C']),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'quiz_id' => 1,
                'type' => 'radio',
                'order_number' => 4,
                'content' => 'Who wrote "Romeo and Juliet"?',
                'options' => json_encode(['A' => 'William Shakespeare', 'B' => 'Mark Twain', 'C' => 'Charles Dickens', 'D' => 'Jane Austen']),
                'correct_answer' => json_encode(['A']),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'quiz_id' => 1,
                'type' => 'radio',
                'order_number' => 5,
                'content' => 'What is the smallest prime number?',
                'options' => json_encode(['A' => '1', 'B' => '2', 'C' => '3', 'D' => '5']),
                'correct_answer' => json_encode(['B']),
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // Questions for quiz_id = 2
            [
                'quiz_id' => 2,
                'type' => 'radio',
                'order_number' => 1,
                'content' => 'What is the chemical symbol for water?',
                'options' => json_encode(['A' => 'H2O', 'B' => 'O2', 'C' => 'CO2', 'D' => 'H2']),
                'correct_answer' => json_encode(['A']),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'quiz_id' => 2,
                'type' => 'radio',
                'order_number' => 2,
                'content' => 'What is the fastest land animal?',
                'options' => json_encode(['A' => 'Cheetah', 'B' => 'Lion', 'C' => 'Horse', 'D' => 'Leopard']),
                'correct_answer' => json_encode(['A']),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'quiz_id' => 2,
                'type' => 'radio',
                'order_number' => 3,
                'content' => 'What is the hardest natural substance on Earth?',
                'options' => json_encode(['A' => 'Gold', 'B' => 'Iron', 'C' => 'Diamond', 'D' => 'Graphite']),
                'correct_answer' => json_encode(['C']),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'quiz_id' => 2,
                'type' => 'radio',
                'order_number' => 4,
                'content' => 'What is the square root of 64?',
                'options' => json_encode(['A' => '6', 'B' => '8', 'C' => '10', 'D' => '12']),
                'correct_answer' => json_encode(['B']),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'quiz_id' => 2,
                'type' => 'radio',
                'order_number' => 5,
                'content' => 'What is the speed of light?',
                'options' => json_encode(['A' => '299,792 km/s', 'B' => '150,000 km/s', 'C' => '1,000,000 km/s', 'D' => '100,000 km/s']),
                'correct_answer' => json_encode(['A']),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        // Insert the questions into the database
        DB::table('questions')->insert($questions);
    }
}
