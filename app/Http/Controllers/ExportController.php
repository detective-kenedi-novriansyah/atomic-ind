<?php

namespace App\Http\Controllers;

use App\Exports\CategoryExport;
use App\Exports\UsersExport;
use App\Models\Category;
use Illuminate\Support\Facades\Storage;
use Maatwebsite\Excel\Facades\Excel;
use Maatwebsite\Excel\Mixins\DownloadCollection;

class ExportController extends Controller
{
    public function export() 
    {
        $files = Excel::download(new CategoryExport, storage_path('/framework/laravel-excel.xlsx/laravel-excel.xlsx'));
        return response()->json([
            'message' => 'Success'
        ]);
    }
}
