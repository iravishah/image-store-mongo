const mongoose = require('mongoose');
const express = require('express');
const fs = require('fs');
const multer = require('multer');
const bodyParser = require('body-parser');
const app = express();

global.config = require('./lib/config')();

const router = express.Router();
const mongoConnect = require('./db/connect');
mongoConnect.connect(global.config.mongo);

app.use(multer({ dest: './uploads/' }).single("userPhoto"));
app.use(bodyParser.json());

require('./models/image');
const Item = mongoose.model('image');


router.get('/api/ping', (req, res) => {
  res.status(200).send('pong');
})

router.post('/api/photo', function (req, res) {
  Item.create({
    name: req.file.originalname,
    img: {
      data: fs.readFileSync(req.file.path),
      contentType: req.file.mimetype
    }
  }, (err, resp) => {
    if (err) {
      return res.status(400).json({ status: 'failed', error: err });
    }
    res.status(200).json({ status: 'success', message: 'uploaded successfully!!' });
  })
});

router.get('/api/:id', (req, res) => {
  const _id = req.params.id;
  const path = req.query.path;
  Item.findOne({ _id: _id }, (err, doc) => {
    if (err) {
      return res.status(400).send(err);
    }

    fs.writeFile(`${path}/${doc.name}`, doc.img.data, (err) => {
      if (err) {
        return res.status(400).json({
          status: 'failed',
          error: err
        })
      }
      res.status(200).json({ status: 'success', message: 'downloaded successfully!', path: `${path}/${doc.name}` });
    })
  })
});

module.exports = router;

app.use(router);

app.listen(global.config.port, () => { console.log(`listening on ${global.config.port}`) });