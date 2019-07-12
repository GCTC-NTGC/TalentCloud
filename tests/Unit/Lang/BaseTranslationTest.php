<?php

namespace Tests\Unit\Lang;

use Tests\TestCase;
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\App;

abstract class BaseTranslationTest extends TestCase
{
    /**
     * The directory containing all lang files.
     *
     * @var string
     */
    protected $rootLangDir = 'resources/lang';

    /**
     * The locale codes being used by the app.
     *
     * @var string[]
     */
    protected $locales = ['en', 'fr'];

    /**
     * Return an array of all Lang files in directory tree
     * @param  string $dir directory to start searching in
     */
    protected function getAllFilesInDirectoryTree($dir)
    {
        $dir = trim($dir, '/');
        $filesAndDirectories = scandir($dir);
        $files = [];
        foreach ($filesAndDirectories as $fileName) {
            $path = implode('/', [$dir, $fileName]);
            if ($fileName === '.' || $fileName === '..') {
                // Do nothing
            } elseif (is_dir($path)) {
                $files = array_merge($files, $this->getAllFilesInDirectoryTree($path));
            } else {
                array_push($files, $path);
            }
        }
        return $files;
    }

    protected function removePrefix($str, $prefix)
    {
        if (substr($str, 0, strlen($prefix)) == $prefix) {
            $str = substr($str, strlen($prefix));
        }
        return $str;
    }

    protected function removeFiletype($filename)
    {
        return preg_replace('/\\.[^.\\s]+$/', '', $filename);
    }

    protected function formatLangFilenames($langFiles, $prefix)
    {
        $output = [];
        foreach ($langFiles as $file) {
            $relativeName = $this->removePrefix($file, $prefix);
            $relativeName = $this->removeFiletype($relativeName);
            $relativeName = trim($relativeName, '/');
            array_push($output, $relativeName);
        }
        return $output;
    }

    protected function getLangFilenames($lang)
    {
        $dir = implode('/', [$this->rootLangDir, $lang]);
        $langFiles = $this->getAllFilesInDirectoryTree($dir);
        $formatedLangFiles = $this->formatLangFilenames($langFiles, $dir);
        return $formatedLangFiles;
    }

    protected function getAllLangFilenames()
    {
        $langs = ['en', 'fr'];
        $output = [];
        foreach ($langs as $lang) {
            $output = array_merge($output, $this->getLangFilenames($lang));
        }
        return $output;
    }

    /**
     * Return an array of strings that can be used with Lang::get() to
     * get every value in the specified lang entry (which can either represent
     * a lang file or an array with a lang file).
     *
     * @param string $langEntry
     * @return string[]
     */
    protected function getAllLangEntriesInFile($langEntry)
    {
        $values = Lang::get($langEntry);
        if (is_string($values)) {
            return [$langEntry];
        } elseif (is_array($values)) {
            $entries = [];
            foreach ($values as $key => $value) {
                $path = $langEntry . '.' . $key;
                $entries = array_merge($entries, $this->getAllLangEntriesInFile($path));
            }
            return $entries;
        } else {
            return [];
        }
    }

    /**
     * Return the array of strings that can be used with Lang::get() to
     * get all lang file entries, in all languages.
     *
     * @return string[]
     */
    protected function getAllLangPaths(): array
    {
        $paths = [];
        foreach ($this->locales as $locale) {
            App::setLocale($locale);
            $langFiles = $this->getLangFilenames($locale);

            foreach ($langFiles as $langFile) {
                $newPaths = $this->getAllLangEntriesInFile($langFile);
                $paths = array_merge($paths, $newPaths);
            }
        }
        return array_unique($paths);
    }
}
