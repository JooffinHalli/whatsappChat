const openBrowser = require("../open-browser");

class OpenBrowserPlugin {
  constructor(config) {
    this.openBrowser = this.#once(openBrowser.bind(null, config.url));
  }
  
  apply(compiler) {
    compiler.hooks.done.tapAsync("open-browser-plugin", this.#runScript);
  }

  #runScript = (compilation, next) => {
    this.openBrowser();
    next();
  }

  #once = fn => (...args) => {
    fn(...args);
    fn = () => {};
  };
}

module.exports = OpenBrowserPlugin;