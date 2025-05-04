<?php

namespace App\Logics\Hr\Traits;

use App\Models\Misc\ImportJob;
use Illuminate\Http\Request;
use Maatwebsite\Excel\HeadingRowImport;

trait CanImport {

    private string $model;

    public function uploadImport(Request $request)
    {
        $this->checkJob();

        $user = auth_user();
        
        $file = $request->file('file');
        $extension = $file->getClientOriginalExtension();

        $filename = 'temp/import/' . $user->id . time() . '.' . $extension;
        
        $file->storeAs($filename);

        $headings = (new HeadingRowImport())->toArray($file);

        return success([
            'file'      => $filename,
            'headings'  => $headings[0][0],
        ]);
    }

    private function checkJob()
    {
        $user = auth_user();

        $jobExists = ImportJob::where('model', $this->model)
            ->where('created_by', $user->id)
            ->whereNull('completed_at')
            ->exists();
        if ($jobExists) {
            error('Your previous import is being processed, please wait for it to complete', 400);
        }
    }

    abstract public function import(Request $request);

}