<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    $categories = \App\Models\Category::orderBy('name')->get();
    $userId = auth()->user()?->id;
    $saves = $userId ? \App\Models\SavedRecipe::select('recipe_id')
        ->where('user_id', $userId)
        ->pluck('recipe_id')
        ->toArray() : [];

    $greatestRecipes = \App\Models\Recipe::select(['id', 'user_id', 'final_image', 'title', 'slug', 'created_at', 'category_id', 'published'])
        ->with([
            'author:id,name,photo',
            'category:id,name,slug'
        ])
        ->where('published', true)
        ->withCount('savedByUsers as saves_count')
        ->orderBy('saves_count', 'desc')
        ->limit(5)
        ->get()
        ->map(function ($item) use ($userId, $saves) {
            $item->saved = $userId ? in_array($item->id, $saves) : false;
            return $item;
        });

    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'categories' => $categories,
        'greatestRecipes' => $greatestRecipes
    ]);
})->name('home');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::post('/create', [\App\Http\Controllers\RecipeController::class, 'createEmpty'])
    ->middleware(['auth', 'verified'])
    ->name('recipe.createEmpty');

Route::prefix('recipes')->group(function () {
    Route::match(['put', 'patch'], '/{id}', [\App\Http\Controllers\RecipeController::class, 'store'])
        ->middleware(['auth', 'verified'])->name('recipe.store');

    Route::match(['put', 'patch'], '/{id}/final-image', [\App\Http\Controllers\RecipeController::class, 'uploadFinalImage'])
        ->middleware(['auth', 'verified'])->name('recipe.upload_final_image');

    Route::delete('/{id}/final-image', [\App\Http\Controllers\RecipeController::class, 'deleteFinalImage'])
        ->middleware(['auth', 'verified'])->name('recipe.delete_final_image');

    // Route::match(['put', 'patch'], '/{id}/step-image', [\App\Http\Controllers\RecipeController::class, 'uploadStepImage'])
    //     ->middleware(['auth', 'verified'])->name('recipe.upload_step_image');

    // Route::delete('/{id}/step-image', [\App\Http\Controllers\RecipeController::class, 'deleteStepImage'])
    //     ->middleware(['auth', 'verified'])->name('recipe.delete_step_image');

    Route::delete('{id}', [\App\Http\Controllers\RecipeController::class, 'delete'])
        ->middleware(['auth', 'verified'])->name('recipe.delete');

    Route::get('{id}/{slug}', [\App\Http\Controllers\RecipeController::class, 'show'])->name('recipe.read');
});

Route::prefix('account')->group(function () {
    Route::get('recipes', [\App\Http\Controllers\RecipeController::class, 'myrecipes'])
        ->middleware(['auth', 'verified'])
        ->name('account.recipes');

    Route::get('/recipes/{id}/edit', [\App\Http\Controllers\RecipeController::class, 'edit'])
        ->middleware(['auth', 'verified'])
        ->name('recipe.edit');
});

Route::prefix('categories')->group(function () {
    Route::get('{slug}', [\App\Http\Controllers\CategoryController::class, 'index'])
        ->name('categories.index');
});

Route::prefix('category-requests')->group(function () {
    Route::get('/', [\App\Http\Controllers\CategoryController::class, 'getCategoryRequests'])
        ->name('category_requests.index');
    Route::get('/make', [\App\Http\Controllers\CategoryController::class, 'requestForm'])
        ->middleware(['auth', 'verfied'])
        ->name('category_requests.make');
    Route::post('/make', [\App\Http\Controllers\CategoryController::class, 'store'])
        ->middleware(['auth', 'verfied'])
        ->name('category_requests.store');
});

Route::get('/search', [\App\Http\Controllers\SearchController::class, 'search']);

Route::prefix('comments')->group(function () {
    Route::post('/', [\App\Http\Controllers\CommentController::class, 'store'])
        ->middleware(['auth', 'verified'])
        ->name('comments.store');

    Route::delete('/{id}', [\App\Http\Controllers\CommentController::class, 'destroy'])
        ->middleware(['auth', 'verified'])
        ->name('comments.delete');
});

Route::prefix('savedrecipes')->group(function () {
    Route::post('/', [\App\Http\Controllers\SavedRecipeController::class, 'store'])
        ->middleware(['auth', 'verified'])
        ->name('savedrecipes.store');

    Route::delete('/{recipeId}', [\App\Http\Controllers\SavedRecipeController::class, 'destroy'])
        ->middleware(['auth', 'verified'])
        ->name('savedrecipes.delete');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::patch('/profile-picture', [ProfileController::class, 'uploadProfilePicture'])->name('profile_picture.update');
    Route::delete('/profile-picture', [ProfileController::class, 'deleteProfilePicture'])->name('profile_picture.destroy');

    Route::middleware('admin')->prefix('admin')->group(function () {
        Route::get('dashboard', function (Request $r) {
            return Inertia::render('Admin/Dashboard');
        })->name('admin.dashboard');
    });
});

Route::middleware(['auth', 'verified'])->prefix('give-feedback')->group(function () {
    Route::get('/', [\App\Http\Controllers\FeedbackController::class, 'index'])->name('feedback.index');
    Route::post('/', [\App\Http\Controllers\FeedbackController::class, 'store'])->name('feedback.store');
});

require __DIR__ . '/auth.php';
