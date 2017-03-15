<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class OrderController extends Controller
{
	const MODEL_NAME = \App\Order::class;

	public function __construct(){
		$this->setModel(self::MODEL_NAME);
	}

    public function getPerPage(){
        return 10;
    }

    public function _list(Request $request){
        $model = $this->model;
        $keywords = $request->input('keywords');

        if($keywords){
            $query = $model::join('members','orders.user_id','=','members.id')
            ->select('orders.name','orders.message','orders.price','members.name as m_name','orders.status','orders.created_at','orders.uuid','orders.id')->where(function($query) use ($keywords){
                $query->where('orders.name','like','%'.$keywords.'%')
                    ->orWhere('members.name','like','%'.$keywords.'%')
                    ->orWhere('uuid','like','%'.$keywords.'%');
            });
            $paginate =  $query->paginate($this->getPerPage());
        }else{
            $paginate =  $model::join('members','orders.user_id','=','members.id')
            ->select('orders.name','orders.message','orders.price','members.name as m_name','orders.status','orders.created_at','orders.uuid','orders.id')
            ->paginate($this->getPerPage());
        }

        return $paginate;

    }
}
