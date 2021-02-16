const fs = require("fs");
const path = require("path");

module.exports = function (app) {
    fs.readdirSync(path.join(__dirname, "../routes")).forEach(file => {
        let router = require(path.resolve(__dirname, "..", `routes/${file}`));
        app.use(router.routes()).use(router.allowedMethods());
    });
}