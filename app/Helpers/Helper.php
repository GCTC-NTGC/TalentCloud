<?php

use Jenssegers\Date\Date;
use Illuminate\Support\Facades\Lang;

if (!function_exists('humanizeDateDiff')) {
    /**
     * Computes a human readable time difference between two dates.
     *
     * @param Date $datetime DateTime object to measure.
     * @param Date $origin   DateTime object to use as a reference.
     *
     * @return string
     */
    function humanizeDateDiff(Date $datetime, Date $origin = null) : string
    {
        if (!isset($origin)) {
            $origin = new Date();
        }
        $interval = $datetime->diff($origin);

        $d = $interval->d;
        $h = $interval->h;
        $m = $interval->i;
        $s = $interval->s;

        if ($d > 0) {
            $unit = 'day';
            $count = $d;
        } elseif ($h > 0) {
            $unit = 'hour';
            $count = $h;
        } elseif ($m > 0) {
            $unit = 'minute';
            $count = $m;
        } else {
            $unit = 'second';
            $count = $s;
        }

        $key = "common/time.$unit";

        return Lang::choice($key, $count);
    }
}
