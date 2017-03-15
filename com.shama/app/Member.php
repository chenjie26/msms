<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Member extends Model
{
	use SoftDeletes;

	protected $fillable = array(
	    'name',
	    'email',
	    'content',
	    'createAt',
	);

	protected $hidden = [
        'password', 'remember_token', 'token'
    ];
}
