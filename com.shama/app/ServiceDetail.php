<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ServiceDetail extends Model
{

    protected $casts = ['price' => 'float',];

    public function service()
    {
        return $this->belongsTo('App\Service');
    }
}
