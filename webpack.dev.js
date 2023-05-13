const { OpenBrowserPlugin } = require("./packages");
const commonConfig = require("./webpack.common");
require("dotenv").config({ path: "./.env" });

module.exports = {
  ...commonConfig,
  mode: "development",
  plugins: [
    ...commonConfig.plugins,
    new OpenBrowserPlugin({ url: process.env.APP_LOCAL_HOST })
  ]
};