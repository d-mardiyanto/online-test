<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AnswersSeeder extends Seeder
{
    public function run()
    {
        DB::table('answers')->insert([
            [
                'quiz_id' => 2,
                'question_id' => 1,
                'user_id' => 22,
                'answer' => json_encode(['C']), // JSON encoded answer
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'quiz_id' => 2,
                'question_id' => 2,
                'user_id' => 22,
                'answer' => json_encode(['A']), // JSON encoded answer
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'quiz_id' => 2,
                'question_id' => 3,
                'user_id' => 22,
                'answer' => json_encode(['B']), // JSON encoded answer
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'quiz_id' => 2,
                'question_id' => 4,
                'user_id' => 22,
                'answer' => json_encode(['D']), // JSON encoded answer
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'quiz_id' => 2,
                'question_id' => 5,
                'user_id' => 22,
                'answer' => json_encode(['E']), // JSON encoded answer
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
