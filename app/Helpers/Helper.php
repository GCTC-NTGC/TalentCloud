<?php

use Jenssegers\Date\Date;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Lang;

if (!function_exists('humanizeDate')) {
    /**
     * Computes a human readable localized date.
     *
     * @param Date $datetime DateTime object to translate.
     *
     * @return string
     */
    function humanizeDate(Date $datetime) : string
    {
        $dateFormat = Config::get('app.date_format');
        $locale = App::getLocale();
        $timezone = Config::get('app.local_timezone');

        $datetime->setTimezone(new \DateTimeZone($timezone));

        return $datetime->format($dateFormat[$locale]);
    }
}

if (!function_exists('humanizeTime')) {
    /**
     * Computes a human readable localized time.
     *
     * @param Date $datetime DateTime object to translate.
     *
     * @return string
     */
    function humanizeTime(Date $datetime) : string
    {
        $timeFormat = Config::get('app.time_format');
        $locale = App::getLocale();
        $timezone = Config::get('app.local_timezone');

        $datetime->setTimezone(new \DateTimeZone($timezone));

        $displayTime = $datetime->format($timeFormat[$locale]);

        if ($locale == 'fr') {
            $displayTime = str_replace(['EST', 'EDT'], ['HNE', 'HAE'], $displayTime);
        }

        return $displayTime;
    }
}

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

if (!function_exists('humanizeLastDay')) {
    /**
     * Returns the date of the last full day a person has before a deadline time.
     *
     * @param Date $datetime DateTime object to transform to date of last day.
     *
     * @return string
     */
    function humanizeLastDay(Date $datetime) : string
    {
        $lastday = $datetime->sub('1 day');

        return humanizeDate($lastday);
    }
}

if (!function_exists('ptDayStartToUtcTime')) {
    /**
     * Given a date, creates a datetime object representing the start of day
     * in the most Western timezone in Canada (America/Vancouver).
     *
     * @param string $date ISO standard date YYYY-MM-DD.
     *
     * @return Date
     */
    function ptDayStartToUtcTime(string $date) : Date
    {
        $jobTimezone = Config::get('app.job_timezone');
        $dbTimezone = Config::get('app.timezone');
        // Create a new date that's the beginning of the day in
        // Pacific Daylight/Standard Time.
        $date = new Date("$date 00:00:00", new \DateTimeZone($jobTimezone));
        // Convert to UTC for correct offset.
        $date->setTimezone($dbTimezone);

        return $date;
    }
}

if (!function_exists('ptDayEndToUtcTime')) {
    /**
     * Given a date, creates a datetime object representing the start of day
     * in the most Western timezone in Canada (America/Vancouver).
     *
     * @param string $date ISO standard date YYYY-MM-DD.
     *
     * @return Date
     */
    function ptDayEndToUtcTime(string $date) : Date
    {
        $jobTimezone = Config::get('app.job_timezone');
        $dbTimezone = Config::get('app.timezone');
        // Create a new date that's the beginning of the day in
        // Pacific Daylight/Standard Time.
        $date = new Date("$date 23:59:59", new \DateTimeZone($jobTimezone));
        // Convert to UTC for correct offset.
        $date->setTimezone($dbTimezone);

        return $date;
    }
}
