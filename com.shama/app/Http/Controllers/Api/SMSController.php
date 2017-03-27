<?php
/**
 * Created by PhpStorm.
 * User: jackson
 * Date: 2017/3/26
 * Time: 23:37
 */

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Dingo\Api\Contract\Http\Request;
use SmsManager as Manager;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class SMSController extends Controller
{

    public function postVoiceVerify()
    {
        $res = Manager::validateSendable();
        if (!$res['success']) {
            return response()->json($res);
        }

        $res = Manager::validateFields();
        if (!$res['success']) {
            return response()->json($res);
        }

        $res = Manager::requestVoiceVerify();

        return response()->json($res);
    }

    public function codeVerify(Request $request) {

        $validator = Validator::make($request->all(), [
            'mobile'     => 'required|confirm_mobile_not_change|confirm_rule:mobile_required',
            'verifyCode' => 'required|verify_code',
            //more...
        ]);

        if ($validator->fails()) {
            //验证失败后建议清空存储的发送状态，防止用户重复试错
//            Manager::forgetState();
            return array(
                "success" => false
            );
        } else {
            Manager::forgetState();
            return array(
                "success" => true
            );
        }
    }

    public function postSendCode()
    {
        $res = Manager::validateSendable();
        if (!$res['success']) {
            return response()->json($res);
        }

        $res = Manager::validateFields();
        if (!$res['success']) {
            return response()->json($res);
        }

        $res = Manager::requestVerifySms();

        return response()->json($res);
    }

    public function getInfo()
    {
        $html = '<meta charset="UTF-8"/><h2 align="center" style="margin-top: 30px;margin-bottom: 0;">Laravel Sms</h2>';
        $html .= '<p style="margin-bottom: 30px;font-size: 13px;color: #888;" align="center">' . SmsManager::VERSION . '</p>';
        $html .= '<p><a href="https://github.com/toplan/laravel-sms" target="_blank">laravel-sms源码</a>托管在GitHub，欢迎你的使用。如有问题和建议，欢迎提供issue。</p>';
        $html .= '<hr>';
        $html .= '<p>你可以在调试模式(设置config/app.php中的debug为true)下查看到存储在存储器中的验证码短信/语音相关数据:</p>';
        echo $html;
        if (config('app.debug')) {
            dump(Manager::retrieveAllData());
        } else {
            echo '<p align="center" style="color: red;">现在是非调试模式，无法查看调试数据</p>';
        }
    }
}