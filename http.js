const http = require('http'); //引入 node http 核心模块
const server = http.createServer(); //创建一个服务对象

server.on('request', (req, rsp) => { //req:谁请求的，请求方式，请求内容  rsp：如何响应，响应内容
  console.log(req.method);
  rsp.setHeader('Content-type', 'text/plain;charset=utf-8'); //设置响应头
  rsp.write('服务器响应');
  rsp.end(); //响应请求
});

server.listen(5500, function () {
  console.log('请打开8000')
});
