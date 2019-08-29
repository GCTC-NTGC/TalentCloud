const path = require("path");
const webpack = require("webpack");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const ManifestPlugin = require("webpack-manifest-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: {
    bootstrap: path.resolve(__dirname, "resources/assets/js/bootstrap.js"),
    app: path.resolve(__dirname, "resources/assets/js/app.js"),
    autocomplete: path.resolve(
      __dirname,
      "resources/assets/js/autocomplete.js",
    ),
    modernizr: path.resolve(__dirname, "resources/assets/js/modernizr.js"),
    alerts: path.resolve(__dirname, "resources/assets/js/alerts.js"),
    getPdf: path.resolve(__dirname, "resources/assets/js/getpdf.js"),
    applicationReviewRoot: path.resolve(
      __dirname,
      "resources/assets/js/components/ApplicationReview/ApplicationReviewRoot.tsx",
    ),
    reviewApplicationsRoot: path.resolve(
      __dirname,
      "resources/assets/js/components/ApplicationReview/ReviewApplicationsRoot.tsx",
    ),
    assessmentPlanRoot: path.resolve(
      __dirname,
      "resources/assets/js/components/AssessmentPlan/AssessmentPlanRoot.tsx",
    ),
    jobBuilderRoot: path.resolve(
      __dirname,
      "resources/assets/js/components/JobBuilder/JobBuilderRoot.tsx",
    ),
    skillsWordCounter: path.resolve(
      __dirname,
      "resources/assets/js/components/ApplicantSkills/SkillsWordCounter.tsx",
    ),
  },
  output: {
    path: path.resolve(__dirname, "public/js"),
    filename: "[name].[contenthash:8].js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(), // so that file hashes don't change unexpectedly.
    new BundleAnalyzerPlugin({ analyzerPort: 9999 }),
    new ManifestPlugin({ fileName: "mix-manifest.json", basePath: "/js/" }), // little hacky workaround for our existing mix() twig helper.
    new CleanWebpackPlugin({ cleanOnceBeforeBuildPatterns: ["!.gitignore"] }),
  ],
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all",
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            // get the name. E.g. node_modules/packageName/not/this/part.js
            // or node_modules/packageName
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/,
            )[1];

            // npm package names are URL-safe, but some servers don't like @ symbols
            return `npm.${packageName.replace("@", "")}`;
          },
        },
      },
    },
  },
};
