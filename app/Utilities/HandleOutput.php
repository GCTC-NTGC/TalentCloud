<?php namespace App\Utilities;

use Twig_Extension;
use Twig_SimpleFunction;
use Twig_SimpleFilter;

class HandleOutput extends Twig_Extension {
    /**
     * Functions
     * @return void
     */
    public function getFunctions() {
      return [
        new Twig_SimpleFunction('handleOutput', [$this, 'handleOutput']),
      ];
    }

    public function handleOutput($output, $outputHtml, $nullHtml) {
        if( !empty($output) ) {
          echo $outputHtml;
        } else {
          echo $nullHtml;
        }
    }
}
?>
