import express from "express";
import serveIndex from "serve-index";

const web_port = 3031;
const app = express();

// routes setup
app.use(express.static("public"));
app.use("/", serveIndex("public", { icons: true }));
app.listen(web_port, () => {
    console.log(`伺服器啟動於通訊阜:${web_port}`);
})