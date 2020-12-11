<?php

namespace App\Http\Resources;

use App\Models\User;

use Illuminate\Http\Resources\Json\JsonResource;

class PurseCollection extends JsonResource
{

    
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'status' => $this->status,
            'reference' => $this->reference,
            'description' => $this->description,
            'user_id' => User::find($this->user_id),
        ];
    }
}
