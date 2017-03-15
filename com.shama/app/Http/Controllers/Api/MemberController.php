<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use \App\Member;
use Ramsey\Uuid\Uuid;
use Ramsey\Uuid\Exception\UnsatisfiedDependencyException;


class MemberController extends Controller
{
	const MODEL_NAME = \App\Member::class;

	const SALT = "TOM123";

	public function __construct(){
		$this->setModel(self::MODEL_NAME);
	}

    public function getPerPage(){
        return 20;
    }

    public function _list(Request $request){
        $model = $this->model;
        $keywords = $request->input('keywords');
        
		if($keywords){
			$query = $model::where(function($query) use ($keywords){
				$query->where('name','like','%'.$keywords.'%')
					->orWhere('phone','like','%'.$keywords.'%')
					->orWhere('email','like','%'.$keywords.'%')
					->orWhere('birthday','like','%'.$keywords.'%')
					->orWhere('card_id','like','%'.$keywords.'%');
			});
			$paginate =  $query->paginate($this->getPerPage());
		}else{
			$paginate =  $model::paginate($this->getPerPage());
		}
		
		return $paginate;

	}

	public function login(Request $request){
		$data = $this->getContent($request);
		if(!isset($data['email']) || !isset($data['password'])){
			throw new \Exception("Error Processing Request, email or password no set", 1);
		}

		$user = Member::where('email', $data['email'])->first();

		if(!$user)
			throw new \Exception("username not correct.", 1);

		if(md5($data['password']. self::SALT) != $user->password)
			throw new \Exception("passowrd not correct.", 1);
		$user->token = Uuid::uuid1()->getHex();
		$user->last_login = date('Y-m-d H:i:s');
		$user->save();
		return ['token'=>$user->token];
	}

	public function logout(Request $request){
		$token = $request->header('token');
		if(!$token)
			throw new \Exception("token not set", 1);
		$user = Member::where('token', $token)->first();
		if(!$user)
			throw new \Exception("token unvalid", 1);
		$user->token = "";
		$user->save();
		return ['token' => '','message'=>'logout success'];
	}

	public function profile(Request $request){
		$token = $request->header('token');
		if(!$token)
			throw new \Exception("token not set", 1);
		$user = Member::where('token', $token)->first();

		if(!$user)
			throw new \Exception("token unvalid", 1);

		return $user;
	}
}
