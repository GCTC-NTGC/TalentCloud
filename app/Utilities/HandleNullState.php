<?php namespace App\Utilities;

use Twig_Extension;
use Twig_SimpleFunction;
use Twig_SimpleFilter;

class HandleNullState extends Twig_Extension {
    /**
     * Functions
     * @return array
     */
    public function getFunctions() {
      return [
        new Twig_SimpleFunction('handleNullState', [$this, 'handleNullState']),
      ];
    }

    /**
     * This function checks if the argument is empty, if false then it will echo html for null state given, if true then return default html.
     * @param string|int|float|null $output
     * @param string $outputHtml
     * @param string $nullStateHtml
     * @return void
     */
    public function handleNullState($output, string $outputHtml, string $nullStateHtml) {
        if (!empty($output)) {
          echo $outputHtml;
        } else {
          echo $nullStateHtml;
        }
    }
  }
