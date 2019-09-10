
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
const picInterval = 200 // ms
const powerCheckInterval = 1000 // ms
var count = 0
var idx = 0
var swingTimer = undefined

function swingTimerHandler(sender) {
    if (!devicePower) {
        if (0 == count) {
            if (debugOn) {
                console.log("[Debug] Sending: +++")
            }
            sender.write("+++")
        }
        count += picInterval
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
    let name = "AT+Z"
    let handler = register.createHandler(name)
    handler.info = "   z\t\t重启模块"
    handler.handle = function (data, sender) {
        if (data == "+ok") {
            swingTimer = setInterval( () => swingTimerHandler(sender), picInterval)
        } else if (data.includes("ERR")) {
            console.log("ERROR:", data)
            process.exit(1)
        } else {
            console.log("Unknown event:", data)
            process.exit(1)
        }
    }
    handler.inquire = function (sender) {
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
    register.register(name, handler)
}

module.exports = init
