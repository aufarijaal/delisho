<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

use function PHPUnit\Framework\arrayHasKey;

class RecipeController extends Controller
{
    public function myrecipes(Request $r)
    {
        $tab = $r->query('tab');
        $sortBy = $r->query('sortBy');
        $userId = auth()->user()->id;
        $recipes = null;

        if ($tab === 'my') {
            $recipes = \App\Models\Recipe::select(['id', 'user_id', 'final_image', 'title', 'slug', 'created_at', 'published', 'category_id'])
                ->where('user_id', $userId)
                ->with([
                    'author:id,name,photo',
                    'category:id,name,slug'
                ])
                ->withCount('savedByUsers as saves_count');
        } else {
            $savedIds = \App\Models\SavedRecipe::select('recipe_id')
                ->where('user_id', $userId)
                ->get()
                ->pluck('recipe_id')
                ->toArray();

            // dd($savedIds);

            $recipes = \App\Models\Recipe::select(['id', 'user_id', 'final_image', 'title', 'slug', 'created_at', 'published', 'category_id'])
                ->whereIn('id', $savedIds)
                ->with([
                    'author:id,name,photo',
                    'category:id,name,slug'
                ])
                ->withCount('savedByUsers as saves_count');
        }

        if ($sortBy === 'name') {
            $recipes->orderBy('title', 'asc');
        } else if ($sortBy === 'namedesc') {
            $recipes->orderBy('title', 'desc');
        } else if ($sortBy === 'newest') {
            $recipes->orderBy('created_at', 'desc');
        } else if ($sortBy === 'oldest') {
            $recipes->orderBy('created_at', 'asc');
        }

        return Inertia::render($tab === 'my' ? 'MyRecipes' : 'SavedRecipes', [
            'recipes' => $recipes->paginate(20)
        ]);
    }

    public function createEmpty()
    {
        $createdRecipe = \App\Models\Recipe::create([
            'title' => 'Untitled recipe',
            'slug' => 'untitled-recipe-' . \Illuminate\Support\Str::random(10),
            'category_id' => 1,
            'user_id' => auth()->user()->id,
            'ingredients' => json_encode([
                [
                    'id' => 1,
                    'value' => '100gr Sugar'
                ]
            ]),
            'steps' => json_encode([
                [
                    'id' => 1,
                    'value' => 'Prepare the water',
                    'image' => null
                ]
            ]),
            'description' => '',
            'portion' => '',
            'cooking_time' => ''
        ]);

        return redirect("/account/recipes/$createdRecipe->id/edit");
    }

    public function show(string $id, string $slug)
    {
        $userId = auth()->user()?->id;
        $recipe = \App\Models\Recipe::with(
            [
                'author:id,name,username,photo',
                'category:id,name,slug',
                'comments' => function ($query) {
                    $query->select('id', 'user_id', 'recipe_id', 'body', 'created_at')
                        ->orderBy('created_at', 'desc');
                }
            ]
        )
            ->select([
                'id',
                'user_id',
                'title',
                'final_image',
                'description',
                'portion',
                'cooking_time',
                'ingredients',
                'steps',
                'created_at',
                'published',
                'category_id',
            ])
            ->where('id', $id)
            ->where('slug', $slug)
            ->where('published', true)
            ->get()->first();

        if (!$recipe) {
            return abort(404);
        }

        $saves = $userId ? \App\Models\SavedRecipe::select('recipe_id')
            ->where('user_id', $userId)
            ->pluck('recipe_id')
            ->toArray() : [];

        $more = \App\Models\Recipe::select(['id', 'user_id', 'final_image', 'title', 'slug', 'created_at', 'published', 'category_id'])
            ->whereNot('id', $recipe->id)
            ->where('user_id', $recipe->user_id)
            ->where('published', true)
            ->with([
                'author:id,name,photo',
                'category:id,name,slug'
            ])
            ->withCount('savedByUsers as saves_count')
            ->limit(5)
            ->get()
            ->map(function ($item) use ($userId, $saves) {
                $item->saved = $userId ? in_array($item->id, $saves) : false;
                return $item;
            });

        $savesCount = \App\Models\SavedRecipe::where('recipe_id', $recipe->id)
            ->selectRaw(DB::raw('COUNT(id) as saves_count'))->limit(1)->get()->pluck('saves_count')->first();

        $canEdit = $recipe->user_id === auth()->user()?->id;

        $response = [
            'recipe' => [
                ...$recipe->toArray(),
                'saves_count' => $savesCount,
                'saved' => in_array($recipe->id, $saves)
            ],
            'canEdit' => $canEdit,
            'more' => $more->toArray(),
        ];

        return Inertia::render('PostRead', $response);
    }

