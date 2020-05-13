<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddReferenceEmailSentFlagsToApplicationReviewsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('application_reviews', function (Blueprint $table) {
            $table->boolean('director_email_sent')->default(false);
            $table->boolean('reference_email_sent')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('application_reviews', function (Blueprint $table) {
            $table->dropColumn('director_email_sent');
            $table->dropColumn('reference_email_sent');
        });
    }
}
