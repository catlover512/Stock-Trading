<?php

namespace App\Http\Controllers;

use App\Events\StockPriceUpdated;
use Illuminate\Http\Request;

class StockController extends Controller
{
    public function updatePrice(Request $request)
    {
        $price = $request->input('price');
        event(new StockPriceUpdated($price));
        return response()->json(['success' => true]);
    }
}

