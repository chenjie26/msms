<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class NewsTypeController extends Controller
{
	const MODEL_NAME = \App\NewsType::class;

	public function __construct(){
		$this->setModel(self::MODEL_NAME);
	}
}
