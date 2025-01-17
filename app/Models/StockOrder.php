<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StockOrder extends Model
{
    use HasFactory;

    protected $fillable = [
        'stock_id',
        'old_price',
        'new_price',
        'admin_id',
    ];

    // Quan hệ với Stock
    public function stock()
    {
        return $this->belongsTo(Stock::class);
    }

    // Quan hệ với Admin (User)
    public function admin()
    {
        return $this->belongsTo(User::class, 'admin_id');
    }
}
