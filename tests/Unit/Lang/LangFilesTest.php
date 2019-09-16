<?php

namespace Tests\Unit\Lang;

use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Lang;

class LangFilesTest extends BaseTranslationTest
{
    /**
     * Test formatting.
     *
     * @return void
     */
    public function testAllLangFilesWellFormatted() : void
    {
        foreach ($this->getAllLangFilenames() as $langFile) {
            if (! empty($langFile)) {
                $this->assertInternalType('array', Lang::get($langFile));
            }
        }
    }

    /**
     * Tests for lang entries that are empty strings.
     * If tests are run with --verbose, displays wich keys have empty values.
     *
     * @return void
     */
    public function testNoEmptyStrings() : void
    {
        $emptyEntries = [];
        foreach ($this->getAllLangPaths() as $path) {
            foreach ($this->locales as $locale) {
                App::setLocale($locale);
                $value = Lang::get($path);
                if ($value === '') {
                    $fullPath = $locale.'/'.$path;
                    array_push($emptyEntries, $fullPath);
                }
            }
        }
        if (! empty($emptyEntries)) {
            print_r("\n");
            print_r("The following lang entries are empty strings:\n");
            print_r($emptyEntries);
            print_r("\n");
        }
        $this->assertEmpty($emptyEntries);
    }

    /**
     * Tests for lang entries that are set to values that obviously indicate
     * a missing translation, like 'TRANSLATION NEEDED'.
     * If tests are run with --verbose, displays wich keys have these values.
     *
     * @return void
     */
    public function testNoTranslationNeeded() : void
    {
        $checks = ['TRANSLATION NEEDED', 'TRANSLATION', 'TRANSLATION_NEEDED'];
        $translationNeeded = [];
        foreach ($this->getAllLangPaths() as $path) {
            foreach ($this->locales as $locale) {
                App::setLocale($locale);
                $value = Lang::get($path);
                if (in_array($value, $checks)) {
                    $fullPath = $locale.'/'.$path;
                    array_push($translationNeeded, $fullPath);
                }
            }
        }
        if (! empty($translationNeeded)) {
            print_r("\n");
            print_r("Translation needed for the following keys:\n");
            print_r($translationNeeded);
            print_r("\n");
        }
        $this->assertEmpty($translationNeeded);
    }

    /**
     * Contains lang keys that are expected to be missing in a particular language.
     *
     * @var mixed[]
     */
    protected $permittedMissing = [
        'en' => [
            'validation.attributes.courses.new.*.name',
            'validation.attributes.courses.new.*.institution',
            'validation.attributes.courses.new.*.course_status_id',
            'validation.attributes.courses.new.*.start_date',
            'validation.attributes.courses.new.*.end_date',
            'validation.attributes.degrees.new.*.degree_type_id',
            'validation.attributes.degrees.new.*.area_of_study',
            'validation.attributes.degrees.new.*.institution',
            'validation.attributes.degrees.new.*.start_date',
            'validation.attributes.degrees.new.*.end_date',
            'validation.attributes.work_experiences.new.*.role',
            'validation.attributes.work_experiences.new.*.company',
            'validation.attributes.work_experiences.new.*.description',
            'validation.attributes.work_experiences.new.*.start_date',
            'validation.attributes.work_experiences.new.*.end_date',
        ],
        'fr' => [
            'validation.attributes.courses.new.*.name',
            'validation.attributes.courses.new.*.institution',
            'validation.attributes.courses.new.*.course_status_id',
            'validation.attributes.courses.new.*.start_date',
            'validation.attributes.courses.new.*.end_date',
            'validation.attributes.degrees.new.*.degree_type_id',
            'validation.attributes.degrees.new.*.area_of_study',
            'validation.attributes.degrees.new.*.institution',
            'validation.attributes.degrees.new.*.start_date',
            'validation.attributes.degrees.new.*.end_date',
            'validation.attributes.work_experiences.new.*.role',
            'validation.attributes.work_experiences.new.*.company',
            'validation.attributes.work_experiences.new.*.description',
            'validation.attributes.work_experiences.new.*.start_date',
            'validation.attributes.work_experiences.new.*.end_date',
        ]
    ];

