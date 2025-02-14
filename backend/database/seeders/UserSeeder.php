<?php

namespace Database\Seeders;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $email = 'admin@example.com';
        $email2 = 'admin2@example.com';
        // Delete the user if they exist
        User::where('email', $email)->delete();

        User::create([
            'name' => 'admin',
            'lastname' => 'dev',
            'email' => $email,
            'password' => Hash::make('password123'),
            'adding' => 1,
            'editing' => 1,
            'deleting' => 1,
            'role' => 'super_admin',
        ]);

        User::create([
            'name' => 'superadmin',
            'lastname' => 'dev',
            'email' => $email2,
            'password' => Hash::make('password123'),
            'adding' => 1,
            'editing' => 1,
            'deleting' => 1,
            'role' => 'admin',
        ]);
    }
}
