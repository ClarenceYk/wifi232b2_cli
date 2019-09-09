
const register = require("../configure/register")

var init = function () {
    register("AT+NETP", {
        action: "AT+NETP",
        info: "   netp\t\t设置或查询网络协议参数\r\n"+
              "       \t\t  查询：netp\r\n"+
              "       \t\t  设置：netp=<protocol,CS,port,IP>\r\n"+
              "       \t\t  <protocol> 协议类型\r\n"+
              "       \t\t   TCP\r\n"+
              "       \t\t   UDP\r\n"+
              "       \t\t  <CS> 服务器端或客户端\r\n"+
              "       \t\t   SERVER :服务器端\r\n"+
              "       \t\t   CLIENT :客户端\r\n"+
              "       \t\t  <port> 协议端口\r\n"+
              "       \t\t  <IP>",
        handle: function (data, sender) {
            if (data == "+ok") {
                console.log("WIFI232 config NETP success")
            } else if (data.includes("+ok")) {
                let config = data.trim().split("=")
                let cs = config[1].split(",")
                console.log("WIFI232 NETP:")
                console.log("  protocol: "+cs[0])
                console.log("  CS      : "+cs[1])
                console.log("  port    : "+cs[2])
                console.log("  IP      : "+cs[3])
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
