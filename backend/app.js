const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const mqtt = require('mqtt');
const res = require('express/lib/response');
const dotenv = require('dotenv');
const corsConfig = require('./config/corsConfig.json');
const models = require('./models/index');
const tsEdukitService = require('./service/tsEdukitService');
const machineService = require('./service/machineService');

dotenv.config();
// 업로드 라우터

const logger = require('./lib/logger');

const indexRouter = require('./routes/index');

const app = express();
// logger.info('app start');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// RDB 연결 확인 및 table 생성
models.sequelize.authenticate().then(() => {
  logger.info('DB connection success');

  // sequelize sync (table 생성)
  // force: true -> table 재생성
  // models.sequelize.sync({ force: true }).then(() => {
  models.sequelize.sync().then(() => {
    logger.info('Sequelize sync success');
  }).catch((err) => {
    logger.error('Sequelize sync error', err);
  });
}).catch((err) => {
  logger.error('DB Connection fail', err);
});

// 구방식 2022-04-12
// const Influx = require('influx');
// const influxConfig = require('./config/influxConfig');
// TSDB 연결 확인 및 database 생성
// eslint-disable-next-line new-cap
// const influx = new models.influx();
// influx.useDatabase();

// 업로드 파일위치
app.use(express.static('upload'));
app.use(cors(corsConfig));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// 업로드 라우터

app.use('/', indexRouter);
// app.use('/users', usersRouter); // 구코드 삭제
app.use(express.static(`${__dirname}/public`));
// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const client = mqtt.connect(process.env.MQTT_HOST0);
// const client = mqtt.connect(process.env.MQTT_HOST1);
client.subscribe(process.env.MQTT_SUBSCRIBE);
client.on('message', async (topic, message) => {
  // plc data tsdb에 저장
  const result = await tsEdukitService.reg(topic, message);
  // edukit 1~3호기 on/off 상태 업데이트
  const machineStatus = await machineService.statusEdit(message);
});

module.exports = app;
