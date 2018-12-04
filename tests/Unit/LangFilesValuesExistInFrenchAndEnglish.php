<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\App;

class LangFilesWellFormattedTest extends BaseTranslationTest
{
    protected $sameTranslations = [];

    public function testAllLangValuesDifferentInFrenchAndEnglish() {
        $locales = ['en', 'fr'];
        foreach($locales as $locale) {
            $langFiles = $this->getLangFilenames($locale);
            foreach($langFiles as $langFile) {
                $entries = $this->getAllLangEntriesInFile($langFile); //TODO: create this function
                foreach($entries as $entry) {
                    $prevValues = [];
                    foreach($locales as $configLocale) {
                        App::setLocale($configLocale);
                        $value = Lang::get($entry);
                        if (in_array($value, $this->sameTranslations)) {
                            //TODO: do nothing?
                        } else {
                            //Assert $value not in $prevValues;
                        }                        
                        array_push($prevValues, $value);
                    }
                }

            }
        }
    }
}
