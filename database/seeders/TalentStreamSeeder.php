<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TalentStreamSeeder extends Seeder // phpcs:ignore
{
    /**
     * Run the Skills Classification seeds.
     *
     * @return void
     */
    public function run()
    {
        $talent_streams = [
            [
                'key' => 'communications',
                'name' => json_encode([
                    'en' => 'Communication Positions',
                    'fr' => 'Positions de communications'
                ])
            ],
            [
                'key' => 'it',
                'name' => json_encode([
                    'en' => 'IT Positions',
                    'fr' => 'Positions de IT'
                ])
            ],
            [
                'key' => 'admin',
                'name' => json_encode([
                    'en' => 'Administrative Positions',
                    'fr' => 'Postes administratifs'
                ])
            ],
        ];
        foreach ($talent_streams as $stream) {
            DB::table('talent_streams')->updateOrInsert(
                ['key' => $stream['key']],
                ['name' => $stream['name']]
            );
        }

        $talent_categories = [
            [
                'key' => 'social_media',
                'name' => json_encode([
                    'en' => 'Social Media',
                    'fr' => 'Les médias sociaux'
                ])
            ],
            [
                'key' => 'video',
                'name' => json_encode([
                    'en' => 'Video Editing',
                    'fr' => 'Montage vidéo'
                ])
            ],
            [
                'key' => 'web_dev',
                'name' => json_encode([
                    'en' => 'Web Development',
                    'fr' => 'Développement web'
                ])
            ],
            [
                'key' => 'dev_ops',
                'name' => json_encode([
                    'en' => 'Dev Ops',
                    'fr' => 'Dev Ops (FR)'
                ])
            ],
        ];
        foreach ($talent_categories as $category) {
            DB::table('talent_stream_categories')->updateOrInsert(
                ['key' => $category['key']],
                ['name' => $category['name']]
            );
        }

        $job_skill_levels = [
            [
                'key' => 'junior',
                'name' => json_encode([
                    'en' => 'Junior',
                    'fr' => 'Junior'
                ])
            ],
            [
                'key' => 'medium',
                'name' => json_encode([
                    'en' => 'Mid Level',
                    'fr' => 'Niveau moyen'
                ])
            ],
            [
                'key' => 'expert',
                'name' => json_encode([
                    'en' => 'Expert',
                    'fr' => 'Expert'
                ])
            ],
        ];
        foreach ($job_skill_levels as $skill_level) {
            DB::table('job_skill_levels')->updateOrInsert(
                ['key' => $skill_level['key']],
                ['name' => $skill_level['name']]
            );
        }
    }
}
