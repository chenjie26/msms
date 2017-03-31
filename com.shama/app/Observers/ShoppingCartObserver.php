<?php

/**
 * Created by PhpStorm.
 * User: jackson
 * Date: 2017-3-31
 * Time: 17:09
 */
namespace App\Observers;

use App\ShoppingCart;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\User;

class ShoppingCartObserver
{
    /**
     * 监听用户创建的事件。
     *
     * @param  ShoppingCart  $shoppingCart
     * @return void
     */
    public function saving(ShoppingCart $shoppingCart)
    {
        $token = JWTAuth::parseToken()->authenticate();

        if (!$token) {
            abort(401, 'not auth');
        }

        $user =  User::find($token->id);

        $shoppingCart->user_id = $user->id;
    }
}