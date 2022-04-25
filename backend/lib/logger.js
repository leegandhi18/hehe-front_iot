const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file');
const dotenv = require('dotenv');
const fs = require('fs');

dotenv.config();

// logger level 세팅
const loggerLevel = process.env.LOGGER_LEVEL || 'info';

// const { env } = envConfig;
const logDir = 'log';

// Log only if info.level less than or equal to this level
// { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }

// log directory
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// log file
const dailyRotateFileTransport = new transports.DailyRotateFile({
  // 로그파일 출력 세팅
  filename: `${logDir}/%DATE%.log`,
  datePattern: 'YYYY-MM-DD',
  format: format.combine(
    format.printf(
      (info) => `${info.timestamp}[${info.level}] ${info.message}`,
    ),
  ),
});

const logger = createLogger({
  // 로거 환경 세팅(기본 세팅)
  level: loggerLevel,
  format: format.combine(
    // format.label( { label: 'label123' }),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
    format.json(),
  ),
  transports: [
    new transports.Console({
      // 콘솔 출력 세팅
      level: loggerLevel,
      format: format.combine(
        format.colorize(),
        format.printf(
          (info) => `${info.timestamp}[${info.level}] ${info.message}`,
        ),
      ),
    }),
    dailyRotateFileTransport,
  ],
});

module.exports = logger;
