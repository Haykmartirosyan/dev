<?php

namespace App\Http\Controllers\user;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use MikeMcLin\WpPassword\Facades\WpPassword;

class UserController extends Controller
{
    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function login(Request $request)
    {
        $credentials = $request->only(["user_email", "user_pass"]);
        $user = User::where('user_email', $credentials['user_email'])->first();
        if ($user) {
            if (!WpPassword::check($credentials['user_pass'], $user->user_pass)) {
                return response()->json([
                    "success" => false,
                    "message" => 'Invalid username or password',
                ], 422);
            }
            $accessToken = $user->createToken('authToken')->accessToken;

            return response()->json([
                "success" => true,
                "message" => 'Login Successful',
                "access_token" => $accessToken,
                "id" => $user->id,
                "email" => $user->email,
            ]);
        } else {
            return response()->json([
                "success" => false,
                "message" => 'Sorry, this user does not exist',
            ], 422);
        }
    }

}
