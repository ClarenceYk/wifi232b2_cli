# wifi232b2_cli

有人物联网 USR-WIFI232-B2 模块串口命令行配置工具。

## 依赖

- nodejs
- serialport

## 安装

```
sudo cnpm install -g serialport --unsafe-perm --build-from-source
git clone https://github.com/ClarenceYk/wifi232b2_cli.git
cd wifi232_cli
```

## 配置命令

| 是否实现 | 命令 | 描述 |
| :---: | --- | --- |
| <li>[x]</li> | entm | 退出 AT 命令模式，返回透传模式 |
| <li>[x]</li> | lann | 设置或查询 LAN 设置 |
| <li>[x]</li> | mid | 查询模块 MID |
| <li>[x]</li> | netp | 设置或查询网络协议参数 |
| <li>[x]</li> | z | 重启模块 |
| <li>[x]</li> | tmode | 设置或查询数据传输模式 |
| <li>[x]</li> | ver | 查询软件版本 |
| <li>[x]</li> | wakey | 设置或查询 WIFI AP 模式下的加密参数 |
| <li>[x]</li> | wap | 设置或查询 WIFI AP 模式下的参数 |
| <li>[x]</li> | wmode | 设置或查询 WIFI 操作模式（AP 或者 STA） |
| <li>[x]</li> | help | 显示帮助信息 |

## 使用

通过 help 参数查看帮助信息：

```
$ ./wifi232 help

 wifi232 配置工具

 用法：
   wifi232 <命令>

   可用命令如下：
   entm		退出 AT 命令模式，返回透传模式

   lann		设置或查询 LAN 设置，只在 AP 模式下有效
       		  查询：lann
       		  设置：lann=<address,mask>
       		  <address> LAN 口 IP 地址
       		  <mask> LAN 口子网掩码

   mid		查询模块 MID

   netp		设置或查询网络协议参数
       		  查询：netp
       		  设置：netp=<protocol,CS,port,IP>
       		  <protocol> 协议类型
       		   TCP
       		   UDP
       		  <CS> 服务器端或客户端
       		   SERVER :服务器端
       		   CLIENT :客户端
       		  <port> 协议端口
       		  <IP>

   z		重启模块

   tmode	设置或查询数据传输模式（透传模式或协议模式）
        	  查询：tmode
        	  设置：tmode=<tmode>
        	  <tmode>
        	   Through    : 透明传输模式
        	   Agreement  : 串口指令模式
        	   GPIO       : GPIO 模式
        	   Httpdclient: HTTPD Client 模式

   ver		查询软件版本

   wakey	设置或查询 WIFI AP 模式下的加密参数
        	  查询：wakey
        	  设置：wakey=<auth,encry,key>
        	  <auth> 认证模式
        	   OPEN
        	   SHARED
        	   WPAPSK
        	   WPA2PSK
        	  <encry> 加密算法
        	   NONE   : auth=OPEN 时有效
        	   WEP-H  : auth=OPEN/SHARED 时有效(WEP,HEX)
        	   WEP-A  : auth=OPEN/SHARED 时有效(WEP,ASCII)
        	   TKIP   : auth=WPAPSK/WPA2PSK 时有效
        	   AES    : auth=WPAPSK/WPA2PSK 时有效
        	   TKIPAES: auth=WPAPSK/WPA2PSK 时有效
        	  <key> 密码

   wap		设置或查询 WIFI AP 模式下的参数
      		  查询：wap
      		  设置：wap=<wifi_mode,ssid,channel>
      		  <wifimode>
      		   11BG
      		   11B
      		   11G
      		   11BGN
      		   11N
      		  <ssid> AP 模式时的 SSID
      		  <channel> WIFI channel 选择，AUTO 或 CH1~CH11

   wmode	设置或查询 WIFI 操作模式（AP 或者 STA）
        	  查询：wmode
        	  设置：wmode=<mode>
        	  <mode>
        	   ap  无线接入点模式
        	   sta 无线终端模式

   help		显示帮助信息
```

