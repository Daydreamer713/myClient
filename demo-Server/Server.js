// common 规范，通过 require 加载模块，一个 js 文件代表一个模块
let http = require('http');
let url = require('url'); // 能将 url 解析为对象
let util = require('util'); // 开发工具，便于调试
let fs = require('fs'); // 读取文件

// http 模块将返回一个 server 对象
let httpServer = http.createServer((req, res) => {
    // res.statusCode = 200; //成功
    // res.setHeader("Content-Type", "text/plain; charset=utf-8");
    //node 原生方式获取 req 的 url
    let pathname = url.parse(req.url).pathname;
    fs.readFile(pathname.substring(1), (err, data) => {
        if (err) {
            res.writeHead(404, {
                "Content-Type": 'text/html'
            });
        } else {
            res.writeHead(200, {
                'Content-Type': 'text/html'
            })
            res.write(data.toString());
        }
        res.end();
    })
});

httpServer.listen(3000, '127.0.0.1', () => {
    console.log("服务器已运行：请打开浏览器：");
});