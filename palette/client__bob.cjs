// const Ably = require('ably/promises');
// var WebSocketClient = require('websocket').client;
// var net = require("net");
// const url = require('url');


// (async () => {
//     const clientId = "mCWdHA.ttJ1BA:Gm7qL08ea0E8XFuY4CkAwxJZGaI2JuHKR56azpB3SGU"; // When not provided in authUrl, a default will be used.

//     const client = new Ably.Rest(clientId);
//     const tokenRequestData = await client.auth.createTokenRequest({ clientId: clientId });
//
//     const ably = new Ably.Realtime(clientId);
//     const channel = ably.channels.get('proxy-reverse');
//     channel.publish("hello world from BOB", { message: "Hello world!" });
//
//     console.log('tokenRequestData', tokenRequestData)
// })()


// require('dotenv').config()
let wstun = require("../api/server/wstun/index.js");
// let pkg = require("../../package.json");
let reverse_client = new wstun.client_reverse();
// let wstunHost = pkg.palette.zb.wstunHost
let wstunHost = 'ws://localhost:5000/'
let portTunnel = 5005
let address = 3333
let remoteAddr = `127.0.0.1:` + address

console.log({
    wstunHost: wstunHost,
    portTunnel: portTunnel,
    remoteAddr: remoteAddr
})

reverse_client.start(portTunnel, wstunHost, remoteAddr);