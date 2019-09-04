
const register = require("../configure/register")

var init = function () {
    register("AT+WAP", {
        action: "AT+WAP",
        info: "   wap\t\t设置或查询 WIFI AP 模式下的参数\r\n"+
              "      \t\t  查询：wap\r\n"+
              "      \t\t  设置：wap=<wifi_mode,ssid,channel>\r\n"+
              "      \t\t  <wifimode>\r\n"+
              "      \t\t   11BG\r\n"+
              "      \t\t   11B\r\n"+
              "      \t\t   11G\r\n"+
              "      \t\t   11BGN\r\n"+
              "      \t\t   11N\r\n"+
              "      \t\t  <ssid> AP 模式时的 SSID\r\n"+
              "      \t\t  <channel> WIFI channel 选择，AUTO 或 CH1~CH11",
        handle: function (data, sender) {
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
            sender.write("AT+ENTM\n")
        },
        inquire: function (sender) {
            if (deviceReady) {
                if (debugOn) {
                    console.log("[Debug] Device ready")
                    console.log("[Debug] Command sent")
                }
                clearInterval(intervalHandle)
                sender.write(this.action+"\n")
            } else {
                if (debugOn) {
                    console.log("[Debug] waiting device ready...")
                }
            }
        },
        configure: function (sender, argv) {
            if (deviceReady) {
                if (debugOn) {
                    console.log("[Debug] Device ready")
                    console.log("[Debug] Command sent")
                }
                clearInterval(intervalHandle)
                sender.write(this.action+"="+argv+"\n")
            } else {
                if (debugOn) {
                    console.log("[Debug] waiting device ready...")
                }
            }
        }
    })
}

module.exports = init
