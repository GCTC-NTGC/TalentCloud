<?php namespace App\Utilities;

use Twig_Extension;
use Twig_SimpleFunction;
use Twig_SimpleFilter;

class HandleNullState extends Twig_Extension
{
    /**
     * Functions
     * @return array
     */
    public function getFunctions(): array
    {
        return [
            new Twig_SimpleFunction('handleNullState', [$this, 'handleNullState']),
        ];
    }

    /**
     * This function checks if the argument is empty, if false then it will echo html for null state given,
     * if true then return default html.
     *
     * @param string|integer|float|null $output
     * @param string|null               $outputHtml
     * @param string                    $nullStateHtml
     *
     * @return void
     */
    public function handleNullState($output, $outputHtml, string $nullStateHtml): void
    {
        if (!empty($output) && !empty($outputHtml)) {
            echo $outputHtml;
        } else {
            echo $nullStateHtml;
        }
    }
}
