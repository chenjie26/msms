<?php

namespace App\Http\Controllers\Api;

use App\Order;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http;
use Tymon\JWTAuth\Facades\JWTAuth;

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
            $query = $model::join('users','orders.user_id','=','users.id')
            ->select('orders.name','orders.message','orders.price','users.name as m_name','orders.status','orders.created_at','orders.uuid','orders.id')->where(function($query) use ($keywords){
                $query->where('orders.name','like','%'.$keywords.'%')
                    ->orWhere('users.name','like','%'.$keywords.'%');
//                    ->orWhere('uuid','like','%'.$keywords.'%');
            });
            $paginate =  $query->paginate($this->getPerPage());
        }else{
            $paginate =  $model::join('users','orders.user_id','=','users.id')
            ->select('orders.name','orders.message','orders.price','users.name as m_name','orders.status','orders.created_at','orders.uuid','orders.id')
            ->paginate($this->getPerPage());
        }

        return $paginate;

    }

    public function withDetails(Request $request)
    {
        $token = JWTAuth::parseToken()->authenticate();
        return Order::with('details.serviceDetail', 'user')->where('user_id', $token->id)->get();
    }
}
