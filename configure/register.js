
const matchers = require("./matchers")

function register(event, handler) {
    matchers.set(event, handler)
}

function createHandler(action) {
    return {
        action: action,
        info: "   Not implemented",
        handle: function (data, sender) {
            console.log("Default implementation:", data.trim())
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
                sender.write(this.action + "\n") // "\n" is important!
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
    }
}

module.exports = {
    register: register,
    createHandler: createHandler
}
