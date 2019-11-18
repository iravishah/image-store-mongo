const mongoose = require('mongoose');
const db = mongoose.connection;
const mongoUriBuilder = require('mongo-uri-builder');

function getConnStr(mongo, opts) {
  console.log(`db is: ${mongo.db}`);
  console.log(`replicas: ${mongo.replicas}`);

  var connectionStr = mongoUriBuilder({
    username: encodeURIComponent(mongo.username),
    password: encodeURIComponent(mongo.password),
    host: mongo.replicas,
    database: mongo.db,
    options: opts
  });

  return connectionStr;
}

function connect(config) {
  const options = config.options;

  let uriStr = getConnStr(config, options);

  mongoose.connect(uriStr, options, (err) => {
    if (err) {
      console.error(`error while connecting ${err}`);
    }
  });

  db.on('connecting', function () {
    console.log('connecting to Mongo DB...');
  });
  db.on('error', function (error) {
    console.error('error in mongo db connection: ' + error);
  });
  db.on('connected', function () {
    console.log('mongo db connected!');
  });
  db.once('open', function () {
    console.log('mongo db connection opened!');
  });
  db.on('reconnected', function () {
    console.log('mongo db reconnected!');
  });
  db.on('disconnected', function () {
    console.error('mongo db disconnected!');
  });
  return mongoose;
}

module.exports = { connect };