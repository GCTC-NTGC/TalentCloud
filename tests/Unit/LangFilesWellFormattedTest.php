<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\App;

class LangFilesWellFormattedTest extends BaseTranslationTest
{
    public function testAllLangFilesWellFormatted() {
        $locales = ['en', 'fr'];
        foreach($locales as $locale) {
            $langFiles = $this->getLangFilenames($locale);
            App::setLocale($locale);
            foreach($langFiles as $langFile) {
                $this->assertInternalType('array', Lang::get($langFile));
            }
        }
    }
}
