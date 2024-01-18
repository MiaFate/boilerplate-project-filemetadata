var express = require('express');
var cors = require('cors');
require('dotenv').config()

var app = express();

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post("/api/fileanalyse", function(req, res) {
  try {
    const { upfile } = req.body
    res.json({ upfile: upfile })
  } catch (error) {
    res.json({ error: error.message })
  }
})



const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Your app is listening on port ' + port)
});
