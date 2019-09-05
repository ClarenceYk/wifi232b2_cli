
const register = require("../configure/register")

var init = function () {
    register("AT+WAKEY", {
        action: "AT+WAKEY",
        info: "   wakey\t设置或查询 WIFI AP 模式下的加密参数\r\n"+
              "        \t  查询：wakey\r\n"+
              "        \t  设置：wakey=<auth,encry,key>\r\n"+
              "        \t  <auth> 认证模式\r\n"+
              "        \t   OPEN\r\n"+
              "        \t   SHARED\r\n"+
              "        \t   WPAPSK\r\n"+
              "        \t   WPA2PSK\r\n"+
              "        \t  <encry> 加密算法\r\n"+
              "        \t   NONE   : auth=OPEN 时有效\r\n"+
              "        \t   WEP-H  : auth=OPEN/SHARED 时有效(WEP,HEX)\r\n"+
              "        \t   WEP-A  : auth=OPEN/SHARED 时有效(WEP,ASCII)\r\n"+
              "        \t   TKIP   : auth=WPAPSK/WPA2PSK 时有效\r\n"+
              "        \t   AES    : auth=WPAPSK/WPA2PSK 时有效\r\n"+
              "        \t   TKIPAES: auth=WPAPSK/WPA2PSK 时有效\r\n"+
              "        \t  <key> 密码",
        handle: function (data, sender) {
            if (data == "+ok") {
                console.log("WIFI232 config WAKEY success")
            } else if (data.includes("+ok")) {
                let config = data.trim().split("=")
                let cs = config[1].split(",")
                console.log("WIFI232 WAP:")
                console.log("  auth : "+cs[0])
                console.log("  encry: "+cs[1])
                console.log("  key  : "+cs[2])
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
    })
}

module.exports = init
