var http = require('http');

http.get('https://www.imooc.com/common/adver-getadver', (res) => {
    let data = '';
    res.on("data", (chunk) => { // 数据不是一次性得到，得 on 监听拼接数据
        data += chunk;
    });

    res.on("end", () => {
        let result = JSON.parse(data);
        console.log(`result${result.msg}`)
    })
})