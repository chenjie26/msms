<?php

namespace App\Http\Controllers\Api;

use App\OrderDetail;
use App\ShoppingCart;
use App\User;
use App\Order;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http;
use phpDocumentor\Reflection\Types\Array_;
use Tymon\JWTAuth\Facades\JWTAuth;

class ShoppingCartController extends Controller
{
	const MODEL_NAME = \App\ShoppingCart::class;

	public function __construct(){
		$this->setModel(self::MODEL_NAME);
	}

    public function getPerPage(){
        return 10;
    }

    public function withServices(Request $request)
    {
        return ShoppingCart::with('serviceDetail', 'user')->get()->toArray();
    }

    public function addItem(Request $request) {
        $content = $request->all();

        $token = JWTAuth::parseToken()->authenticate();

        if (!$token) {
            abort(401, 'not auth');
        }

        $items = ShoppingCart::where([['user_id', $token->id], ['service_detail_id', intval($content['service_detail_id'])]])->get();

        $shoppingCart = new ShoppingCart($content);
        $shoppingCart->user_id = $token->id;
        $shoppingCart->quantity = $content['quantity'];

        if ($items->count() > 0) {
            $item = $items->first();
            $shoppingCart = $item;
            $shoppingCart->quantity = $shoppingCart->quantity + 1;
        }

        $shoppingCart->save();
        return $shoppingCart;
    }

    public function changeQuantity(Request $request) {
        $shoppingCart = ShoppingCart::find($request->input('updateId'));
        $shoppingCart->quantity = $request->input('quantity');

        $shoppingCart->save();

        return $shoppingCart;
    }

    public function transferToOrder(Request $request) {
        $content = $request->all();

        $token = JWTAuth::parseToken()->authenticate();

        if (!$token) {
            abort(401,'not auth');
        }

        $order = new Order();
        $order->name = $token->name;
        $order->user_id = $token->user_id;
        $orderItems = array();

        $items = ShoppingCart::with('serviceDetail')->whereIn('id', $content['ids'])->get()->toArray();

        $totalPrice = 0;
        foreach ($items as &$item) {
            $orderItem = new OrderDetail();
            $orderItem->service_detail_id = $item['service_detail_id'];
            $orderItem->price = $item['service_detail']['price'];
            $orderItem->content = $item['service_detail']['desc'];
            $orderItems[] = $orderItem;
            $totalPrice = $totalPrice + $orderItem->price;
        }

        $order->price = $totalPrice;
        $order->status = 0;
        $order->user_id = $token->user_id;
        if ($order->save()) {
            if ($order->details()->saveMany($orderItems)) {
                ShoppingCart::destroy($content['ids']);
                return array(
                    "success" => true
                );
            }
        }

        return array(
            "success" => false
        );
    }
}
