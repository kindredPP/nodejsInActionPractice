var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/test', {
  useNewUrlParser: true
})
var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we're connected!")
});
const schema = new mongoose.Schema({
  name: String,
  path: String
  /* uid: String,
  pwd: String */
}, {
  collection: 'photos'
})
const test = mongoose.model('photos', schema)
/* test.findOne(function(err, result) {
  console.log(err)
  console.log("=======" + result)
}) */
/* test.findOne({'uid': 'admin'}, 'uid pwd', function (err, test) {
  if (err) return handleError(err);
  console.log(test);
}); */
module.exports = test
