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

    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'categories' => $categories
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

    Route::middleware('admin')->prefix('admin')->group(function () {
        Route::get('dashboard', function (Request $r) {
            return Inertia::render('Admin/Dashboard');
        })->name('admin.dashboard');
    });
});

require __DIR__ . '/auth.php';
