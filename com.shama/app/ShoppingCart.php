<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ShoppingCart extends Model
{
    public function serviceDetail()
    {
        return $this->belongsTo('App\ServiceDetail', 'service_detail_id');
    }

    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
