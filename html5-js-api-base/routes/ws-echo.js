import { WebSocketServer } from "ws";//import用預設就加大括號


const wsServer = new WebSocketServer({ port: 3080 });
wsServer.on("connection", (ws, req) => {
    const ip = req.socket.remoteAddress;
    ws.on("message", (message) => {
        ws.send(message.toString());
    });
    ws.send(`連線了,${ip},連線數 ${wsServer.clients.size},${req.url}`)
});
export default wsServer;
