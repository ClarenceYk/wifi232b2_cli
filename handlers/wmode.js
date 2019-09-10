
const register = require("../configure/register")

var init = function () {
    let name = "AT+WMODE"
    let handler = register.createHandler(name)
    handler.info = "   wmode\t设置或查询 WIFI 操作模式（AP 或者 STA）\r\n"+
                   "        \t  查询：wmode\r\n"+
                   "        \t  设置：wmode=<mode>\r\n"+
                   "        \t  <mode>\r\n"+
                   "        \t   ap  无线接入点模式\r\n"+
                   "        \t   sta 无线终端模式"
    handler.handle = function (data, sender) {
            if (data == "+ok") {
                console.log("WIFI232 config WMODE success")
            } else if (data.includes("+ok")) {
                let config = data.trim().split("=")
                console.log("WIFI232 WMODE="+config[1])
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
