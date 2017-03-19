<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OrderDetail extends Model
{

    public function serviceDetail()
    {
        return $this->belongsTo('App\ServiceDetail');
    }
}
