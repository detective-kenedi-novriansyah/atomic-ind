<?php

namespace App\Http\Resources;

use App\Models\Purse;
use App\Models\User;
use Illuminate\Http\Resources\Json\JsonResource;

class CategoryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            "id" => $this->id,
            "code" => $this->code,       
            "description" => $this->description,       
            "category" => $this->category,       
            "value" => $this->value,       
            "purse" => $this->purse,
            "create_at" => $this->create_at,
            "user_id" => User::find($this->user_id),       
        ];
    }

    public $timestamps = false;
}
