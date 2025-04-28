<?php

namespace Database\Migrations\Traits;

use Illuminate\Database\Schema\Blueprint;

trait HasHistory
{
    public function historyColumns(Blueprint $table, bool $without_subject = false)
    {
        $table->timestamp('created_at')->nullable();
        if (!$without_subject) {
            $table->foreignUuid('created_by')->nullable()->references('id')->on('users');
            $table->string('created_by_name')->nullable();
        }

        $table->timestamp('updated_at')->nullable();
        if (!$without_subject) {
            $table->foreignUuid('updated_by')->nullable()->references('id')->on('users');
            $table->string('updated_by_name')->nullable();
        }
        
        $table->softDeletes();
        if (!$without_subject) {
            $table->foreignUuid('deleted_by')->nullable()->references('id')->on('users');
            $table->string('deleted_by_name')->nullable();
        }
    }
}