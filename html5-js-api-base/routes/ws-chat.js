import { WebSocketServer } from "ws";


const wsServer = new WebSocketServer({ port: 3081 });
// 廣播訊息
const broadcastMsg = (msg) => {
    wsServer.clients.forEach((ws)=>{
        if (ws.readyState===WebSocket.OPEN) {
            ws.send(msg);
        }
    });
}

wsServer.on("connection", (ws, req) => {
    const dataObj = {name:"",ip:req.socket.remoteAddress};
    ws.on("message", (message) => {
        let m = message.toString();
        if (dataObj.name) {
            //某人說了什麼
            msg = `${dataObj.name}:${m}`;
        } else {
            dataObj.name = m;
            //某人進到聊天室
            msg = `"${dataObj.name}" 進入聊天室，目前在線人數為: ${wsServer.clients.size}`;
        }
    broadcastMsg(msg);//廣播訊息
    });
    ws.on("close",()=>{
        const msg = `"${dataObj.name}" 離開聊天室，目前在線人數為: ${wsServer.clients.size}`;
    });
});
export default wsServer;
