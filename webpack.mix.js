const mix = require("laravel-mix");
const sass = require("node-sass");
const cssnano = require("cssnano");
const autoprefixer = require("autoprefixer");
const path = require("path");
const dartSass = require("sass");
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
  .js("resources/assets/js/reliability.js", "public/js")
  .js("resources/assets/js/autocomplete.js", "public/js")
  .js("resources/assets/js/modernizr.js", "public/js")
  .js("resources/assets/js/alerts.js", "public/js")
  .js("resources/assets/js/getpdf.js", "public/js")
  .js("resources/assets/js/typeToDelete.js", "public/js")
  .ts("resources/assets/js/managerRegistration.ts", "public/js")
  .ts(
    "resources/assets/js/components/AssessmentPlan/AssessmentPlanRoot.tsx",
    "public/js",
  )
  .ts(
    "resources/assets/js/components/ApplicationReview/ApplicationReviewRoot.tsx",
    "public/js",
  )
  .ts(
    "resources/assets/js/components/ApplicationReview/ApplicationTimelineReviewRoot.tsx",
    "public/js",
  )
  .ts(
    "resources/assets/js/components/ApplicationReview/ReviewApplicationsRoot.tsx",
    "public/js",
  )
  .ts(
    "resources/assets/js/components/JobBuilder/JobBuilderRoot.tsx",
    "public/js",
  )
  .ts("resources/assets/js/components/WorkEnvFeaturesRoot.tsx", "public/js")
  .ts(
    "resources/assets/js/components/ApplicantSkills/SkillsWordCounter.tsx",
    "public/js",
  )
  .ts("resources/assets/js/components/HRPortal/JobIndexHrPage.tsx", "public/js")
  .ts(
    "resources/assets/js/components/HRPortal/JobReviewHrPage.tsx",
    "public/js",
  )
  .ts(
    "resources/assets/js/components/HRPortal/JobSummaryActivityFeed.tsx",
    "public/js",
  )
  .ts(
    "resources/assets/js/components/Application/ApplicationRoot.tsx",
    "public/js",
  )
  .ts(
    "resources/assets/js/components/ApplicantProfile/Experience/ProfileExperiencePage.tsx",
    "public/js",
  )
  .ts(
    "resources/assets/js/components/ApplicantProfile/Skills/ProfileSkillsPage.tsx",
    "public/js",
  )
  .ts(
    "resources/assets/js/components/Application/ApplicationPreviewRoot.tsx",
    "public/js",
  )
  .sass("resources/assets/sass/app.scss", "public/css", {
    implementation: sass,
    sassOptions: {
      includePaths: ["node_modules/@fortawesome/fontawesome-free/scss"],
    },
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
    ],
  })
  .sass("resources/assets/sass/reliability.scss", "public/css", {
    implementation: sass,
    sassOptions: {
      includePaths: ["node_modules/@fortawesome/fontawesome-free/scss"],
    },
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
    ],
  })
  .sass("resources/assets/sass/h2.scss", "public/css", {
    implementation: dartSass,
  })
  .options({
    processCssUrls: false,
    postCss: [
      autoprefixer({
        browsers: ["last 3 versions", "> 1%"],
      }),
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
    ],
  });

mix.webpackConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "resources/assets/js"),
    },
  },
});

mix.version();
