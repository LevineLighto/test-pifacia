<?php

namespace App\Logics\Auth;

use Illuminate\Auth\Events\Lockout;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;

class AuthenticationLogic
{
    private $throttleKey;

    public function login(Request $request)
    {
        $this->setThrottleKey($request);

        if (!$this->ensureNotRateLimited()) {
            event(new Lockout($request));
            error("Too many attempts, please try again later", 429);
        }

        if (!Auth::guard('web')->attempt($request->only('email', 'password'), $request->boolean('remember'))) {
            RateLimiter::hit($this->throttleKey);
            error("Invalid email or password!!", 400);
        }

        $user = Auth::user();
        if (!$user) {
            RateLimiter::hit($this->throttleKey);
            Auth::logout();
            error("Unable to get the user data", 401);
        }

        return success();
    }

    public function logout()
    {
        $user = Auth::guard('web')->user();
        if (!$user) {
            error("User not found", 404);
        }

        Auth::logout();

        return success();
    }


    private function setThrottleKey(Request $request)
    {
        $this->throttleKey = Str::transliterate(Str::lower($request->string('email') . '|' . $request->ip()));
    }

    private function ensureNotRateLimited()
    {
        return !RateLimiter::tooManyAttempts($this->throttleKey, 5);
    }
}