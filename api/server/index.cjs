const dotenv = require('dotenv');
// const Ably = require('ably/promises');
// let wstun = require('./wstun/index.js');
// const httpProxy = require('http-proxy');
// const http = require('http');
// const url = require("url");
// const net = require("net");
// const uuid = require('node-uuid');
// const WebSocketServer = require('websocket').server;
// const serverless = require('serverless-http');
dotenv.config();

module.exports.handler = async function handler (event, context) {
    // var WebSocketServer, bindSockets, http, net, url, wst_server_reverse;
    // var httpProxy = require('http-proxy');
    // let proxy = httpProxy.createProxyServer({});
    // WebSocketServer = require('websocket').server;
    // const serverless = require('serverless-http');

    console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@', event)
    return {
        statusCode: 200,
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({})
    };
};