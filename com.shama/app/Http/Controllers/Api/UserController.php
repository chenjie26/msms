<?php
/**
 * Created by PhpStorm.
 * User: jackson
 * Date: 2017/3/27
 * Time: 21:39
 */

namespace App\Http\Controllers\Api;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use phpDocumentor\Reflection\Types\Array_;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Validator;
use SmsManager as Manager;

class UserController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('username', 'password');
        $authenticatedUser = User::authenticate($credentials['username'], $credentials['password']);

        if (!$authenticatedUser) {
            return response()->json(['error' => 'invalid_credentials'], 401);
        }

        $authenticatedUser['token'] = JWTAuth::fromUser($authenticatedUser);
        return response()->json($authenticatedUser);
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'username' => 'required|max:255|unique:users|confirm_mobile_not_change',
            'password' => 'required|min:6',
            'verifyCode' => 'required|verify_code',
        ]);
    }

    public function store(Request $request)
    {
        Log::debug('storing');

        $content = $request->all();

        $formValidator = $this->validator($content);

        if ($formValidator->fails()) {
            return $formValidator->messages();
        }

        $saveUser = array(
            "username" => $content['username'],
            "password" => $content['password'],
            "email" => array_key_exists ('email', $content) ? $content['email'] : ''
        );
        $user = new User($saveUser);

        if (!$user->save()) {
            abort(500, 'Could not save user.');
        }

        Manager::forgetState();
        $user['token'] = JWTAuth::fromUser($user);
        return $user;
    }

    public function update(Request $request)
    {
        Log::debug('updating');

        $token = JWTAuth::parseToken()->authenticate();

        if (!$token) {
            abort(401, 'not auth');
        }

        $user = User::find($token->id);
        $content = $request->all();

        if (array_key_exists ('name', $content)) {
            $user->name = $content['name'];
        }

        if (array_key_exists ('sex', $content)) {
            $user->sex = $content['sex'];
        }

        if (array_key_exists ('buildingNumber', $content)) {
            $user->buildingNumber = $content['buildingNumber'];
        }

        if (array_key_exists ('roomNumber', $content)) {
            $user->roomNumber = $content['roomNumber'];
        }

        if (array_key_exists ('birthDay', $content)) {
            $user->birthDay = $content['birthDay'];
        }

        if ($user->save()) {
            return $user;
        }
    }

    public function profile()
    {
        $token = JWTAuth::parseToken()->authenticate();

        if (!$token) {
            abort(401, 'not auth');
        }

        return User::find($token->id);
    }

    public function getByToken()
    {
        return JWTAuth::parseToken()->authenticate();
    }
}