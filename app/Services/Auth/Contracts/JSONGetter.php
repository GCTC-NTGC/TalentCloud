<?php

namespace App\Services\Auth\Contracts;

interface JSONGetter
{
    /**
     * @param string $url
     * @param array  $params
     * @param array  $options
     *
     * @return array
     */
    public function get(string $url, array $params = [], array $options = []);
}
