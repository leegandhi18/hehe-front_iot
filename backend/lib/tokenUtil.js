const jwt = require('jsonwebtoken');
const logger = require('./logger');

const secretKey = '2B4D6251655468566D597133743677397A24432646294A404E635266556A586E';
const options = {
  expiresIn: '24h',
};

const tokenUtil = {
  // 토큰 생성
  makeToken(loginInfo) {
    const payload = {
      id: loginInfo.id,
      name: loginInfo.name,
      phone: loginInfo.phone,
      password: loginInfo.password,
      role: loginInfo.role,
    };

    const token = jwt.sign(payload, secretKey, options);
    logger.debug(`(tokenUtil.tokenUtil.makeToken.token) ${JSON.stringify(payload)}`);
    return token;
  },

  // 토큰 검증
  verifyToken(token) {
    try {
      const decoded = jwt.verify(token, secretKey);

      return decoded;
    } catch (err) {
      return null;
    }
  },
};

module.exports = tokenUtil;
