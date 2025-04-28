<?php

namespace App\Http\Controllers\Api\Hr;

use App\Http\Controllers\Controller;
use App\Http\Requests\Hr\PositionRequest;
use App\Logics\Hr\PositionLogic;
use App\Models\Hr\Position;
use Illuminate\Http\Request;

class PositionController extends Controller
{
    public function get(Request $request)
    {
        $positions = Position::filter($request)->paginate($request->limit ?: 50);

        return success($positions);
    }

    public function find($id)
    {
        $position = Position::find($id);
        if (empty($position)) {
            error('Position not found', 404);
        }

        return success($position);
    }

    public function create(PositionRequest $request)
    {
        return (new PositionLogic())->create($request);
    }

    public function update(PositionRequest $request, $id)
    {
        $position = Position::find($id);
        if (empty($position)) {
            error('Position not found', 404);
        }

        return (new PositionLogic($position))->update($request);
    }

    public function delete($id)
    {
        $position = Position::find($id);
        if (empty($position)) {
            error('Position not found', 404);
        }

        return (new PositionLogic($position))->delete();
    }
}
