<?php
/**
 * Created by PhpStorm.
 * User: jackson
 * Date: 2017/3/25
 * Time: 19:31
 */

namespace App\Http\Controllers\Api;

use Dingo\Api\Contract\Http\Request;
use Log;
use App\Http\Controllers\Controller;
use EasyWeChat\Foundation\Application;

class WechatController extends Controller
{
    /**
     * 处理微信的请求消息
     *
     * @return string
     */
    public function jsConfig(Application $wechat, Request $request)
    {
        Log::info('request arrived.'); # 注意：Log 为 Laravel 组件，所以它记的日志去 Laravel 日志看，而不是 EasyWeChat 日志

        $js = $wechat->js;
        $apiList = $request->apiList;

        return  $js->config(array('onMenuShareQQ', 'onMenuShareWeibo'), true);
    }

    public function auth(Application $wechat, Request $request) {


        return $wechat->oauth->scopes(['snsapi_userinfo'])
            ->setRequest($request)
            ->redirect('http://shama.jcjever.com/wxAuth/callback');
    }

    public function shamApp(Application $wechat, Request $request) {

        return $wechat->oauth->scopes(['snsapi_userinfo'])
            ->setRequest($request)
            ->redirect('http://shama.jcjever.com/wxAuth/callback');
    }

    public function oauthCallback(Application $app, Request $request) {
        $user = $app->oauth->setRequest($request)->user();
        return redirect('http://shama.jcjever.com/app');
    }

    public function getWeixinProfile(Application $app) {
        $user = $app->oauth->user();
        return response()->json($user);
    }
}