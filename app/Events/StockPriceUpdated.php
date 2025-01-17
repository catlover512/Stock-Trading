<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Queue\SerializesModels;

class StockPriceUpdated implements ShouldBroadcast
{
    use InteractsWithSockets, SerializesModels;

    public $price;

    public function __construct($price)
    {
        $this->price = $price;
    }

    public function broadcastOn()
    {
        return new Channel('stock-updates');
    }

    public function broadcastAs()
    {
        return 'stock.updated';
    }
}

