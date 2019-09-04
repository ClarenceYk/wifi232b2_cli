
const register = require("../configure/register")

var init = function () {
    register("AT+WMODE", {
        action: "AT+WMODE",
        info: "   wmode\t设置或查询 WIFI 操作模式（AP 或者 STA）\r\n"+
              "        \t  查询：wmode\r\n"+
              "        \t  设置：wmode=<mode>\r\n"+
              "        \t  <mode>\r\n"+
              "        \t   ap  无线接入点模式\r\n"+
              "        \t   sta 无线终端模式",
        handle: function (data, sender) {
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
                sender.write(this.action+"="+argv.toUpperCase()+"\n")
            } else {
                if (debugOn) {
                    console.log("[Debug] waiting device ready...")
                }
            }
        }
    })
}

module.exports = init
