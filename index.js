var express = require('express');
var cors = require('cors');
require('dotenv').config()
const multer = require('multer')
var app = express();

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

const storage = multer.memoryStorage()
const upload = multer(({ storage: storage }))

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post("/api/fileanalyse", upload.single("upfile"), function(req, res) {
  try {
    const { originalname, mimetype, size } = req.file
    res.json({ name: originalname, type: mimetype, size })
  } catch (error) {
    res.json({ error: error.message })
  }
})



const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Your app is listening on port ' + port)
});
