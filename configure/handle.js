
const Buffer = require('buffer').Buffer
const matchers = require("./matchers")
const timeout = require("./timeout")

var frame = {
    buff: Buffer.alloc(256),
    count: 0
}
var sender
var timeoutHandle

function timeoutFunc() {
    if (frame.count > 0) {
        handleEvent(frame.buff.toString("ascii", 0, frame.count))
    }
}

function handleData(data) {
    for (let i = 0; i < data.length; i ++) {
        handleChar(data[i])
    }
}

function handleChar(c) {
    if (debugOn) {
        console.log("[Debug] Get Byte:", c)
    }

    if (timeout()) {
        timeoutHandle = setTimeout(timeoutFunc, 100)
    }
    else { // reset timer if not timeout
        clearTimeout(timeoutHandle)
        timeoutHandle = setTimeout(timeoutFunc, 100)
    }

    frame.buff[frame.count++] = c
    if (frame.count < 5) { // not enough
        return
    }

    let end = frame.buff.toString("ascii", frame.count-4, frame.count)
    if (end == "\r\n\r\n") {
        handleEvent(frame.buff.toString("ascii", 0, frame.count))
    }
}

function handleEvent(eventStr) {
    if (debugOn) {
        console.log("[Debug] Get event:", eventStr)
    }

    frame.count = 0
    let ed = eventStr.trim().split("\n\r")
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
