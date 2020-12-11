<?php

namespace Database\Factories;

use App\Models\Purse;
use Illuminate\Database\Eloquent\Factories\Factory;

class PurseFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Purse::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->name,
            'user_id' => \App\Models\User::all()->random()->id,
            'status' => $this->faker->boolean(100),
            'reference' => rand(999999,9999999),
            'description' => $this->faker->text,
        ];
    }
}
