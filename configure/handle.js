
const Buffer = require('buffer').Buffer
const matchers = require("./matchers")

var frame = {
    buff: Buffer.alloc(256),
    count: 0
}
var sender

function handleData(data) {
    for (let i = 0; i < data.length; i ++) {
        handleChar(data[i])
    }
}

function handleChar(c) {
    let eventStr = ""

    if (debugOn) {
        console.log("[Debug] Get Byte:", c)
    }

    frame.buff[frame.count++] = c

    if (deviceReady) {
        if (frame.count < 5) { // not enough
            return
        }
        let end = frame.buff.toString("ascii", frame.count-4, frame.count)
        if (end != "\r\n\r\n") {
            return
        }
        eventStr = frame.buff.toString("ascii", 0, frame.count)
    }
    else {
        let str = frame.buff.toString("ascii", 0, frame.count).trim()

        let valid = str == "a" ||
                    str == "+++" ||
                    str == "ERR=-1" ||
                    str == "+ok" ||
                    str == "AT+Z\n\r+ok"

        if (!valid) {
            return
        }
        eventStr = str
    }

    handleEvent(eventStr)
}

function handleEvent(eventStr) {
    if (debugOn) {
        console.log("[Debug] Get event:", eventStr)
    }

    frame.count = 0
    let ed = eventStr.trim().split("\n\r")

    if (ed[0] == "") { // avoiding empty event
        return
    }

    if (ed.length == 1) { // special case for open event
        matchers.get("open").handle(ed[0], sender)
    }
    else {
        let idx = ed[0].indexOf("=")
        idx = (idx == -1) ? ed[0].length : idx
        matchers.get(ed[0].substring(0, idx)).handle(ed[1], sender)
    }
}

var init = function (serialPort) {
    serialPort.on( "error", err => console.log("Error:", err.message) )
    serialPort.on( "data", data => handleData(data) )
    serialPort.open(function (err) {
        if (err) {
            console.log("Open serial port error:", err.message)
            process.exit(1);
        }
        if (debugOn) {
            console.log("[Debug]", global.uartDevice, "opened!")
            console.log("[Debug] Sending:", matchers.get("open").action, "to wifi232")
        }
        serialPort.write(matchers.get("open").action)
    })
    sender = serialPort
}

module.exports = {
    init: init
}
