<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('recipes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('category_id')->nullable();
            $table->text('final_image')->nullable();
            $table->string('title');
            $table->string('slug')->unique()->nullable();
            $table->string('description')->nullable()->default('');
            $table->string('portion')->nullable()->default('');
            $table->string('cooking_time')->nullable()->default('');
            $table->string('difficulty')->nullable()->default('');
            $table->text('ingredients')->default('[]');
            $table->text('steps')->default('[]');
            $table->boolean('published')->default(false);
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->cascadeOnDelete();
            $table->foreign('category_id')->references('id')->on('categories')->restrictOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('recipes');
    }
};
