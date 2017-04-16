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
            if ($news->roomNumber == 'male' || $news->roomNumber == 'female') {
                $users = User::where('sex', $news->roomNumber)->orderBy('created_at', 'asc')->get();
                Notification::send($users, new NewsPublish($news));
            }

            if ($news->roomNumber == '11' || $news->roomNumber == '12') {
                $users = User::where('roomNumber', $news->roomNumber)->orderBy('created_at', 'asc')->get();
                Notification::send($users, new NewsPublish($news));
            }
        } else if (!empty($news->user_id)) {
            $users = User::where('id', $news->user_id)->orderBy('created_at', 'asc')->get();
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
