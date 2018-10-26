@extends('layouts.app')

@section('content')

    <section
        class="auth"
        style="background-image: url('/images/bg_crowd.jpg');">

        <div
            class="register">

            <div
                class="register-heading">

                <h1>{{ $reset_password_template['title'] }}</h1>

            </div>

            <form
                action="{{ $routes['password']['request'] }}"
                class="form__wrapper"
                method="POST">

                {{ csrf_field() }}

                <input type="hidden" name="token" value="{{ $token }}">

                <div
                    class="register-content">

                    <div
                        class="register-scroll-wrapper">

                        <div
                            class="register-copy">

                            <div 
                                class="flex-grid">

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
                                    class="box full">

                                    <div
                                        class="form__input-wrapper--float @if (old('email'))active @endif @if ($email)active @endif">
                                        <label
                                            class="form__label"
                                            for="email">
                                            {{ $reset_password_template['email'] }}
                                        </label>
                                        <input
                                            class="form__input"
                                            id="email"
                                            name="email"
                                            required
                                            type="email"
                                            value="{{ $email or old('email') }}" />
                                    </div>

                                </div>

                                <div
                                    class="box full">

                                    <p>{{ $reset_password_template['password_copy'] }}</p>

                                </div>

                                <div
                                    class="box med-1of2">

                                    <div
                                        class="form__input-wrapper--float">
                                        <label
                                            class="form__label"
                                            for="password">
                                            {{ $reset_password_template['password'] }}
                                        </label>
                                        <input
                                            class="form__input"
                                            id="password"
                                            name="password"
                                            required
                                            type="password" />
                                    </div>

                                </div>

                                <div
                                    class="box med-1of2">

                                    <div
                                        class="form__input-wrapper--float">
                                        <label
                                            class="form__label"
                                            for="password-confirm">
                                            {{ $reset_password_template['confirm_password'] }}
                                        </label>
                                        <input
                                            class="form__input"
                                            id="password-confirm"
                                            name="password_confirmation"
                                            required
                                            type="password" />
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                    <div
                        class="register-action-wrapper">

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
                                    {{ $reset_password_template['submit'] }}
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </form>

        </div>

        <a
            class="register-logo"
            href="/"
            title="Return to Talent Cloud.">
            <img
                alt="The Talent Cloud Logo"
                class=""
                src="{{ $reset_password_template['auth_logo'] }}">
        </a>

    </section>

@endsection
