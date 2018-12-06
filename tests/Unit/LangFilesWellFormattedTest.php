<?php
namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\App;

abstract class LangFilesWellFormattedTest extends BaseTranslationTest
{
     protected $rootLangDir = 'resources/lang';

    
     protected function getAllFilesInDirectoryTree($dir) {
        $dir = trim($dir, '/');
        $filesAndDirectories = scandir($dir);
        $files = [];
        foreach($filesAndDirectories as $fileName) {
            $path = implode('/', [$dir, $fileName]);
            if ($fileName === '.' || $fileName === '..') {
                //Do nothing
            } elseif (is_dir($path)) {
                $files = array_merge($files, $this->getAllFilesInDirectoryTree($path));
            } else {
                array_push($files, $path);
            }
        }
        return $files;
}
    
        
    public function testAllLangFilesWellFormatted() {
        $locales = ['en', 'fr'];
      
        foreach($locales as $locale) {
            
            $langFiles = $this->getLangFilenames($locale);
            App::setLocale($locale);
            
            foreach($langFiles as $langFile) {
                $this->assertInternalType('array', Lang::get($langFile));
            }
            Lang::get('applicant/application_template');
            
            [
                'applicant/application_template.title',
                'applicant/application_template.view_title',
                'applicant/application_template/modal/deleteDegree.type',
                'applicant/application_template/modal/deleteDegree.title',
                'applicant/application_template/modal/deleteDegree.content.00',
            ];
                    
        }
    }
   
}
