
const register = require("../configure/register")

var init = function () {
    register("AT+TMODE", {
        action: "AT+TMODE",
        info: "   tmode\t设置或查询数据传输模式（透传模式或协议模式）\r\n"+
              "        \t  查询：tmode\r\n"+
              "        \t  设置：tmode=<tmode>\r\n"+
              "        \t  <tmode>\r\n"+
              "        \t   Through    : 透明传输模式\r\n"+
              "        \t   Agreement  : 串口指令模式\r\n"+
              "        \t   GPIO       : GPIO 模式\r\n"+
              "        \t   Httpdclient: HTTPD Client 模式",
        handle: function (data, sender) {
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
        },
        inquire: function (sender) {
            if (deviceReady) {
                if (debugOn) {
                    console.log("[Debug] Device ready")
                    console.log("[Debug] Command sent")
                }
                clearInterval(intervalHandle)
                if (debugOn) {
                    console.log("[Debug] Sending:", this.action)
                }
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
                if (debugOn) {
                    console.log("[Debug] Sending:", this.action+"="+argv)
                }
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
