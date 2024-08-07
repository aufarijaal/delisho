<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\Database\Query\Builder;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SearchController extends Controller
{
    public function search(Request $r)
    {
        $userId = auth()->user()?->id;
        $sortBy = $r->query('sortBy');
        $q = $r->query('q');

        $saves = $userId ? \App\Models\SavedRecipe::select('recipe_id')
            ->where('user_id', $userId)
            ->pluck('recipe_id')
            ->toArray() : [];

        $recipes = \App\Models\Recipe::select(['id', 'user_id', 'final_image', 'title', 'slug', 'created_at', 'published', 'category_id'])
            ->where('title', 'LIKE', '%' . $q . '%')
            ->where('published', true)
            ->orderByRaw(sprintf('created_at %s', $sortBy === 'newest' ? 'DESC' : 'ASC'))
            ->with([
                'author:id,name,photo',
                'category:id,name,slug'
            ])
            ->withCount('savedByUsers as saves_count')
            ->paginate(20)
            ->toArray();

        foreach ($recipes['data'] as &$item) {
            $item['saved'] = in_array($item['id'], $saves);
        }

        return Inertia::render('Search', [
            'q' => $q,
            'sortBy' => $sortBy,
            'recipes' => $recipes
        ]);
    }
}