    /**
     * Tests for lang entries that are an empty array instead of a string,
     * or that are present in one language but not another. Ignores keys
     * in $this->permittedMissing.
     *
     * If tests are run with --verbose, displays wich keys are missing.
     *
     * @return void
     */
    public function testNoMissingStrings() : void
    {
        $missingEntries = [];
        foreach ($this->locales as $locale) {
            $missingEntries[$locale] = [];
        }
        foreach ($this->getAllLangPaths() as $path) {
            foreach ($this->locales as $locale) {
                App::setLocale($locale);
                if (! Lang::has($path) && ! in_array($path, $this->permittedMissing[$locale])) {
                    array_push($missingEntries[$locale], $path);
                }
            }
        }
        $allMissingEntries = [];
        foreach ($this->locales as $locale) {
            if (! empty($missingEntries[$locale])) {
                print_r("\n");
                print_r("The following lang entries are missing in $locale\n");
                print_r($missingEntries[$locale]);
                print_r("\n");
            }
            $allMissingEntries = array_merge($allMissingEntries, $missingEntries[$locale]);
        }

        $this->assertEmpty($allMissingEntries);
    }

    /**
     * The list of keys that are expected to have identical values in multiple languages.
     * If tests are run with --verbose, displays wich keys have identical values.
     *
     * @var mixed[]
     */
    protected $permittedEqual = [
        '', // Empty strings will be reported by testNoEmptyStrings.
        ':count Minute|:count Minutes', '/tos/', '/privacy/', 'Canada.ca', 'GCcollab', 'Twitter',
        'Permanent', 'Application', 'Institution', 'Initiative', 'Facilitation', 'Passion', 'Courage',
        'signature', 'date', 'Minute', 'minute', 'description', 'FAQ', 'Linux', 'CSS', 'Javascript',
        'C++', 'SASS', 'Python', 'PHP', 'Git', 'Docker', 'HTML', 'SQL', 'Microsoft Dynamics',
        'EF6', 'Info', 'Notes', 'Education', 'Education (English)', 'Education (Français)', 'Impact',
        'Impact (English)', 'Impact (Français)', 'Division', 'Division (English)', 'Division (Français)',
        'Question', 'Question (English)', 'Question (Français)', 'Description', 'Description (English)',
        'Description (Français)', 'Province', 'Classifications', 'to-know', 'levels', 'post-application',
        'skill-recognition',
        'https://gccollab.ca/groups/profile/19750/talent-cloud-nuage-de-talent',
        'https://account.gccollab.ca/profile/',
        'https://twitter.com/GC_Talent',
        'talent.cloud-nuage.de.talents@tbs-sct.gc.ca',
        '/images/logo_canada_white.png',
        '/images/logo_goc_white.svg',
        '1', '2', '3', '4', '5', '6',
        'Meagan Commonda',
        'mailto:meagan.commonda@tbs-sct.gc.ca',
        'https://twitter.com/meagancommonda/',
        'http://caid.ca/IndRecRet2017.pdf',
        'https://talentcloud1.typeform.com/to/tWIPup',
        '#upgrade'
    ];

    /**
     * Tests lang files for identical values in multiple languages.
     * If tests are run with --verbose, displays wich keys have identical values.
     *
     * @return void
     */
    public function testAllLangValuesDifferentInFrenchAndEnglish() : void
    {
        $identicalEntries = [];
        foreach ($this->getAllLangPaths() as $path) {
            $prevValues = [];
            foreach ($this->locales as $locale) {
                App::setLocale($locale);
                $value = Lang::get($path);
                if (in_array($value, $this->permittedEqual)) {
                    // Exclude from results.
                } elseif (strpos($path, '.type') || (strpos($path, '.id'))) {
                    // Exclude from results.
                } elseif (Lang::has($path) && in_array($value, $prevValues)) {
                    array_push($identicalEntries, $path);
                }
                array_push($prevValues, $value);
            }
        }
        $identicalEntries = array_unique($identicalEntries);
        if (! empty($identicalEntries)) {
            print_r("\n");
            print_r("The following lang entries are identical in multiple languages:\n");
            print_r($identicalEntries);
            print_r("\n");
        }
        $this->assertEmpty($identicalEntries);
    }
}
