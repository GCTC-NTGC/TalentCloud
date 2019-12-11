<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model as Eloquent;
use Illuminate\Support\Facades\Config;
use Carbon\Carbon;
use DateTimeInterface;
use Jenssegers\Date\Date;
use DateTime;

abstract class BaseModel extends Eloquent{
    //Override date functions to return Jenssegers Data instead of Carbon

    /**
     * Get a fresh timestamp for the model.
     *
     * @return Date
     */
    public function freshTimestamp()
    {
        return new Date;
    }

    /**
     * Return a timestamp as DateTime object.
     *
     * @param  mixed $value
     * @return Date
     */
    protected function asDateTime($value)
    {
        $timezone = Config::get('app.timezone');

        // If this value is already a Carbon instance, we shall just return it as is.
        // This prevents us having to re-instantiate a Carbon instance when we know
        // it already is one, which wouldn't be fulfilled by the DateTime check.
        if ($value instanceof Carbon) {
            return Date::parse($value, $timezone);
        }
        if ($value instanceof Date) {
            return $value;
        }
        // If the value is already a DateTime instance, we will just skip the rest of
        // these checks since they will be a waste of time, and hinder performance
        // when checking the field. We will just return the DateTime right away.
        if ($value instanceof DateTimeInterface) {
            return new Date(
                //$value->format('Y-m-d H:i:s.u'), $value->getTimeZone()
                $value->format('Y-m-d H:i:s.u'), $timezone
            );
        }
        // If this value is an integer, we will assume it is a UNIX timestamp's value
        // and format a Carbon object from this timestamp. This allows flexibility
        // when defining your date fields as they might be UNIX timestamps here.
        if (is_numeric($value)) {
            return Date::createFromTimestamp($value, $timezone);
        }
        // If the value is in simply year, month, day format, we will instantiate the
        // Carbon instances from that format. Again, this provides for simple date
        // fields on the database, while still supporting Carbonized conversion.
        if (preg_match('/^(\d{4})-(\d{1,2})-(\d{1,2})$/', $value)) {
            return Date::createFromFormat('Y-m-d', $value, $timezone)->startOfDay();
        }

        // If the date follows the api configured date format, use that.
        $apiFormat = Config::get('app.api_datetime_format');
        $date = DateTime::createFromFormat($apiFormat, $value);
        if ($date && $date->format($apiFormat) == $value) {
            return $date;
        }

        // Finally, we will just assume this date is in the format used by default on
        // the database connection and use that format to create the Carbon object
        // that is returned back out to the developers after we convert it here.
        return Date::createFromFormat($this->getDateFormat(), $value, $timezone);
    }

    /**
     * // Ensure that models serialized using toArray() or toJson() use the api-specific date format
     *
     * @param DateTimeInterface $date
     * @return void
     */
    protected function serializeDate(DateTimeInterface $date)
    {
        return $date->format(Config::get('app.api_datetime_format'));
    }
}
