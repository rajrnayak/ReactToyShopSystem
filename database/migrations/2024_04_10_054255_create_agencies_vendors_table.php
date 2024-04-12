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
        Schema::create('agencies_vendors', function (Blueprint $table) {
            $table->id();
            $table->tinyInteger('type')->comment('1:agency | 2:vendor | 3:individual');
            $table->string('name');
            $table->string('mobile_number')->unique();
            $table->string('email')->unique();
            $table->bigInteger('balance')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('agencies_vendors');
    }
};
