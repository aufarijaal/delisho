<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\Database\Query\Builder;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SearchController extends Controller
{
    public function search(Request $r)
    {
        $recipes = \App\Models\Recipe::select(['id', 'user_id', 'final_image', 'title', 'slug', 'created_at', 'published', 'category_id'])
            ->where('title', 'LIKE', '%' . $r->query('q') . '%')
            ->where('published', true)
            //            ->orWhere('ingredients', '%'.$r->query('q').'%')
            ->with([
                'author:id,name,photo',
                'category:id,name,slug'
            ])
            ->withCount('savedByUsers as saves_count')
            ->paginate(20);

        return Inertia::render('Search', [
            'q' => $r->query('q'),
            'recipes' => $recipes
        ]);
    }
}
