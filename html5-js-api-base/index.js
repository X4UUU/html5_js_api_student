import express from "express";
import serveIndex from "serve-index";
import "./routes/ws-echo.js";
import "./routes/ws-chat.js";

const web_port = 3031;
const app = express();

// routes setup
// SSE測試伺服端，不要寫在serverIndex後面，會被蓋掉
app.get("/try-sse", (req, res) => {
    let id = 30;
    res.writeHead(200, {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
    })
    setInterval(() => {
        const now = new Date();
        res.write(`id:${id++}\n`);
        res.write(`data:${now.toLocalString()}\n\n`);
    }, 2000);
});
app.use(express.static("public"));
app.use("/", serveIndex("public", { icons: true }));
app.listen(web_port, () => {
    console.log(`伺服器啟動於通訊阜:${web_port}`);
})