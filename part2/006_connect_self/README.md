## Connect 自带的中间件

### cookieParser() 解析来自浏览器的cookie，放到req.cookies中; 
### bodyParser() 读取并解析请求体，放到req.body中;
### limit() 跟bodyParser()联手防止读取过大的请求;
### query() 解析请求URL的查询字符串，放到req.query中。


#### [cookie](https://blog.csdn.net/liangklfang/article/details/51072424)源码解析
> 常规cookie、签名cookie和JSON cookie

[cookie-parser 变更为独立的模块](https://blog.csdn.net/sooooooooad/article/details/52154228)
文章中第三行的路径改为require('cookie-signature')

打印结果：
steven.F+x+Q8qEDP1q9DsDNHHmyc5VWuqKcrbKbmjy2ww8P6E
{}
[Object: null prototype] { name: 'steven' }

#### bodyParser

