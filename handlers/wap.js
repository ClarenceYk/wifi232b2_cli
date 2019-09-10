
const register = require("../configure/register")

var init = function () {
    let name = "AT+WAP"
    let handler = register.createHandler(name)
    handler.info = "   wap\t\t设置或查询 WIFI AP 模式下的参数\r\n"+
                   "      \t\t  查询：wap\r\n"+
                   "      \t\t  设置：wap=<wifi_mode,ssid,channel>\r\n"+
                   "      \t\t  <wifimode>\r\n"+
                   "      \t\t   11BG\r\n"+
                   "      \t\t   11B\r\n"+
                   "      \t\t   11G\r\n"+
                   "      \t\t   11BGN\r\n"+
                   "      \t\t   11N\r\n"+
                   "      \t\t  <ssid> AP 模式时的 SSID\r\n"+
                   "      \t\t  <channel> WIFI channel 选择，AUTO 或 CH1~CH11"
    handler.handle = function (data, sender) {
        if (data == "+ok") {
            console.log("WIFI232 config WAP success")
        } else if (data.includes("+ok")) {
            let config = data.trim().split("=")
            let cs = config[1].split(",")
            console.log("WIFI232 WAP:")
            console.log("  wifi_mode: "+cs[0])
            console.log("  ssid     : "+cs[1])
            console.log("  channel  : "+cs[2])
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
