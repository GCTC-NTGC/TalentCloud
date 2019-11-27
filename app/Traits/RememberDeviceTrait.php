<?php

namespace App\Traits;

trait RememberDeviceTrait
{
    /**
     * The column name of the "remember device" token.
     *
     * @var string
     */
    protected $rememberDeviceTokenName = 'remember_device_token';

    /**
     * Get the token value for the "remember device" session.
     *
     * @return string|null
     */
    public function getRememberDeviceToken()
    {
        if (! empty($this->getRememberDeviceTokenName())) {
            return (string) $this->{$this->getRememberDeviceTokenName()};
        }
    }

    /**
     * Set the token value for the "remember device" session.
     *
     * @param  string $value
     * @return void
     */
    public function setRememberDeviceToken($value)
    {
        if (! empty($this->getRememberDeviceTokenName())) {
            $this->{$this->getRememberDeviceTokenName()} = $value;
        }
    }

    /**
     * Get the column name for the "remember device" token.
     *
     * @return string
     */
    public function getRememberDeviceTokenName()
    {
        return $this->rememberDeviceTokenName;
    }
}
