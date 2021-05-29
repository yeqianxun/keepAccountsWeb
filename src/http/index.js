const XHR = require.context(".", true, /.js$/);

let modules = {};

XHR.keys().forEach((key, index) => {
    if (key === "index.js") return;
    Object.assign(modules, XHR(key))
});
export default modules;