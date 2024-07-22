<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        \App\Models\User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@delisho.com',
            'username' => 'delishoadmin',
            'is_admin' => true
        ]);

        \App\Models\User::factory(10)->create();

        $this->call([
            CategorySeeder::class,
            RecipeSeeder::class,
        ]);
    }
}
