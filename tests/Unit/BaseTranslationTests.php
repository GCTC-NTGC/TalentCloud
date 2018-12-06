<?php
namespace Tests\Unit;
use Tests\TestCase;
abstract class BaseTranslationTest extends TestCase
{
    protected $rootLangDir = 'resources/lang';
    /**
     * Return an array of all Lang files in directory tree
     * @param  string $dir directory to start searching in
     */
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
    protected function removePrefix($str, $prefix) {
        if (substr($str, 0, strlen($prefix)) == $prefix) {
            $str = substr($str, strlen($prefix));
        }
        return $str;
    }
    protected function removeFiletype($filename) {
        return preg_replace('/\\.[^.\\s]+$/', '', $filename);
    }
    protected function formatLangFilenames($langFiles, $prefix) {
        $output = [];
        foreach($langFiles as $file) {
            $relativeName = $this->removePrefix($file, $prefix);
            $relativeName = $this->removeFiletype($relativeName);
            $relativeName = trim($relativeName, '/');
            array_push($output, $relativeName);
        }
        return $output;
    }
    protected function getLangFilenames($lang) {
        $dir = implode('/', [$this->rootLangDir, $lang]);
        $langFiles = $this->getAllFilesInDirectoryTree($dir);
        $formatedLangFiles = $this->formatLangFilenames($langFiles, $dir);
        return $formatedLangFiles;
    }
    protected function getAllLangFilenames() {
        $langs = ['en', 'fr'];
        $output = [];
        foreach($langs as $lang) {
            $output = array_merge($output, $this->getLangFilenames($lang));
        }
        return $output;
    }
}