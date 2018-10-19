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
                <i class="fas fa-chevron-left"></i> {{ $login_template['return'] }}
            </a>

            <div
                class="login-heading">

                <h1>{{ $login_template['title'] }}</h1>

            </div>

            <form
                action="{{ $routes['login'] }}"
                class="form__wrapper"
                method="POST">

                {{ csrf_field() }}

                <div
                    class="login-content">

                    <div
                        class="login-scroll-wrapper">

                        <div
                            class="login-copy">

                            @if ($errors->any())
                                <div class="box full register-alert">
                                    @foreach ($errors->all() as $error)
                                        <span class="help-block">
                                            <strong>{{ $error }}</strong>
                                        </span>
                                    @endforeach
                                </div>
                            @endif

                            <div
                                class="form__input-wrapper--float @if (old('email'))active @endif">
                                <label
                                    class="form__label"
                                    for="email">
                                    {{ $login_template['email'] }}
                                </label>
                                <input
                                    class="form__input"
                                    id="email"
                                    name="email"
                                    required
                                    type="email"
                                    value="{{ old('email') }}" />
                            </div>

                            <div
                                class="form__input-wrapper--float">
                                <label
                                    class="form__label"
                                    for="password">
                                    {{ $login_template['password'] }}
                                </label>
                                <input
                                    class="form__input"
                                    id="password"
                                    name="password"
                                    required
                                    type="password" />
                            </div>

                            <div
                                class="flex-grid middle">
                                
                                <div
                                    class="box small-1of2">
                                    <div
                                        class="form__checkbox-wrapper">

                                        <label
                                            class="form__label">
                                            <input
                                                class="form__input"
                                                {{ old('remember') ? 'checked' : '' }}
                                                name="remember"
                                                type="checkbox">{{ $login_template['remember_me'] }}
                                        </label>

                                    </div>
                                </div>

                                <div
                                    class="box small-1of2">
                                    <a
                                        href="/register"
                                        title="Register for Talent Cloud">
                                        {{ $login_template['register'] }}
                                    </a>
                                </div>

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

                            <a
                                class="button--red light-bg"
                                href="{{ $routes['password']['request'] }}">
                                {{ $login_template['forgot_password'] }}
                            </a>

                        </div>

                        <div
                            class="box small-1of2">

                            <button
                                class="button--blue light-bg"
                                type="submit">
                                {{ $login_template['login'] }}
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
                src="/images/logo_tc_colour.png">
        </a>

    </section>

@endsection
