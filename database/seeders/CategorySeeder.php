<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ["name" => "Appetizers", "slug" => "appetizers"],
            ["name" => "Main Dishes", "slug" => "main-dishes"],
            ["name" => "Side Dishes", "slug" => "side-dishes"],
            ["name" => "Desserts", "slug" => "desserts"],
            ["name" => "Beverages", "slug" => "beverages"],
            ["name" => "Breakfast & Brunch", "slug" => "breakfast-brunch"],
            ["name" => "Soups & Stews", "slug" => "soups-stews"],
            ["name" => "Salads", "slug" => "salads"],
            ["name" => "Breads & Pastries", "slug" => "breads-pastries"],
            ["name" => "Healthy & Diet-Specific", "slug" => "healthy-diet-specific"],
            ["name" => "International Cuisine", "slug" => "international-cuisine"],
            ["name" => "Holiday & Special Occasion", "slug" => "holiday-special-occasion"],
            ["name" => "Cooking Methods", "slug" => "cooking-methods"],
            ["name" => "Sauces & Condiments", "slug" => "sauces-condiments"],
            ["name" => "Kids & Family", "slug" => "kids-family"],
            ["name" => "Quick & Easy", "slug" => "quick-easy"],
            ["name" => "Special Diets", "slug" => "special-diets"],
            ["name" => "Budget-Friendly", "slug" => "budget-friendly"]
        ];

        \App\Models\Category::insert($categories);
    }
}
