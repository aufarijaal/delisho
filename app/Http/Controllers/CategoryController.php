<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index(Request $r, string $slug)
    {
        $userId = auth()->user()?->id;
        $sortBy = $r->query('sortBy');

        $saves = $userId ? \App\Models\SavedRecipe::select('recipe_id')
            ->where('user_id', $userId)
            ->pluck('recipe_id')
            ->toArray() : [];

        $recipes = \App\Models\Recipe::select(['id', 'user_id', 'final_image', 'title', 'slug', 'created_at', 'published', 'category_id'])
            ->where('published', true)
            ->whereRelation('category', function ($query) use ($slug) {
                $query->where('slug', $slug);
            })
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

        $category = \App\Models\Category::where('slug', $slug)->get()->first();

        return Inertia::render('Categories', [
            'recipes' => $recipes,
            'category' => $category,
            'sortBy' => $sortBy
        ]);
    }

    public function getCategoryRequests(Request $r)
    {
        $sortBy = $r->query('sortBy');
        $q = $r->query('q') ?? '';
        $direction = $r->query('direction');
        $shows = $r->query('shows');

        $categories = \App\Models\Category::with([
            'requestor'
        ])->where('name', 'LIKE', '%' . $q . '%');

        if ($shows && $shows != "all") {
            $categories->where('accepted', $shows === 'accepted' ? true : false);
        }

        if ($sortBy === 'name') {
            $categories->orderBy('name', $direction === 'desc' ? 'desc' : 'asc');
        } else if ($sortBy === 'createdAt') {
            $categories->orderBy('created_at', $direction === 'desc' ? 'desc' : 'asc');
        } else if ($sortBy === 'requestor') {
            $categories->orderBy(
                \App\Models\User::select(['name'])
                    ->whereColumn('categories.requested_by_id', 'users.id'),
                $direction === 'desc' ? 'desc' : 'asc'
            );
        }

        return Inertia::render('CategoryRequests', [
            'categories' => $categories->paginate(5)->appends($r->query()),
            'params' => $r->query()
        ]);
    }

    public function requestForm(Request $r)
    {
        return Inertia::render('CategoryRequestForm');
    }

    public function store(Request $r)
    {
        $user = auth()->user();

        $r->validate([
            'name' => 'required|unique:categories,name',
            'description' => 'nullable|string',
        ]);

        \App\Models\Category::create([
            'description' => $r->input('description'),
            'name' => $r->input('name'),
            'slug' => \Illuminate\Support\Str::slug($r->input('name')),
            'requested_by_id' => $user->id,
            'accepted' => $user->is_admin,
        ]);

        return redirect('/category-requests');
    }
}
