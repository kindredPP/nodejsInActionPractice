const connect = require('connect')
const cookieParser = require('cookie-parser')
var signature = require('cookie-signature');
console.log(signature.sign("steven","steven is smart")); 
console.log(signature.unsign("steven.F+x+Q8qEDP1q9DsDNHHmyc5VWuqKcrbKbmjy2ww8P6E","steven is smart")); 
// steven.F+x+Q8qEDP1q9DsDNHHmyc5VWuqKcrbKbmjy2ww8P6E
const app = connect()
  .use(cookieParser('steven is smart'))
  .use(function(req, res) {
    console.log(req.cookies)
    console.log(req.signedCookies)
    res.end('hello\n')
  }).listen(3000)
// curl http://localhost:3000/ -H "Cookie: name=tob, bar=1"
// curl http://localhost:3000/ -H "Cookie: name=s:steven.F+x+Q8qEDP1q9DsDNHHmyc5VWuqKcrbKbmjy2ww8P6E"
