
const register = require("../configure/register")

var init = function () {
    register("AT+ENTM", {
        action: "AT+ENTM",
        info: "   entm\t\t退出 AT 命令模式，返回透传模式",
        handle: function (data, sender) {
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
                sender.write(this.action+"\n") // "\n" is important!
            } else {
                if (debugOn) {
                    console.log("[Debug] waiting device ready...")
                }
            }
        }
    })
}

module.exports = init
