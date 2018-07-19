<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddDepartmentForeignIdToManager extends Migration {

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::table('managers', function(Blueprint $table) {
            $table->foreign('department_id')->references('id')->on('departments')->onUpdate('CASCADE')->onDelete('NO ACTION');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
        Schema::table('managers', function(Blueprint $table) {
            $table->dropForeign('managers_department_id_foreign');
        });
    }

}
