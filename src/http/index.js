const XHR = require.context(".", true, /.js$/);

let modules = {};

XHR.keys().forEach((key) => {
    if (key.indexOf("index.js") > 0) return;
    Object.assign(modules, XHR(key))
});
export default modules;