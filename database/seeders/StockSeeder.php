<?php

namespace Database\Seeders;

use App\Models\Stock;
use Illuminate\Database\Seeder;

class StockSeeder extends Seeder
{
    public function run()
    {
        Stock::create(['symbol' => 'AAPL', 'name' => 'Apple', 'current_price' => 150.00]);
        Stock::create(['symbol' => 'TSLA', 'name' => 'Tesla', 'current_price' => 250.00]);
        Stock::create(['symbol' => 'AMZN', 'name' => 'Amazon', 'current_price' => 3300.00]);
    }
}

