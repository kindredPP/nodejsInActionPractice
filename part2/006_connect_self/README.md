## Connect 自带的中间件

#### cookieParser() 解析来自浏览器的cookie，放到req.cookies中; 
#### bodyParser() 读取并解析请求体，放到req.body中;
#### limit() 跟bodyParser()联手防止读取过大的请求;
#### query() 解析请求URL的查询字符串，放到req.query中。