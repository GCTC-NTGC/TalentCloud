<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateApplicantProfileAnswersTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('applicant_profile_answers', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('applicant_id')->unsigned()->index();
			$table->integer('applicant_profile_question_id')->unsigned()->index();
			$table->text('answer')->nullable();
			$table->timestamps();
                        
            $table->unique(['applicant_id','applicant_profile_question_id'], 'app_profile_answers_app_id_app_profile_question_id_unique');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('applicant_profile_answers');
	}

}
