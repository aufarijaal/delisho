<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function store(Request $r)
    {
        $r->validate([
            'body' => 'required|string|max:255',
            'recipe_id' => 'required|exists:recipes,id',
        ]);

        \App\Models\Comment::create([
            'body' => $r->get('body'),
            'recipe_id' => $r->get('recipe_id'),
            'user_id' => auth()->id(),
        ]);

        return back();
    }

    public function destroy(Request $r, string $id)
    {
        \App\Models\Comment::where('id', $id)
            ->where('user_id', auth()->user()->id)
            ->delete();

        return back();
    }
}
