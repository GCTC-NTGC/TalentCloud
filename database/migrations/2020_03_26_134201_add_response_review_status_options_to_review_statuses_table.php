<?php

use Illuminate\Database\Migrations\Migration;

class AddResponseReviewStatusOptionsToReviewStatusesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::table('review_statuses')->insert([
            ['id' => 4, 'name' => 'ready_for_reference'],
            ['id' => 5, 'name' => 'ready_to_allocate'],
            ['id' => 6, 'name' => 'assessment_required'],
            ['id' => 7, 'name' => 'allocated'],
            ['id' => 8, 'name' => 'not_available']
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::table('review_statuses')->whereIn('id', [4, 5, 6, 7])->delete();
    }
}
