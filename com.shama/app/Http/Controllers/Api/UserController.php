<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use Ramsey\Uuid\Uuid;
use Ramsey\Uuid\Exception\UnsatisfiedDependencyException;


class UserController extends Controller
{
	const MODEL_NAME = \App\User::class;

	const SALT = "TOM123";

	public function __construct(){
		$this->setModel(self::MODEL_NAME);
	}


    public function getPerPage(){
        return 10;
    }

	public function login(Request $request){
		$data = $this->getContent($request);
		if(!isset($data['email']) || !isset($data['password'])){
			throw new \Exception("Error Processing Request, email or password no set", 101);
		}

		$user = User::where('email', $data['email'])->first();

		if(!$user)
			throw new \Exception("username not correct.", 102);

		if(md5($data['password']. self::SALT) != $user->password)
			throw new \Exception("passowrd not correct.", 103);
		$user->token = Uuid::uuid1()->getHex();
		$user->last_login = date('Y-m-d H:i:s');
		$user->save();
		return ['token'=>$user->token];
	}

	public function logout(Request $request){
		$token = $request->header('token');
		if(!$token)
			throw new \Exception("token not set", 1);
		$user = User::where('token', $token)->first();
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
		$user = User::where('token', $token)->first();
		if(!$user)
			throw new \Exception("token unvalid", 1);
		return $user;
	}
}
