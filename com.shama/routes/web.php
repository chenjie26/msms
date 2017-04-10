<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

//Route::any('/wechat', 'App\Http\Controllers\Api\WechatController@serve');

//Route::group(['middleware' => ['web', 'wechat.oauth']], function () {
//    Route::get('/wxUser', function () {
//        $user = session('wechat.oauth_user'); // 拿到授权用户资料
//
//        return $user;
//    });
//});

Route::group(['middleware' => ['web', 'wechat.oauth']], function () {
    Route::get('/wxUser', function () {
        $user = session('wechat.oauth_user'); // 拿到授权用户资料

        return response()->json($user);
    });
});


$api = app('Dingo\Api\Routing\Router');
$api->version('v1', function ($api) {
    $api->group(['namespace' => 'App\Http\Controllers\Api'], function ($api) {
//namespace声明路由组的命名空间，因为上面设置了"prefix"=>"api",所以以下路由都要加一个api前缀，比如请求/api/users_list才能访问到用户列表接口
        $api->group(['EnableCrossRequestMiddleware'], function ($api) {

            $api->any('/wechat', 'WechatController@serve');
            $api->any('/wxAuth', 'WechatController@auth');
            $api->any('/shamaApp', 'WechatController@shamApp');
            $api->any('/wxAuth/callback', 'WechatController@oauthCallback');
            $api->any('/wxAuth/profile', 'WechatController@getWeixinProfile');
        #管理员可用接口

            $api->get('/laravel_sms/info', '\Toplan\Sms\SmsController@getInfo');
            $api->post('/laravel_sms/verify-code', 'SMSController@postSendCode');
            $api->post('/laravel_sms/voice-verify', 'SMSController@postVoiceVerify');
            $api->post('/laravel_sms/codeVerify', 'SMSController@codeVerify');

            $api->post('/user/login','UserController@login');
            $api->get('/user/logout','UserController@logout');
            $api->get('/user/profile','UserController@profile');
            $api->get('/user/getByToken', 'UserController@getByToken');
            $api->post('/user/register','UserController@store');
            $api->put('/user','UserController@update');
            $api->get('/users','UserController@_list');

            $api->post('/member/login','MemberController@login');
            $api->get('/member/logout','MemberController@logout');
            $api->get('/member/profile','MemberController@profile');

            $api->get('/members','MemberController@_list');
            $api->get('/members/{id}','MemberController@_detail');
            $api->post('/members','MemberController@_add');
            $api->put('/members/{id}','MemberController@_edit');
            $api->delete('/members/{id}','MemberController@_del');

            $api->get('/houses','HouseController@_list');
            $api->get('/houses/{id}','HouseController@_detail');
            $api->post('/houses','HouseController@_add');
            $api->put('/houses/{id}','HouseController@_edit');
            $api->delete('/houses/{id}','HouseController@_del');

            $api->get('/orders','OrderController@_list');
            $api->get('/ordersWithDetails','OrderController@withDetails');
            $api->get('/orders/{id}','OrderController@_detail');
            $api->post('/orders','OrderController@_add');
            $api->put('/orders/{id}','OrderController@_edit');
            $api->delete('/orders/{id}','OrderController@_del');

            $api->get('/shoppingCarts','ShoppingCartController@_list');
            $api->get('/shoppingCarts/withServices','ShoppingCartController@withServices');
            $api->get('/shoppingCarts/{id}','ShoppingCartController@_detail');
            $api->post('/shoppingCarts','ShoppingCartController@_add');
            $api->post('/shoppingCarts/addItem','ShoppingCartController@addItem');
            $api->post('/shoppingCarts/changeQuantity','ShoppingCartController@changeQuantity');
            $api->put('/shoppingCarts/{id}','ShoppingCartController@_edit');
            $api->delete('/shoppingCarts/{id}','ShoppingCartController@_del');
            $api->post('/shoppingCarts/transferToOrder','ShoppingCartController@transferToOrder');

            $api->get('/feedbacks','FeedbackController@_list');
            $api->get('/feedbacks/{id}','FeedbackController@_detail');
            $api->post('/feedbacks','FeedbackController@_add');
            $api->put('/feedbacks/{id}','FeedbackController@_edit');
            $api->delete('/feedbacks/{id}','FeedbackController@_del');

            $api->get('/services','ServiceController@_list');
            $api->get('/servicesWithDetails','ServiceController@withDetails');
            $api->get('/services/{id}','ServiceController@_detail');
            $api->post('/services','ServiceController@_add');
            $api->put('/services/{id}','ServiceController@_edit');
            $api->delete('/services/{id}','ServiceController@_del');

            $api->get('/service_details','ServiceDetailController@_list');
            $api->get('/service_details/{id}','ServiceDetailController@_detail');
            $api->post('/service_details','ServiceDetailController@_add');
            $api->put('/service_details/{id}','ServiceDetailController@_edit');
            $api->delete('/service_details/{id}','ServiceDetailController@_del');

            $api->get('/baseinfos','BaseinfoController@_list');
            $api->get('/baseinfos/{id}','BaseinfoController@_detail');
            $api->post('/baseinfos','BaseinfoController@_add');
            $api->put('/baseinfos/{id}','BaseinfoController@_edit');
            $api->delete('/baseinfos/{id}','BaseinfoController@_del');

            $api->get('/news','NewsController@_list');
            $api->get('/news/{id}','NewsController@_detail');
            $api->post('/news','NewsController@_add');
            $api->put('/news/{id}','NewsController@_edit');
            $api->delete('/news/{id}','NewsController@_del');

            $api->get('/actives','ActiveController@_list');
            $api->get('/actives/{id}','ActiveController@_detail');
            $api->post('/actives','ActiveController@_add');
            $api->put('/actives/{id}','ActiveController@_edit');
            $api->delete('/actives/{id}','ActiveController@_del');

            $api->get('/resources','ResourceController@_list');
            $api->get('/resources/{id}','ResourceController@_detail');
            $api->post('/resources','ResourceController@_add');
            $api->put('/resources/{id}','ResourceController@_edit');
            $api->delete('/resources/{id}','ResourceController@_del');

            $api->get('/member_actives','MemberActiveController@_list');
            $api->get('/member_actives/{id}','MemberActiveController@_detail');
            $api->post('/member_actives','MemberActiveController@_add');
            $api->put('/member_actives/{id}','MemberActiveController@_edit');
            $api->delete('/member_actives/{id}','MemberActiveController@_del');

            $api->get('/order_details','OrderDetailController@_list');
            $api->get('/order_detail/{id}','OrderDetailController@_detail');
            $api->post('/order_detail','OrderDetailController@_add');
            $api->put('/order_detail/{id}','OrderDetailController@_edit');
            $api->delete('/order_detail/{id}','OrderDetailController@_del');

            $api->get('/news_types','NewsTypeController@_list');
            $api->get('/news_types/{id}','NewsTypeController@_detail');
            $api->post('/news_types','NewsTypeController@_add');
            $api->put('/news_types/{id}','NewsTypeController@_edit');
            $api->delete('/news_types/{id}','NewsTypeController@_del');


        });

    });
});
