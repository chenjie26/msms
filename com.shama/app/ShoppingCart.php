<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ShoppingCart extends Model
{
    protected $fillable = ['service_detail_id', 'user_id'];

    public function serviceDetail()
    {
        return $this->belongsTo('App\ServiceDetail', 'service_detail_id');
    }

    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
