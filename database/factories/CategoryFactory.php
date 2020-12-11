<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Purse;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class CategoryFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Category::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */

    public function definition()
    {
        $cut = strlen($this->faker->randomDigitNot(0));
        $display = '';
        for($i = 0; $i < 10 - $cut; $i++) {
            $display = $display . 0;
        }
        return [
            'code' => 'WNI'. $display . rand(0,100000),
            'description' => $this->faker->text,
            'category' => $this->faker->name,
            'purse' => $this->faker->name,
            "create_at" => $this->faker->dateTime($max = 'now', $timezone = null),
            "update_at" => $this->faker->dateTime($max = 'now', $timezone = null),
            'value' => $this->faker->numberBetween($min = 1000, $max = 900000),
            'user_id' => User::all()->random()->id,
        ];
    }
}
