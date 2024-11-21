<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class CandidateSeeder extends Seeder
{
    public function run()
    {
        // Example seed data
        DB::table('candidates')->insert([
            [
                'photo' => null, // Or you can use a placeholder image URL
                'name' => 'John Doe',
                'gender' => 'Male',
                'birthdate' => '1990-01-01',
                'address' => '123 Main Street, Cityville',
                'religion' => 'Christian',
                'email' => 'johndoe@example.com',
                'phone' => '1234567890',
                'files' => null, // Can store file paths or remain null
                'status' => 'Applied',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'photo' => null,
                'name' => 'Jane Smith',
                'gender' => 'Female',
                'birthdate' => '1995-06-15',
                'address' => '456 Elm Street, Townsville',
                'religion' => 'Muslim',
                'email' => 'janesmith@example.com',
                'phone' => '0987654321',
                'files' => null,
                'status' => 'Applied',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
