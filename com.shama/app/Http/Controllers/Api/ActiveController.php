<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ActiveController extends Controller
{
	const MODEL_NAME = \App\Active::class;

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
			$query = $model::where(function($query) use ($keywords){
				$query->where('name','like','%'.$keywords.'%')
					->orWhere('message','like','%'.$keywords.'%');
			});
			$paginate =  $query->paginate($this->getPerPage());
		}else{
			$paginate =  $model::paginate($this->getPerPage());
		}

		return $paginate;

	}
}