    public function edit(string $id)
    {
        $recipeToEdit = \App\Models\Recipe::where('id', $id)
            ->where('user_id', auth()->user()->id)
            ->get()
            ->first();

        if (!$recipeToEdit) {
            return abort(404);
        }

        $categories = \App\Models\Category::select('id', 'name')->get();

        return Inertia::render('RecipeForm', [
            'recipe' => $recipeToEdit,
            'categories' => $categories
        ]);
    }

    public function store(Request $r, string $id)
    {
        $rules = [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string|max:255',
            'portion' => 'nullable|string|max:255',
            'cooking_time' => 'nullable|string|max:255',
            'ingredients' => 'required|json',
            'steps' => 'required|json',
            'category_id' => 'required|exists:categories,id'
        ];

        $r->validate([
            'title' => $rules['title']
        ]);

        $currentState = \App\Models\Recipe::find($id);

        if ($r->input('action') === 'publish') {
            // Validate the request
            $validator = Validator::make($r->all(), $rules);

            // Check if validation fails
            if ($validator->fails()) {
                return back()->withErrors($validator)->withInput();
            }

            $currentState->published = true;
        } else if ($r->input('action') === 'unpublish') {
            $currentState->published = false;
        }

        $currentState->title = $r->input('title');
        $currentState->slug = \Illuminate\Support\Str::slug($r->input('title') . '-' . \Illuminate\Support\Str::random(10));
        $currentState->description = $r->input('description');
        $currentState->portion = $r->input('portion') ?? "";
        $currentState->cooking_time = $r->input('cooking_time') ?? "";
        $currentState->ingredients = $r->input('ingredients');
        $currentState->steps = $r->input('steps');
        $currentState->category_id = $r->input('category_id');
        $currentState->save();

        return redirect()->route('account.recipes')
            ->with('message', 'Recipe submitted successfully!');
    }

    public function uploadFinalImage(Request $r, string $id)
    {
        $rules = ['final_image' => 'nullable|image|mimes:jpg,png,jpeg,webp|max:500'];

        $validator = Validator::make($r->all(), $rules);

        // Check if validation fails
        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        $recipe = \App\Models\Recipe::find($id);

        $file = $r->file("final_image");
        $filename = $file->hashName();
        $file->storePubliclyAs(
            sprintf("finalimages"),
            $filename,
            "public"
        );

        if (!is_null($recipe->final_image)) {
            Storage::delete("public/finalimages/" . $recipe->final_image);
        }

        $recipe->final_image = $filename;
        $recipe->save();

        return back();
    }

    public function deleteFinalImage(string $id)
    {
        $recipe = \App\Models\Recipe::find($id);

        Storage::delete("public/finalimages/" . $recipe->final_image);

        $recipe->final_image = null;
        $recipe->save();

        return back();
    }

    // public function uploadStepImage(Request $r, string $id)
    // {
    //     $rules = ['step_item_image' => 'nullable|image|mimes:jpg,png,jpeg,webp|max:500'];

    //     $validator = Validator::make($r->only('step_item_image'), $rules);

    //     // Check if validation fails
    //     if ($validator->fails()) {
    //         return back()->withErrors($validator)->withInput();
    //     }

    //     $recipe = \App\Models\Recipe::find($id);
    //     $steps = json_decode($r->input('steps'));

    //     // dd($steps);

    //     $file = $r->file("step_item_image");
    //     $filename = $file->hashName();
    //     $file->storePubliclyAs(
    //         sprintf("stepimages"),
    //         $filename,
    //         "public"
    //     );

    //     dd(arrayHasKey($steps[(int)$r->input('step_id')]['image']));

    //     // if () {
    //     //     Storage::delete("public/step_images/" . $recipe->final_image);
    //     // }

    //     $steps[(int)$r->input('step_id')]['image'] = $filename;
    //     $recipe->steps = json_encode($steps);
    //     $recipe->save();
    // }

    // public function deleteStepImage(Request $r)
    // {
    //     # code...
    // }

    public function delete(string $id)
    {
        \App\Models\Recipe::destroy($id);

        return back();
    }

    // public function uploadFinalImage(Request $r)
    // {
    //     $r->validate()
    // }
}
