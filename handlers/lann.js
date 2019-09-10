
const register = require("../configure/register")

var init = function () {
    let name = "AT+LANN"
    let handler = register.createHandler(name)
    handler.info = "   lann\t\t设置或查询 LAN 设置，只在 AP 模式下有效\r\n"+
                   "       \t\t  查询：lann\r\n"+
                   "       \t\t  设置：lann=<address,mask>\r\n"+
                   "       \t\t  <address> LAN 口 IP 地址\r\n"+
                   "       \t\t  <mask> LAN 口子网掩码"
    handler.handle = function (data, sender) {
        if (data == "+ok") {
            console.log("WIFI232 config LANN success")
        } else if (data.includes("+ok")) {
            let config = data.trim().split("=")
            let cs = config[1].split(",")
            console.log("WIFI232 LANN:")
            console.log("  address: "+cs[0])
            console.log("  mask   : "+cs[1])
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
    register.register("AT+LANN", handler)
}

module.exports = init
