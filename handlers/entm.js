
const register = require("../configure/register")

var init = function () {
    let name = "AT+ENTM"
    let handler = register.createHandler(name)
    handler.info = "   entm\t\t退出 AT 命令模式，返回透传模式"
    handler.handle = function (data, sender) {
        if (data == "+ok") {
            if (debugOn) {
                console.log("WIFI232 exit config mode")
            }
        } else if (data.includes("ERR")) {
            console.log("ERROR:", data)
        } else {
            console.log("Unknown event:", data)
        }
        process.exit(0)
    }
    register.register(name, handler)
}

module.exports = init
