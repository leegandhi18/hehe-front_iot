const Influx = require('influx');
const dotenv = require('dotenv');
const influxConfig = require('../config/influxConfig');
const logger = require('../lib/logger');

dotenv.config();

class influx extends Influx.InfluxDB {
  constructor() {
    super();
    this.influx = new Influx.InfluxDB(influxConfig);
  }

  useDatabase(callback) {
    return new Promise((resolve, reject) => {
      this.influx.getDatabaseNames()
      // eslint-disable-next-line consistent-return
        .then((databaseName) => {
          if (!databaseName.includes(influxConfig.database)) {
            console.log(`My database names are ${databaseName.join(', ')}`);
            console.log('and there is not the database');
            return this.influx.createDatabase(influxConfig.database);
          } console.log(`(${influxConfig.database}) database already exists`);
          resolve(influxConfig.database);
        }).catch((err) => {
          console.error(`Error creating Influx database! ${influxConfig.database}`);
          console.log(err);
          console.log(({ err }));
        });
    });
  }
}
module.exports = influx;
