<?php

namespace App\Constants;

use Illuminate\Support\Str;

class BaseCodeConstant
{
    const OPTION = [];

    /* --- FUNCTIONS --- */

    public static function get(array|null $options = null): array
    {
        if ($options) {
            return collect($options)->map(function ($option) {
                return ['code' => $option, 'name' => static::display($option)];
            })->toArray();
        }

        $data = [];
        foreach (static::OPTION as $value) {
            $data[] = ['code' => $value, 'name' => static::display($value)];
        }

        return $data;
    }

    public static function display(string $value): string
    {
        $value = str_replace("_", " ", $value);
        $value = Str::title($value);

        return $value;
    }

    /**
     * @param string|null $code
     *
     * @return array|null
     */
    public static function codeName(string|null $code = null): array|null
    {
        if (!$code) {
            return null;
        }

        return ['code' => $code, 'name' => static::display($code)];
    }

    /**
     * @param string $value
     *
     * @return string
     */
    public static function toCamelCase(string $value): string
    {
        return Str::camel($value);
    }

}
