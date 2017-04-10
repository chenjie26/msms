<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'username', 'email', 'password', 'openId', 'sex', 'buildingNumber', 'roomNumber', 'birthDay', 'name'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token'
    ];

    public static function authenticate($username, $password)
    {
        $userList = User::where('username', $username);
//        Log::debug('user count is ', $userList->count());
//        if ($userList->count() <= 0) {
//            return false;
//        }
        $user = $userList->first();
        if (!$user) {
            return false;
        }
        if (!Hash::check($password, $user->password)) {
            return false;
        }
        return $user;
    }

    public function setPasswordAttribute($password)
    {
        $this->attributes['password'] = Hash::make($password);
    }

    
}
