<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class FeedbackController extends Controller
{
    public function index(Request $r)
    {
        return Inertia::render('Feedback');
    }

    public function store(Request $r)
    {
        $validated = $r->validate([
            'body' => 'required|string',
            'rate' => 'required|integer',
        ]);

        \App\Models\Feedback::create([
            ...$validated,
            'user_id' => auth()->user()->id,
        ]);

        return redirect('/');
    }
}
