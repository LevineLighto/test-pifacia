<?php

use Database\Migrations\Traits\HasHistory;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    use HasHistory;

    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('activities', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('type');
            $table->string('sub_type')->nullable();
            $table->string('action');
            $table->text('description')->nullable();
            $table->foreignUuid('reference')->nullable();
            $table->string('reference_type')->nullable();
            $table->string('url')->nullable();
            $table->json('properties')->nullable();
            $this->historyColumns($table);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('activities');
    }
};
