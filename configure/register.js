
const matchers = require("./matchers")

function register(event, handler) {
    matchers.set(event, handler)
}

module.exports = register
