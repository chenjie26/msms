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
use Illuminate\Support\Facades\Log;

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
    }
}