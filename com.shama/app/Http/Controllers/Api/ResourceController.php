<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Input;
use Validator;
use Ramsey\Uuid\Uuid;;

class ResourceController extends Controller
{
	const MODEL_NAME = \App\Resource::class;

	const FILE_NAME_FORM = 'upload';


	public function __construct(){
		$this->setModel(self::MODEL_NAME);
	}

	public function _add(Request $request){
		$file = array('image' => Input::file(self::FILE_NAME_FORM));
		$callback = Input::get('CKEditorFuncNum');
		$rules = array('image' => 'required',);
		$validator = Validator::make($file, $rules);
		if ($validator->fails()) {
			throw new \Exception('file valid failure' . json_encode($validator->getMessageBag()));
		}else {
		  if (Input::file(self::FILE_NAME_FORM)->isValid()) {
			$destinationPath = 'uploads';
			$extension = Input::file(self::FILE_NAME_FORM)->getClientOriginalExtension();
			$fileName = date('Y-m-d') . '.' . microtime(true).rand(11111,99999).'.'.$extension;
			Input::file(self::FILE_NAME_FORM)->move($destinationPath, $fileName);

			echo ("<script type=\"text/javascript\">");
			echo ("document.domain = 'shama.com';");
			echo ("window.parent.CKEDITOR.tools.callFunction(" . $callback
					. ",'http://api.shama.com/uploads/".$fileName."','')");
			echo ("</script>");

		  }else {
			throw new \Exception('uploaded file is not valid');
		  }
		}

        $model = $this->model;
		$model = new $model();
		$model->uuid = Uuid::uuid1()->getHex();
		$model->user_id = 10;
		$model->filename = $fileName;
        //$model = $this->bindModel(new $model, $this->getContent($request));
	    $model->created_at = date('Y-m-d H:i:s');
        $model->save();
		die();
        return $model;
	}

}
