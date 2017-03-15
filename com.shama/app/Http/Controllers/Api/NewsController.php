<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class NewsController extends Controller
{
	const MODEL_NAME = \App\News::class;

	public function __construct(){
		$this->setModel(self::MODEL_NAME);
	}

    public function getPerPage(){
        return 10;
    }

	public function _list(Request $request){
        $model = $this->model;
        $typeId = $request->input('type_id');

        if($typeId){
            $query = $model::where('type_id',$typeId);
            $paginate =  $query->paginate($this->getPerPage());
        }else{
            $paginate =  $model::paginate($this->getPerPage());
        }

        return $paginate;

    }
}
