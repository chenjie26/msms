<?php

namespace App\Http\Controllers\Api;

use App\ShoppingCart;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http;

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
}
