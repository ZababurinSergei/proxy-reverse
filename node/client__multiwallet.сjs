let wstun = require("../wstun/index.js");
let reverse_client = new wstun.client_reverse();
let wstunHost = 'wss://lascala.tech/'
let portTunnel = 5005
let address = 4434
let remoteAddr = `127.0.0.1:` + address

console.log({
    wstunHost: wstunHost,
    portTunnel: portTunnel,
    remoteAddr: remoteAddr
})

reverse_client.start(portTunnel, wstunHost, remoteAddr);