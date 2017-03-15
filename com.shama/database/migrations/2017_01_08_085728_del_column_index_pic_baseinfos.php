<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class DelColumnIndexPicBaseinfos extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('baseinfos', function ($table){
            $table->dropColumn('_index');
            $table->dropColumn('pics');
        });
        Schema::table('houses', function ($table){
            $table->integer('_index')->default(100);
            $table->string('pics',2000);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
