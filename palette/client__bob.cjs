// require('dotenv').config()
let wstun = require("../api/server/wstun/index.js");
// let pkg = require("../../package.json");
let reverse_client = new wstun.client_reverse();
// let wstunHost = pkg.palette.zb.wstunHost
let wstunHost = 'http://localhost:5000/'
let portTunnel = 5005
let address = 3333
let remoteAddr = `127.0.0.1:` + address

console.log({
    wstunHost: wstunHost,
    portTunnel: portTunnel,
    remoteAddr: remoteAddr
})

reverse_client.start(portTunnel, wstunHost, remoteAddr);