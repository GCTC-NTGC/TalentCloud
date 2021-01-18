var path = require("path");
module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    include: path.resolve(__dirname, "..", "resources/assets/js"),
    use: [
      {
        loader: require.resolve("ts-loader"),
        options: {
          transpileOnly: true,
        }
      }
    ],
  });

  config.resolve.extensions.push(".ts", ".tsx");
  return config;
};
