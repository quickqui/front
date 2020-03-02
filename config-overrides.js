const {
  override,
  setWebpackStats,
  addWebpackAlias,
  overrideDevServer
} = require("customize-cra");
const path = require("path");
const process = require("process");

function alias() {
  return addWebpackAlias({
    "@@": path.resolve(__dirname, process.env["EXTEND_PATH"] || ".")
  });
}
module.exports = {
  webpack: override(alias()),
  devServer: overrideDevServer(setWebpackStats("verbose"))
};
