// config-overrides.js
const { override, addWebpackAlias } = require("customize-cra");
const path = require("path");

module.exports = override(
  addWebpackAlias({
    "@assets": path.resolve(__dirname, "src/assets"),
    "@components": path.resolve(__dirname, "src/components"),
    "@context": path.resolve(__dirname, "src/context"),
    "@data": path.resolve(__dirname, "src/data"),
    "@hooks": path.resolve(__dirname, "src/hooks"),
    "@pages": path.resolve(__dirname, "src/pages"),
    "@utils": path.resolve(__dirname, "src/utils"),
  })
);
