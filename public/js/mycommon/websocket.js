
// OnConstructor
var WebSocketClient = function () {
    this.ws = null;
    this.url = "";
    this.connected = false;
    this.onOpen = null;
    this.onClose = null;
    this.onMessage = null;
    this.onError = null;
};

WebSocketClient.prototype.open = function (url) {
    this.url = url;

    var myWebSocketClient = this;
    this.ws = new WebSocket(this.url);
    this.ws.onopen = function () {
        console.log('ws:onOpen: ' + myWebSocketClient.url);
        myWebSocketClient.connected = true;

        if (myWebSocketClient.onOpen) {
            myWebSocketClient.onOpen();
        }
    };
    this.ws.onclose = function () {
        console.log('ws:onClose: ' + myWebSocketClient.url);
        myWebSocketClient.ws = null;
        myWebSocketClient.connected = false;

        if (myWebSocketClient.onClose)
            myWebSocketClient.onClose();
    };
    this.ws.onmessage = function (event) {
        var data = event.data;
        //console.log('ws:onMessage: ' + data);

        if (myWebSocketClient.onMessage)
            myWebSocketClient.onMessage(data);
    };
    this.ws.onerror = function (event) {
        var data = event.data;
        console.log('ws:onError: ' + data);

        if (myWebSocketClient.onError)
            myWebSocketClient.onError(data);
    };
}

WebSocketClient.prototype.close = function () {
    if (this.ws) {
        this.ws.close();
    }
}

WebSocketClient.prototype.send = function (msg) {
    this.ws.send(msg);
    //console.log('ws:sendMessage: ' + msg);
}


// OnConstructor
var WebUser = function () {
    this.onOpen = null;
    this.onClose = null;
    this.onMessage = null;
    this.onError = null;
    this.webSocketClient = new WebSocketClient();

    var myWebUser = this;
    this.webSocketClient.onOpen = function () {
        if (myWebUser.onOpen) {
            myWebUser.onOpen();
        }
    };
    this.webSocketClient.onClose = function () {
        if (myWebUser.onClose) {
            myWebUser.onClose();
        }
    };
    this.webSocketClient.onMessage = function (data) {

        var networkObject = new NetworkObject();
        var response = networkObject.fromMsgPackObject(data);

        if (myWebUser.onMessage) {
            myWebUser.onMessage(response);
        }
    };
    this.webSocketClient.onError = function (data) {
        if (myWebUser.onError) {
            myWebUser.onError();
        }
    };
};

WebUser.prototype.open2 = function (ip, port, url) {
    var myurl = "ws://" + ip + ":" + port + url;
    this.webSocketClient.open(myurl);
}
WebUser.prototype.open = function (myurl, request) {
    var networkObject = new NetworkObject();
    var msg = networkObject.toMsgPackObject(request);

    var serviceName = request.GetServiceName();
    var name = strTohex(serviceName);
    msg = "loin" + name + "!!" + msg;

    myurl = myurl + "?auth=" + msg;
    this.webSocketClient.open(myurl);
}
WebUser.prototype.close = function () {
    this.webSocketClient.close();
}
WebUser.prototype.send = function (request) {
    if (!this.webSocketClient.connected)
        return;

    var networkObject = new NetworkObject();
    var msg = networkObject.toMsgPackObject(request);

    var serviceName = request.GetServiceName();
    var name = strTohex(serviceName);
    msg = name + "!!" + msg;
    this.webSocketClient.send(msg);
    return msg;
}
WebUser.prototype.directSend = function (msg) {
    this.webSocketClient.send(msg);
}
WebUser.prototype.isConnected = function () {
    return this.webSocketClient.connected;
}