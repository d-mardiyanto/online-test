<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Filled By Recruiter
        Schema::create('quizzes', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->date('start_date');
            $table->date('exp_date');
            $table->integer('time_limit');
            $table->integer('pass_mark');
            $table->integer('attempt')->default(1);
            $table->integer('created_by');
            $table->timestamps();
        });

        // Filled By Recruiter
        Schema::create('questions', function (Blueprint $table) {
            $table->id();
            $table->integer('quiz_id');
            $table->string('type',15);
            $table->integer('order_number');
            $table->mediumtext('content');
            $table->mediumtext('options');
            $table->text('correct_answer');
            $table->timestamps();
        });

        // Filled By Candidate
        Schema::create('answers', function (Blueprint $table) {
            $table->id();
            $table->integer('quiz_id');
            $table->integer('question_id');
            $table->integer('user_id');
            $table->string('answer',10);
            $table->timestamps();
        });

        // Filled By Candidate
        Schema::create('results', function (Blueprint $table) {
            $table->id();
            $table->integer('quiz_id');
            $table->date('work_date');
            $table->time('start_time');
            $table->time('end_time')->nullable();
            $table->integer('score')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quizzes');
        Schema::dropIfExists('questions');
        Schema::dropIfExists('answers');
        Schema::dropIfExists('results');
    }
};
