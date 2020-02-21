<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function getRelativeIds($input, $relativeType)
    {
        $relativeIds = [];
        if (isset($input['relatives'])) {
            $relatives = $input['relatives'];
            if (isset($relatives[$relativeType])) {
                foreach ($relatives[$relativeType] as $relativeInput) {
                    $relativeIds[] = $relativeInput['id'];
                }
            }
        }
        return $relativeIds;
    }

    public function shiftFirstLevelArrayKeysToBottom(array $nestedArray)
    {
        $expandedArray = $this->expandNestedArraysIntoKeyListAndValue($nestedArray);
        $rotatedArray = $this->rotateKeys($expandedArray, 1);
        $mergedArray = $this->mergeExpandedTrees($rotatedArray);
        return $mergedArray;
    }

    protected function addKeyAsFinalIndex($finalKey, $array)
    {
        if (!is_array($array)) {
            return [$finalKey => $array];
        } else {
            $newArray = [];
            foreach ($array as $key => $value) {
                $newArray[$key] = $this->addKeyAsFinalIndex($finalKey, $value);
            }
            return $newArray;
        }
    }

    protected function expandNestedArraysIntoKeyListAndValue($nestedArray)
    {
        if (!is_array($nestedArray)) {
            $expandedArray = [
                [
                    'keys' => [],
                    'value' => $nestedArray,
                ]
            ];
            return $expandedArray;
        } else {
            $expandedArray = [];
            foreach ($nestedArray as $key => $value) {
                $subArray = $this->expandNestedArraysIntoKeyListAndValue($value);
                foreach ($subArray as $item) {
                    array_unshift($item['keys'], $key);
                    $expandedArray[] = $item;
                }
            }
            return $expandedArray;
        }
    }

    protected function mergeExpandedTrees($expandedArray)
    {
        $mergedArray = [];
        foreach ($expandedArray as $item) {
            $tail = &$mergedArray;
            $size = count($item['keys']);
            $i = 0;
            foreach ($item['keys'] as $key) {
                $i = ($i + 1);
                // Check if this is the last key.
                if ($i == ($size)) {
                    if (!isset($tail[$key])) {
                        $tail[$key] = $item['value'];
                    } elseif (!is_array($tail[$key])) {
                        $value = $tail[$key];
                        $tail[$key] = [$value, $item['value']];
                    } else {
                        array_push($tail[$key], $item['value']);
                    }
                } else {
                    // If this is not the last key, it needs to contain an array.
                    if (!isset($tail[$key])) {
                        $tail[$key] = [];
                    } elseif (!is_array($tail[$key])) {
                        $value = $tail[$key];
                        $tail[$key] = [$value];
                    }
                    $tail = &$tail[$key];
                }
            }
        }
        return $mergedArray;
    }

    protected function rotateKeys($expandedArray, $steps)
    {
        $rotatedArray = [];
        foreach ($expandedArray as $item) {
            for ($i = 0; $i < $steps; $i++) {
                array_push($item['keys'], array_shift($item['keys']));
            }
            $rotatedArray[] = $item;
        }
        return $rotatedArray;
    }

    /**
     * Formats the $content array into JSON.
     *
     * @param string[] $content The array being returned in response.
     * @return \Illuminate\Http\Response
     */
    protected function formatAjaxResponse(array $content)
    {
        return response()->json($content);
    }
}
