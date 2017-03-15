<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class OrderDetailController extends Controller
{
    const MODEL_NAME = \App\OrderDetail::class;

    public function __construct(){
        $this->setModel(self::MODEL_NAME);
    }

    public function getPerPage(){
        return 10;
    }

    public function _list(Request $request){
        $model = $this->model;
        $orderId = $request->input('order_id');

        if($orderId){
            $query = $model::where('order_id',$orderId);
            $paginate =  $query->paginate($this->getPerPage());
        }else{
            $paginate =  $model::paginate($this->getPerPage());
        }

        return $paginate;

    }
}
