<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ServiceDetailController extends Controller
{
	const MODEL_NAME = \App\ServiceDetail::class;

	public function __construct(){
		$this->setModel(self::MODEL_NAME);
	}

    public function getPerPage(){
        return 10;
    }

	public function _list(Request $request){
        $model = $this->model;
        $serviceId = $request->input('service_id');

        if($serviceId){
            $query = $model::where('service_id',$serviceId);
            $paginate =  $query->paginate($this->getPerPage());
        }else{
            $paginate =  $model::paginate($this->getPerPage());
        }

        return $paginate;

    }
}
