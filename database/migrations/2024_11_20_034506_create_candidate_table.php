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
        Schema::create('candidates', function (Blueprint $table) {
            $table->id(); // Primary Key
            $table->text('photo')->nullable(); // Candidate name
            $table->string('name',100); // Candidate name
            $table->string('gender',15); // Candidate name
            $table->date('birthdate'); // Candidate name
            $table->text('address'); // Candidate name
            $table->string('religion',15); // Candidate name
            $table->string('email')->unique(); // Candidate email
            $table->string('phone',18); // Phone number
            $table->mediumtext('files'); // Phone number
            $table->string('status')->default('Applied'); // Phone number
            $table->timestamps(); // created_at and updated_at timestamps
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('candidates');
    }
};
