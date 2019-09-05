
const register = require("../configure/register")

const pics = [
    "[=      ]",
    "[ =     ]",
    "[  =    ]",
    "[   =   ]",
    "[    =  ]",
    "[     = ]",
    "[      =]",
    "[     = ]",
    "[    =  ]",
    "[   =   ]",
    "[  =    ]",
    "[ =     ]"
]
const picInterval = 250 // ms
const powerCheckInterval = 2000 // ms
var count = 0
var idx = 0
var swingTimer = undefined

function swingTimerHandle(sender) {
    if (!devicePower) {
        if (0 == count) {
            if (debugOn) {
                console.log("[Debug] Sending: +++")
            }
            sender.write("+++")
        }
        count += 250
        count %= powerCheckInterval
    }

    if (deviceReady) {
        if (debugOn) {
            console.log("[Debug] Sending: AT+ENTM")
        }
        sender.write("AT+ENTM\n")
    }

    if (deviceReady && devicePower) {
        clearInterval(swingTimer)
        return console.log("\nDone")
    }

    process.stdout.write("\r" + pics[idx++] + " WIFI232 Rebooting...")
    idx %= pics.length
}

var init = function () {
    register("AT+Z", {
        action: "AT+Z",
        info: "   z\t\t重启模块",
        handle: function (data, sender) {
            if (data == "+ok") {
                swingTimer = setInterval( () => swingTimerHandle(sender), picInterval)
            } else if (data.includes("ERR")) {
                console.log("ERROR:", data)
                process.exit(1)
            } else {
                console.log("Unknown event:", data)
                process.exit(1)
            }
        },
        inquire: function (sender) {
            if (deviceReady) {
                if (debugOn) {
                    console.log("[Debug] Device ready")
                    console.log("[Debug] Command sent")
                }
                clearInterval(intervalHandle)
                deviceReady = false
                devicePower = false
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
