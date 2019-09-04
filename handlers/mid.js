
const register = require("../configure/register")

var init = function () {
    register("AT+MID", {
        action: "AT+MID",
        info: "   mid\t\t查询模块 MID",
        handle: function (data, sender) {
            if (data.includes("+ok")) {
                let config = data.trim().split("=")
                console.log("WIFI232 MID INFO:", config[1])
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
        }
    })
}

module.exports = init