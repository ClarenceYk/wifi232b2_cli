
const register = require("../configure/register")

var init = function () {
    let name = "AT+MID"
    let handler = register.createHandler(name)
    handler.info = "   mid\t\t查询模块 MID"
    handler.handle = function (data, sender) {
        if (data.includes("+ok")) {
            let config = data.trim().split("=")
            console.log("WIFI232 MID INFO:", config[1])
        } else if (data.includes("ERR")) {
            console.log("ERROR:", data)
        } else {
            console.log("Unknown event:", data)
        }
        if (debugOn) {
            console.log("[Debug] Sending:", "AT+ENTM")
        }
        sender.write("AT+ENTM\n")
    }
    register.register(name, handler)
}

module.exports = init