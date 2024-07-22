<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SavedRecipeController extends Controller
{
    public function store(Request $r)
    {
        \App\Models\SavedRecipe::create([
            'user_id' => auth()->user()->id,
            'recipe_id' => $r->input('recipe_id')
        ]);

        return back();
    }

    public function destroy(Request $r, string $recipeId)
    {
        \App\Models\SavedRecipe::where('recipe_id', $recipeId)
            ->where('user_id', auth()->user()->id)
            ->delete();

        return back();
    }
}
