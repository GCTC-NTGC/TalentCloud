<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder //phpcs:ignore
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            DevSeeder::class,
            SkillClassificationSeeder::class,
            CommentSeeder::class,
            ExperienceSkillSeeder::class,
            ResourceSeeder::class,
            TalentStreamSeeder::class,
        ]);
    }
}
