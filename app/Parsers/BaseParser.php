<?php

namespace App\Parsers;

class BaseParser
{
    public static function get($collections) : array | null
    {
        if (empty($collections) || count($collections) == 0) {
            return null;
        }

        $data = [];
        foreach ($collections as $collection) {
            $data[] = static::first($collection);
        }

        return $data;
    }

    public static function first($data) : array | null
    {
        if (empty($data)) {
            return null;
        }

        $result = collect($data)->except(['created_at', 'updated_at', 'deleted_at'])->toArray();

        return $result + [
            'created_at' => $data->created_at->format('d/m/Y H:i')
        ];
    }

    public static function briefs($collections) : array | null
    {
        if (empty($collections) || count($collections) == 0) {
            return null;
        }

        $data = [];
        foreach ($collections as $collection) {
            $data[] = static::brief($collection);
        }

        return $data;
    }

    public static function brief($data) : array | null
    {
        return static::first($data);
    }

}