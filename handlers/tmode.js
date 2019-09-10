
const register = require("../configure/register")

var init = function () {
    let name = "AT+TMODE"
    let handler = register.createHandler(name)
    handler.info = "   tmode\t设置或查询数据传输模式（透传模式或协议模式）\r\n"+
                   "        \t  查询：tmode\r\n"+
                   "        \t  设置：tmode=<tmode>\r\n"+
                   "        \t  <tmode>\r\n"+
                   "        \t   Through    : 透明传输模式\r\n"+
                   "        \t   Agreement  : 串口指令模式\r\n"+
                   "        \t   GPIO       : GPIO 模式\r\n"+
                   "        \t   Httpdclient: HTTPD Client 模式"
    handler.handle = function (data, sender) {
        if (data == "+ok") {
            console.log("WIFI232 config TMODE success")
        } else if (data.includes("+ok")) {
            let config = data.trim().split("=")
            let cs = config[1].split(",")
            console.log("WIFI232 TMODE:")
            console.log("  tmode: "+cs[0])
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
