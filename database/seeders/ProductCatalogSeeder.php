<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\Product;

class ProductCatalogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = Category::factory()->count(5)->create();
    
        Product::factory()
            ->count(20)
            ->create()
            ->each(function (Product $product) use ($categories): void {
                $ids = $categories->random(rand(1, 3))->pluck('id')->all();
                $product->categories()->sync($ids);
            });
    }
}
