
const register = require("../configure/register")

var init = function () {
    register("AT+VER", {
        action: "AT+VER",
        info: "   ver\t\t查询软件版本",
        handle: function (data, sender) {
            if (data.includes("+ok")) {
                let config = data.trim().split("=")
                console.log("WIFI232 Software Version:", config[1])
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
        }
    })
}

module.exports = init