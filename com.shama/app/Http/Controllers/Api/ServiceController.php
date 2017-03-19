<?php

namespace App\Http\Controllers\Api;

use App\Service;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http;

class ServiceController extends Controller
{
	const MODEL_NAME = \App\Service::class;

	public function __construct(){
		$this->setModel(self::MODEL_NAME);
	}

    public function getPerPage(){
        return 10;
    }

    public function withDetails(Request $request)
    {
        return Service::with('details')->get();
    }
}
