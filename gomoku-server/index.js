var WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({
        port: process.env.WSPORT || 3001
    });

wss.broadcast = function(data) {
    for (var i in this.clients) this.clients[i].send(JSON.stringify(data));
};

wss.on('connection', function(ws) {
    ws.on('message', function(data) {
        data = JSON.parse(data);
        if (data.type === "message") {
            wss.broadcast({
                nick: ws.nick,
                uid: ws.uid,
                time: moment(data.time).format("HH:mm:ss"),
                message: data.message,
                type: "message"
            });
        } else if (data.type === "nickname") {
            wss.broadcast({
                oldnick: ws.nick,
                nick: data.nick,
                uid: ws.uid,
                type: "nickname"
            });
            ws.nick = data.nick;
        }
    });
    ws.on('close', function() {
        wss.broadcast({
            nick: ws.nick,
            uid: ws.uid,
            type: "exit"
        });
    });
    ws.uid = uuid.v4();
    ws.nick = "游客";
    for (var i in this.clients) {
        ws.send(JSON.stringify({
            nick: this.clients[i].nick,
            uid: this.clients[i].uid,
            type: "join"
        }));
    }
    wss.broadcast({
        nick: ws.nick,
        uid: ws.uid,
        type: "join"
    });
});