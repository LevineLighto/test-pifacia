<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>{{ $title }} - {{ config('app.name') }}</title>
</head>
<body 
    style="font-family: Helvetica, Arial, sans;
        color: #26273B;
        font-size: 16px;
        background-color: rgb(234,234,234);
        margin: 0;
        height: 100%;"
>

    <div 
        class="wrapping-main" 
        style="max-width: 900px;
            width: 95%;
            height: 100%;
            margin: 0 auto;
            background-color: #fff;
            padding: 24px 20px;
            text-align: center;
            border-top: 4px solid #ec1d21;"
    >
        <h1 style="font-size: 32px; font-weight: 700; margin-bottom: 24px;">
            {{ $title }}
        </h1>
        <p>Hello {{ $user->name }}, the data you uploaded is successfully imported.</p>
        <div style="margin-bottom: 32px;"></div>
        <p>Have a good day!</p>
        <p>---{{ config('app.name') }}---</p>
    </div>
</body>
</html>

