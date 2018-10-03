<?php /* =======================================================================

    Talent Cloud
    Application Template

========================================================================== */ ?>

<!DOCTYPE html>

<html
    lang="en">

    <head>

        <?php /* Meta */ ?>

            <?php /* Charset */ ?>

                <meta
                    charset="utf-8" />

            <?php /* Compatibility */ ?>

                <meta
                    http-equiv="X-UA-Compatible"
                    content="IE=edge">

            <?php /* Viewport */ ?>

                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0">

            <?php /* CRF Token */ ?>

                <meta 
                    content="{{ csrf_token() }}"
                    name="csrf-token">

        <?php /* Page Title */ ?>

            <title>{{ config('app.name', 'Laravel') }}</title>

        <?php /* Google Fonts */ ?>
            
            <link 
                href="https://fonts.googleapis.com/css?family=Euphoria+Script&amp;subset=latin-ext" 
                rel="stylesheet">

        <?php /* Google Analytics */ ?>

            <!-- Global site tag (gtag.js) - Google Analytics -->
            
                <script async src="https://www.googletagmanager.com/gtag/js?id=UA-115747902-1"></script>
            
                <script>
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'UA-115747902-1');
                </script>

            <!-- Google Tag Manager -->
            
                <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','GTM-MW8P8KB');</script>

        <?php /* Modernizr */ ?>

            <script
                src="/js/modernizr.js">
            </script>

        <?php /* jQuery & UI */ ?>

            <script
                src="https://code.jquery.com/jquery-3.3.1.min.js"
                integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
                crossorigin="anonymous"></script>

            <script
                src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"
                integrity="sha256-VazP97ZCwtekAsvgPBSUwPFKdrwD3unUfSGVYrahUqU="
                crossorigin="anonymous"></script>

        <?php /* Favicons */ ?>

            <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png">
            <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png">
            <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png">
            <link rel="manifest" href="/favicons/site.webmanifest">
            <link rel="mask-icon" href="/favicons/safari-pinned-tab.svg" color="#b91d47">
            <link rel="shortcut icon" href="/favicons/favicon.ico">
            <meta name="msapplication-TileColor" content="#b91d47">
            <meta name="msapplication-TileImage" content="/favicons/mstile-144x144.png">
            <meta name="msapplication-config" content="/favicons/browserconfig.xml">
            <meta name="theme-color" content="#b91d47">

        <?php /* Stylesheets */ ?>

            <?php /* Font Awesome */ ?>

                <link
                    crossorigin="anonymous"
                    href="https://use.fontawesome.com/releases/v5.1.0/css/all.css"
                    integrity="sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt"
                    rel="stylesheet">

            <?php /* App */ ?>

                <link
                    href="/css/app.css"
                    rel="stylesheet"
                    type="text/css"/>

    </head>

    <body>

        <!-- Google Tag Manager (noscript) -->
            <noscript>
                <iframe 
                    src="https://www.googletagmanager.com/ns.html?id=GTM-MW8P8KB"
                    height="0" 
                    width="0" 
                    style="display:none;visibility:hidden">
                </iframe>
            </noscript>
        <!-- End Google Tag Manager (noscript) -->

        @yield('content')

        <script
            src="/js/jquery-ui.min.js">
        </script>

        <script
            src="/js/autocomplete.js">
        </script>

        <script
            src="/js/app.js">
        </script>

    </body>

</html>
