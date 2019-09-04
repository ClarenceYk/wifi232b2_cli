
const register = require("../configure/register")

var init = function () {
    register("AT+Z", {
        action: "AT+Z",
        info: "   z\t\t重启模块",
        handle: function (data, sender) {
            if (data == "+ok") {
                console.log("WIFI232 going to reboot...")
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
