<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class MemberActiveController extends Controller
{
	const MODEL_NAME = \App\MemberActive::class;

	public function __construct(){
		$this->setModel(self::MODEL_NAME);
	}

    public function getPerPage(){
        return 10;
    }

	public function login(){
		return [];
	}

	public function _list(Request $request){
        $model = $this->model;
        $activeId = $request->input('active_id');

		if($activeId){
			$query = $model::where(function($query) use ($activeId){
				$query->where('active_id',$activeId);
			});
			$paginate =  $query->paginate($this->getPerPage());
		}else{
			$paginate =  $model::paginate($this->getPerPage());
		}

		return $paginate;

	}
}
