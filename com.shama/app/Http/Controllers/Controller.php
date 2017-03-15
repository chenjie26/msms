<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    protected $model;

    public function setModel($model){
        $this->model = $model;
    }

    public function getModel(){
		return  $this->model;
	}

    public function getPerPage(){
        return 15;
    }

    public function _list(Request $request){
        $model = $this->model;
		return  $model::paginate($this->getPerPage());
	}

	public function _add(Request $request){
        $model = $this->model;
        $model = $this->bindModel(new $model, $this->getContent($request));
        $model->created_at = date('Y-m-d H:i:s');
        $model->save();
        return $model;
	}

	public function _del(Request $request, $id){
        $model = $this->model;
        $model::destroy($id);
        return $id;
	}

	public function _edit(Request $request, $id){
        $model = $this->model;
        $model = $this->bindModel($model::find($id), $this->getContent($request));
        $model->updated_at = date('Y-m-d H:i:s');
        $model->save();
        return $model;
	}

	public function _detail(Request $request, $id){
        $model = $this->model;
		return  $model::find($id);
	}

    public function getContent($request){
        return json_decode($request->getContent(), true);
    }

    public function bindModel($model, $data){
        if(!$model)
            throw new \Exception("empty model", 1);

        foreach ($data as $key => $value) {
                $model->{$key} = $value;
        }
        return $model;
    }
}
