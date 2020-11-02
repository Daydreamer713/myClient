// common 规范，通过 require 加载模块，一个 js 文件代表一个模块
let http = require('http');
// http 模块将返回一个 server 对象
let httpServer = http.createServer((req, res) => {
    res.statusCode = 200; //成功

    res.setHeader("Content-Type", "text/plain; charset=utf-8");

    res.end("hello,node");
});

httpServer.listen(3000, '127.0.0.1', () => {
    console.log("服务器已运行：请打开浏览器：");
});