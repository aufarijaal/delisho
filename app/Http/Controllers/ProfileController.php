<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }

    public function uploadProfilePicture(Request $r)
    {
        $rules = ['photo' => 'image|max:500'];

        $validator = Validator::make($r->all(), $rules);

        // Check if validation fails
        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        $user = \App\Models\User::find(auth()->user()->id);

        $file = $r->file("photo");
        $filename = $file->hashName();
        $file->storePubliclyAs(
            sprintf("profilepictures"),
            $filename,
            "public"
        );

        if (!is_null($user->photo)) {
            Storage::delete("public/profilepictures/" . $user->photo);
        }

        $user->photo = $filename;
        $user->save();

        return back();
    }

    public function deleteProfilePicture(Request $r)
    {
        $user = \App\Models\User::find(auth()->user()->id);

        Storage::delete("public/profilepictures/" . $user->photo);

        $user->photo = null;
        $user->save();
    }
}
