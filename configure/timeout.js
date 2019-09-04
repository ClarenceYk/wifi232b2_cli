
var duration = 100
var last = 0

var timeout = function () {
    let cur = new Date().getTime()
    let dif = cur - last

    last = cur

    return dif > duration
}

module.exports = timeout
