const crypto = require('crypto');
const logger = require('./logger');

const iterations = 1000;

const hashUtil = {
  // hash 함수 생성
  makePasswordHash(password) {
    return new Promise((resolve, reject) => {
      if (!password) {
        reject(new Error('Not allowed null (password)'));
      }

      // 1. salt 생성
      const salt = crypto.randomBytes(64).toString('base64');

      // 2. hash 생성
      crypto.pbkdf2(password, salt, iterations, 64, 'sha256', (err, derivedkey) => {
        if (err) throw err;

        const hash = derivedkey.toString('hex');
        const encryptedPassword = `${salt}.${hash}`;
        logger.info(`hashed password ${encryptedPassword}`);

        resolve(encryptedPassword);
      });
    });
  },
  checkPasswordHash(password, encryptedPassword) {
    return new Promise((resolve, reject) => {
      if (!password || !encryptedPassword) {
        reject(new Error('Not allowed null (password'));
      }

      // 1. salt와 hash 분리
      const salt = encryptedPassword.split('.');
      // salt[0]: salt, salt[1]: hash

      // 2. login시 입력한 password로 hash 생성
      crypto.pbkdf2(password, salt[0], iterations, 64, 'sha256', (err, derivedkey) => {
        if (err) throw err;

        const newHash = derivedkey.toString('hex');
        if (newHash === salt[1]) resolve(true);
        else resolve(false);
      });
    });
  },
};

module.exports = hashUtil;
