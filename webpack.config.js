const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "grupo21",
    projectName: "sign-in",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    externals: ['single-spa', '@grupo21/shared-react', 'react', 'react-dom']
  });
};
