//###############################################################################
//##
//# Copyright (C) 2014-2015 Andrea Rocco Lotronto, 2017 Nicola Peditto
//##
//# Licensed under the Apache License, Version 2.0 (the "License");
//# you may not use this file except in compliance with the License.
//# You may obtain a copy of the License at
//##
//# http://www.apache.org/licenses/LICENSE-2.0
//##
//# Unless required by applicable law or agreed to in writing, software
//# distributed under the License is distributed on an "AS IS" BASIS,
//# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//# See the License for the specific language governing permissions and
//# limitations under the License.
//##
//###############################################################################


const Ably = require('ably/promises');

const clientId = "mCWdHA.ttJ1BA:Gm7qL08ea0E8XFuY4CkAwxJZGaI2JuHKR56azpB3SGU"; // When not provided in authUrl, a default will be used.
const ably = new Ably.Realtime(clientId);
const channel = ably.channels.get('proxy-reverse');

var WebSocketClient = require('websocket').client;
var net = require("net");

var bindSockets = require("./bindSockets_reverse-lambda");

wst_client_reverse = function() {
  this.wsClientForControll = new WebSocketClient();
};

wst_client_reverse.prototype.start = async function(portTunnel, wsHostUrl, remoteAddr, uuid) {

  //Getting paramiters
  var url = require("url");
  var urlWsHostObj = url.parse(wsHostUrl);
  var _ref1 = remoteAddr.split(":"), remoteHost = _ref1[0], remotePort = _ref1[1];

  var proto = wsHostUrl.split(":")[0];
  if(proto == "wss")
    require("../lib/https_override");

  if(uuid != undefined){
    url = "" + wsHostUrl + "/?dst=" + urlWsHostObj.hostname+":"+portTunnel + "&uuid=" +uuid;
  }
  else{
    url = "" + wsHostUrl + "/?dst=" + urlWsHostObj.hostname+":"+portTunnel;
  }
  
  console.log("[SYSTEM] -------------------- Connecting to", wsHostUrl);
  console.log("[SYSTEM] --------------------> exposing", remoteAddr, "on port", portTunnel);

  if(uuid != undefined)
      console.log("[SYSTEM] --> My UUID is ", uuid);

  //Connection to Controll WS Server
  // this.wsClientForControll.connect(url, 'tunnel-protocol');


  await channel.subscribe((event) => {
    console.log("Ably message received", event);
    // document.getElementById("response").innerHTML += "<br />" + JSON.stringify(msg);
  });

  // channel.publish("hello world from BOB", { message: "Hello world!" });
  // wsConnectionForData.socket.pause();

  //DEBUG console.log("Connected wsClientData to WS-Server for id "+parsing[1]+" on localport::"+wsConnectionForData.socket.localPort);
  console.log("[SYSTEM] --> Start TCP connection on client to "+remoteHost+":"+remotePort);

  tcpConnection(wsConnectionForData, remoteHost, remotePort);

  /*
  this.wsClientForControll.on('connect', (function(_this) {

    return function(wsConnectionForControll) {

      console.log("[SYSTEM] --> TCP connection established!");

      wsConnectionForControll.on('message', function(message) {
        //Only utf8 message used in Controll WS Socket
        var parsing = message.utf8Data.split(":");
)
        //Managing new TCP connection on WS Server
        if (parsing[0] === 'NC'){

          //Identification of ID connection
          var idConnection = parsing[1];

          this.wsClientData = new WebSocketClient();
          this.wsClientData.connect(wsHostUrl+"/?id="+idConnection, 'tunnel-protocol');

          //Management of new WS Client for every TCP connection on WS Server
          this.wsClientData.on('connect', (function(_this){

            return function(wsConnectionForData){

              //Waiting of WS Socket with WS Server
              wsConnectionForData.socket.pause();

              //DEBUG console.log("Connected wsClientData to WS-Server for id "+parsing[1]+" on localport::"+wsConnectionForData.socket.localPort);
              console.log("[SYSTEM] --> Start TCP connection on client to "+remoteHost+":"+remotePort);

              tcpConnection(wsConnectionForData, remoteHost, remotePort);

            }
          })(this));

        }
      });

    }

  })(this));
   */

  //Management of WS Connection failed
  this.wsClientForControll.on('connectFailed', function(error) {
    console.log("[SYSTEM] --> WS connect error: " + error.toString());
  });


};

function tcpConnection(wsConn, host, port){

  var tcpConn = net.connect( {port: port, host: host}, function(){});
  bindSockets(wsConn, tcpConn);

  tcpConn.on("connect",function(){
    //Resume of the WS Socket after the connection to WS Server
    wsConn.socket.resume();
  });

  tcpConn.on('error',(function(_this){
    return function(request){
      console.log("[SYSTEM] --> "+request);
    }
  })(this));

  //wst_client_reverse

}

module.exports = wst_client_reverse;
