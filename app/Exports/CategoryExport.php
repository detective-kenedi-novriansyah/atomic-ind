<?php

namespace App\Exports;

use App\Models\Category as ModelsCategory;
use Maatwebsite\Excel\Concerns\FromCollection;

class CategoryExport implements FromCollection
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return ModelsCategory::all();
    }
}
