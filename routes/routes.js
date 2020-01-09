var path = require('path');


module.exports = function(app) {
    // GET method route
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  })
}