const dotenv = require('dotenv');
const Influx = require('influx');

dotenv.config();

const influxConfig = {
  host: process.env.TSDB_HOST || 'backend',
  port: process.env.TSDB_PORT || '8086',
  database: process.env.TSDB_DATABASE || 'backend',
};

module.exports = influxConfig;
