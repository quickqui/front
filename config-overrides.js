const { override, addWebpackAlias } = require("customize-cra");
const path = require("path");
const process = require("process");

function alias() {
  return addWebpackAlias({
    "@@": path.resolve(
      __dirname,
      process.env["EXTEND_PATH"] || process.env["MODEL_PATH"] || "."
    ),
  });
}
module.exports = {
  webpack: override(alias()),
};
