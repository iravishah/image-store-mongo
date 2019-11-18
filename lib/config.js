module.exports = () => {
  try {
    const env = process.env.NODE_ENV || 'local';
    let config = require(`./../env/${env}.json`);
    config.environment = env;
    return config;
  } catch (e) {
    console.log(`error while parsing config file ${e}`);
  }
}