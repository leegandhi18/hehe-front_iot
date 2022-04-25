const Influx = require('influx');
const influxConfig = require('../config/influxConfig');

class TsEdukit extends Influx.InfluxDB {
  constructor() {
    const schema = [
      {
        measurement: 'plcdata',
        fields: {
          // DataTime: Influx.FieldType.DataTime,
          Start: Influx.FieldType.INTEGER,
          Stop: Influx.FieldType.INTEGER,
          No1PartsError: Influx.FieldType.INTEGER,
          No1_Action: Influx.FieldType.INTEGER,
          No2_Action: Influx.FieldType.INTEGER,
          No3Ready: Influx.FieldType.INTEGER,
          ColorSensor: Influx.FieldType.INTEGER,
          VisionSensor: Influx.FieldType.INTEGER,
          Reset: Influx.FieldType.INTEGER,
          no1_on_off: Influx.FieldType.INTEGER, // 설비 관리 출력
          no2_on_off: Influx.FieldType.INTEGER, // 설비 관리 출력
          no3_on_off: Influx.FieldType.INTEGER, // 설비 관리 출력
          sensor1_on_off: Influx.FieldType.INTEGER,
          sensor2_on_off: Influx.FieldType.INTEGER,
          No1Delay: Influx.FieldType.INTEGER,
          No1Count: Influx.FieldType.INTEGER, // 대시보드 출력
          No2Count: Influx.FieldType.INTEGER, // 대시보드 출력
          No3Count: Influx.FieldType.INTEGER, // 대시보드 출력
          lamp_green: Influx.FieldType.INTEGER,
          lamp_yellow: Influx.FieldType.INTEGER,
          lamp_red: Influx.FieldType.INTEGER,
          No3Motor1: Influx.FieldType.INTEGER, // 대시보드 출력
          No3Motor2: Influx.FieldType.INTEGER, // 대시보드 출력
          No1ChipFull: Influx.FieldType.INTEGER,
          No2Chip: Influx.FieldType.INTEGER,
          No2CubeFull: Influx.FieldType.INTEGER,
          No2InPoint: Influx.FieldType.INTEGER,
          No2OutPoint: Influx.FieldType.INTEGER,
          No2Sol: Influx.FieldType.INTEGER,
          No2SolAction: Influx.FieldType.INTEGER,
          No2BackToSquare: Influx.FieldType.INTEGER,
          No2Mode: Influx.FieldType.INTEGER,
          No3Chip: Influx.FieldType.INTEGER,
          VisionCmdMemory: Influx.FieldType.INTEGER,
          No3DiceReading: Influx.FieldType.INTEGER,
          Emergency: Influx.FieldType.INTEGER,
          OutputLimit: Influx.FieldType.INTEGER,
          DiceValue: Influx.FieldType.INTEGER,
          DiceComparisonValue: Influx.FieldType.INTEGER,
          ColorSensorSensing: Influx.FieldType.INTEGER,
          No3Gripper: Influx.FieldType.INTEGER,
        },
        tags: ['DataTime'],
      },
    ];

    super({ ...influxConfig, schema });
  }

  useDatabase(callback) {
    return new Promise((resolve, reject) => {
      // this.influx.getDatabaseNames()
      this.getDatabaseNames()
      // eslint-disable-next-line consistent-return
        .then((databaseName) => {
          if (!databaseName.includes(influxConfig.database)) {
            console.log(`My database names are ${databaseName.join(', ')}`);
            console.log('and there is not the database');
            return this.createDatabase(influxConfig.database);
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

module.exports = TsEdukit;

// 구방식 2022-04-12
// class influx extends Influx.InfluxDB {
//   constructor() {
//     super();
//     this.influx = new Influx.InfluxDB(influxConfig);
//   }

//   useDatabase(callback) {
//     return new Promise((resolve, reject) => {
//       this.influx.getDatabaseNames()
//       // eslint-disable-next-line consistent-return
//         .then((databaseName) => {
//           if (!databaseName.includes(influxConfig.database)) {
//             console.log(`My database names are ${databaseName.join(', ')}`);
//             console.log('and there is not the database');
//             return this.influx.createDatabase(influxConfig.database);
//           } console.log(`(${influxConfig.database}) database already exists`);
//           resolve(influxConfig.database);
//         }).catch((err) => {
//           console.error(`Error creating Influx database! ${influxConfig.database}`);
//           console.log(err);
//           console.log(({ err }));
//         });
//     });
//   }
// }
