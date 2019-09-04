
const register = require("../configure/register")

var init = function () {
    register("open", {
        action: "+++",
        handle: function (data, sender) {
            if (data == "a") { // response of wifi232
                if (debugOn) {
                    console.log("[Debug] Sending:", data, "to wifi232")
                }
                sender.write(data)
            }
            else if (data == "+++") {
                if (debugOn) {
                    console.log("[Debug] wifi232 already in config mode")
                }
                sender.write("\n")
            } else if (data == "+ok") {
                deviceReady = true
                if (debugOn) {
                    console.log("WIFI232 enter config mode")
                }
            } else if (data.includes("ERR")) {
                deviceReady = true
                if (debugOn) {
                    console.log("Info: reEnter config mode")
                }
            } else {
                console.log("Unknown event:", data)
                process.exit(1)
            }
        }
    })
}

module.exports = init
