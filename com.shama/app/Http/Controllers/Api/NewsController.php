<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Support\Facades\Notification;
use App\Notifications\NewsPublish;
use Illuminate\Support\Facades\Log;

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

    public function publish($id) {
        $model = $this->model;
        $news = $model::find($id);

        Log::debug('get news is ',  ['object' => $news->toJson()]);

        if(!empty($news->rommNumber)) {
            $users = User::where('active', 1)->orderBy('created_at', 'asc')->get();
            Notification::send($users, new NewsPublish($news));
        } else {
            $users = User::orderBy('created_at', 'desc')->get();
            Notification::send($users, new NewsPublish($news));
        }

        return array(
            "success" => true
        );
    }

    public function notifications($id) {
        $user = User::find($id);
        return response()->json($user->notifications);
    }
}
