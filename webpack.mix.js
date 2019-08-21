const mix = require("laravel-mix");
const sass = require("node-sass");
const cssnano = require("cssnano");
const autoprefixer = require("autoprefixer");
const path = require("path");
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
  .ts("resources/assets/js/bootstrap.js", "public/js")
  .js("resources/assets/js/app.js", "public/js")
  .js("resources/assets/js/autocomplete.js", "public/js")
  .js("resources/assets/js/modernizr.js", "public/js")
  .js("resources/assets/js/jquery-ui.min.js", "public/js")
  .js("resources/assets/js/alerts.js", "public/js")
  .js("resources/assets/js/getpdf.js", "public/js")
  .js("resources/assets/js/components/JobBuilder/JobBuilderRoot", "public/js")
  .js("resources/assets/js/components/WorkEnvFeaturesRoot", "public/js")
  .sass("resources/assets/sass/app.scss", "public/css", {
    implementation: sass,
    includePaths: ["node_modules/@fortawesome/fontawesome-free/scss"],
  })
  .options({
    processCssUrls: false,
    postCss: [
      cssnano({
        preset: [
          "default",
          {
            discardComments: {
              removeAll: true,
            },
          },
        ],
      }),
      autoprefixer({
        browsers: ">0.1%",
      }),
    ],
  })
  .version();

mix.webpackConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "resources/assets/js"),
    },
  },
});
