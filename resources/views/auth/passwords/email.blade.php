@extends('layouts.app')

@section('content')

    <section
        class="auth"
        style="background-image: url('/images/bg_crowd.jpg');">

        <div
            class="login">

            <a
                class="login-return-link"
                href="/"
                title="Return Home">
                <i class="fas fa-chevron-left"></i>{{ $forgot_password_template['return'] }}
            </a>

            <div
                class="login-heading">

                <h1>{{ $forgot_password_template['title'] }}</h1>

            </div>

            <form
                action="{{ $routes['password']['email'] }}"
                class="form__wrapper"
                method="POST">

                {{ csrf_field() }}

                <div
                    class="login-content">

                    <div
                        class="login-scroll-wrapper">

                        <div
                            class="login-copy">

                            @if (session('status'))
                                <div class="alert alert-success">
                                    {{ session('status') }}
                                </div>
                            @endif

                            @if ($errors->has('email'))
                                <span class="help-block">
                                    <strong>{{ $errors->first('email') }}</strong>
                                </span>
                            @endif

                            <div
                                class="form__input-wrapper--float @if (old('email'))active @endif">
                                <label
                                    class="form__label"
                                    for="email">
                                    {{ $forgot_password_template['email'] }}
                                </label>
                                <input
                                    class="form__input"
                                    id="email"
                                    name="email"
                                    required
                                    type="email"
                                    value="{{ old('email') }}" />
                            </div>

                        </div>

                    </div>

                </div>

                <div
                    class="login-action-wrapper">

                    <div
                        class="flex-grid">

                        <div
                            class="box small-1of2">

                        </div>

                        <div
                            class="box small-1of2">

                            <button
                                class="button--blue light-bg"
                                type="submit">
                                {{ $forgot_password_template['submit'] }}
                            </button>

                        </div>

                    </div>

                </div>

            </form>

        </div>

        <a
            class="login-logo"
            href="/"
            title="Return to Talent Cloud.">
            <img
                alt="The Talent Cloud Logo"
                class=""
                src="  {{ $forgot_password_template['auth_logo'] }}">
        </a>

    </section>

@endsection
