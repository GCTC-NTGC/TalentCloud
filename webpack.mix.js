const mix = require("laravel-mix");

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for your application, as well as bundling up your JS files.
 |
 */

mix
  .js("resources/assets/js/bootstrap.js", "public/js")
  .js("resources/assets/js/app.js", "public/js")
  .js("resources/assets/js/autocomplete.js", "public/js")
  .js("resources/assets/js/modernizr.js", "public/js")
  .js("resources/assets/js/jquery-ui.min.js", "public/js")
  .js("resources/assets/js/alerts.js", "public/js")
  .ts("resources/assets/js/components.tsx", "public/js")
  .sass("resources/assets/sass/app.scss", "public/css", {
    implementation: require("node-sass")
  })
  .options({
    processCssUrls: false,
    postCss: [
      require("cssnano")({
        preset: [
          "default",
          {
            discardComments: {
              removeAll: true
            }
          }
        ]
      }),
      require("autoprefixer")({
        browsers: ">0.1%"
      })
    ]
  })
  .version();
