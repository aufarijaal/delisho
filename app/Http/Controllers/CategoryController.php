<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index(Request $r, string $slug)
    {
        $sortBy = $r->query('sortBy');

        $recipes = \App\Models\Recipe::select(['id', 'user_id', 'final_image', 'title', 'slug', 'created_at', 'published', 'category_id'])
            ->where('published', true)
            ->whereRelation('category', function ($query) use ($slug) {
                $query->where('slug', $slug);
            })
            ->with([
                'author:id,name,photo',
                'category:id,name,slug'
            ])
            ->withCount('savedByUsers as saves_count')
            ->paginate(20);

        $category = \App\Models\Category::where('slug', $slug)->get()->first();

        return Inertia::render('Categories', [
            'recipes' => $recipes,
            'category' => $category
        ]);
    }
}
