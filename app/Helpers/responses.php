<?php

use App\Exceptions\FailedException;
use App\Parsers\BaseParser;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\LengthAwarePaginator;

if (!function_exists('formatted_response')) {
    function formatted_response(mixed $data = null, 
                      mixed $pagination = null, 
                      ?string $message = '', 
                      ?int $code = 200
    ) {
        $output = [
            'data'          => $data,
            'pagination'    => $pagination,
            'status'        => [
                'code'      => $code,
                'message'   => $message
            ]
        ];

        return response()->json($output, $code);
    }
}

if (!function_exists('success')) {
    function success (mixed $data = null, ?string $message = 'Success') {
        $pagination = pagination($data);
        $data       = parse($data);

        return formatted_response($data, $pagination, $message);
    }
}


if (!function_exists('failed')) {
    function failed (?string $message = 'An Error Occured!', ?int $code = 500) {
        return formatted_response(message: $message, code: $code);
    }
}

if (!function_exists('error')) {
    function error (?string $message = 'An Error Occured!', ?int $code = 500) {
        throw new FailedException($message, $code);
    }
}

if (!function_exists('pagination')) {
    function pagination (mixed $data) : array | null {
        if (!($data instanceof LengthAwarePaginator)) {
            return null;
        }

        $totalPage = $data->lastPage();
        $currentPage = $data->currentPage();

        $next = $currentPage;
        if ($currentPage < $totalPage) {
            $next++;
        }

        $prev = $currentPage;
        if ($currentPage > 1) {
            $prev--;
        }

        return [
            'count'         => $data->count(),
            'total'         => $data->total(),
            'current_page'  => $currentPage,
            'per_page'      => $data->perPage(),
            'total_page'    => $totalPage,
            'pages'         => [
                'next'      => $next,
                'previous'  => $prev
            ],
        ];
    }
}


if (!function_exists('parse')) {
    function parse (mixed $data) : mixed {
        if (is_null($data)) {
            return null;
        }

        if (is_array($data)) {
            return parse_array($data);
        }
        
        if (is_object($data)) {
            return parse_object($data);
        }

        return $data;
    }
}

if (!function_exists('parse_array')) {
    function parse_array (array $data) : array | null {
        if (!count($data)) {
            return null;
        }

        if (!is_object($data[0])) {
            return $data;
        }

        if (property_exists($data[0], 'parser')) {
            $parser = $data[0]->parser;
        } else {
            $parser = BaseParser::class;
        }

        return $parser::get($data);
    }
}

if (!function_exists('parse_object')) {
    function parse_object (mixed $data) : mixed {
        $firstItem = $data;
        
        if ($data instanceof LengthAwarePaginator) {
            $firstItem = collect($data->items())->first();
        }

        if ($data instanceof Collection) {
            $firstItem = $data->first();
        }

        if (property_exists($firstItem, 'parser')) {
            $parser = $firstItem->parser;
        } else {
            $parser = BaseParser::class;
        }

        
        if ($data instanceof Model) {
            return $parser::first($data);
        }

        return $parser::get($data);
    }
}



