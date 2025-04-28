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
        Schema::create('employees', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->string('email');
            $table->boolean('is_active');
            $table->json('bpjs')->nullable();
            $table->string('bpjs_file', 512)->nullable();
            $table->dateTime('joined_at');
            $table->foreignUuid('user_id')->references('id')->on('users');
            $table->foreignUuid('position_id')->references('id')->on('positions');
            
            $this->historyColumns($table);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employees');
    }
};
