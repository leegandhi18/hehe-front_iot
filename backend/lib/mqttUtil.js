/* eslint-disable no-loop-func */
const res = require('express/lib/response');
const now = require('performance-now');
const logger = require('./logger');

const mqttUtil = {
  mqttSubscribe(topic, message) {
    return new Promise((resolve, reject) => {
      try {
        /*
        // for방식 //
        const start2 = now();
        console.log(start2.toFixed(3));
        // for 방식, forEach 방식과 대조하여 처리 속도 차이를 알고 싶다.
        const keys = [];
        const values = [];
        const processedPlcData = {};

        for (let i = 0; i < JSON.parse(message).Wrapper.length; i += 1) {
          keys[i] = JSON.parse(message).Wrapper[i].name;
          values[i] = JSON.parse(message).Wrapper[i].value;
          console.log(i, JSON.parse(message).Wrapper.length, keys[i], values[i]);
        }

        for (let i = 0; i < keys.length; i += 1) {
          if (keys[i] === 'DataTime') {
            // tags 컬럼 분리 (DataTime)
            processedPlcData.tags = {
              [keys[i]]: values[i],
            };
          } else {
            processedPlcData.fields = {
              ...processedPlcData.fields,
              [keys[i]]: Number(values[i]),
            };
          }
        }
        const end2 = now();
        console.log(end2.toFixed(3)); // the number of milliseconds the current node process is running
        console.log('for 성능테스트: ', end2.toFixed(3) - start2.toFixed(3));
        console.log('for 성능테스트: ', (end2 - start2).toFixed(3), '밀리초');
        */

        // forEach방식 //
        const start1 = now();
        console.log(start1.toFixed(3));
        const influxparams = {
          measurement: topic,
          tags: {},
          fields: {},
          timestamp: '',
        };
        const receivedData = JSON.parse(message).Wrapper;
        // console.log('message: ', JSON.parse(message).Wrapper);

        receivedData.forEach((e) => {
          if (e.name !== 'DataTime') {
            influxparams.fields = { ...influxparams.fields, [e.name]: Number(e.value) };
          } else {
            influxparams.tags = { ...influxparams.tags, [e.name]: e.value };
          }
        });
        // console.log(influxparams.tags, influxparams.fields);

        const end1 = now();
        console.log(end1.toFixed(3)); // the number of milliseconds the current node process is running
        console.log('forEach 성능테스트: ', end1.toFixed(3) - start1.toFixed(3));
        console.log('forEach 성능테스트: ', (end1 - start1).toFixed(3), '밀리초');

        resolve(influxparams); // forEach 방식
        // resolve(processedPlcData); // for 방식
      } catch (err) {
        reject(err);
      }
    });
  },
  MachineStatusCompare(message, result) {
    return new Promise((resolve, reject) => {
      let machineStatus = null;
      let newMachineStatus = null;
      try {
        const receivedData = JSON.parse(message).Wrapper;
        // console.log('message: ', JSON.parse(message).Wrapper);

        receivedData.forEach((e) => {
          if (e.name === 'no1_on_off') {
            machineStatus = { ...machineStatus, [e.name]: Number(e.value) ? 'ON' : 'OFF' };
          } else if (e.name === 'no2_on_off') {
            machineStatus = { ...machineStatus, [e.name]: Number(e.value) ? 'ON' : 'OFF' };
          } else if (e.name === 'no3_on_off') {
            machineStatus = { ...machineStatus, [e.name]: Number(e.value) ? 'ON' : 'OFF' };
          }
        });
        console.log('machineStatus:', machineStatus);
      } catch (err) {
        reject(err);
      }

      // console.log('1: ', result);
      // console.log('2: ', result.rows);
      // console.log('3: ', result.rows[0]);
      // result.rows[i].Machine.dataValues.status;
      try {
        const receivedData = result.rows;
        for (let i = 0; i < Object.entries(machineStatus).length; i += 1) {
          const test = Object.entries(machineStatus);
          // console.log('test', test);
          // console.log(`test[${i}]`, test[i]);
          // console.log(`test[${i}][0]`, test[i][0]);

          // 1호기 - 3호기 글자는 db에 저장된 설비code에 맞게 수정해야함
          receivedData.forEach((e) => {
            if (test[i][0] === 'no1_on_off' && e.dataValues.code === '1호기') {
              if (test[i][1] !== e.dataValues.status) {
                newMachineStatus = { ...newMachineStatus, [e.dataValues.code]: test[i][1] };
              }
            } else if (test[i][0] === 'no2_on_off' && e.dataValues.code === '2호기') {
              if (test[i][1] !== e.dataValues.status) {
                newMachineStatus = { ...newMachineStatus, [e.dataValues.code]: test[i][1] };
              }
            } else if (test[i][0] === 'no3_on_off' && e.dataValues.code === '3호기') {
              if (test[i][1] !== e.dataValues.status) {
                newMachineStatus = { ...newMachineStatus, [e.dataValues.code]: test[i][1] };
              }
            }
          });
        }

        console.log(newMachineStatus);
      } catch (err) {
        reject(err);
      }

      resolve(newMachineStatus);
    });
  },
  updateItemQuantityData(params, countResult, nowQuantity) {
    return new Promise((resolve, reject) => {
      const name = [];
      const quantity = [];
      const result = {
        name,
        quantity,
      };
      try {
        for (let i = 0; i < 3; i += 1) {
          if (nowQuantity.rows[i].dataValues.itemId === '재료') {
            result.name[i] = nowQuantity.rows[i].dataValues.name;
            result.quantity[i] = nowQuantity.rows[i].dataValues.quantity
            - countResult[0][`No${i + 1}Count`];
          } else if (nowQuantity.rows[i].dataValues.itemId === '완제품') {
            console.log('제품이름1: ', nowQuantity.rows[i].dataValues.name);
            console.log('제품이름2: ', params.name);
            if (nowQuantity.rows[i].dataValues.name === params.name) {
              result.name[i] = nowQuantity.rows[i].dataValues.name;
              result.quantity[i] = nowQuantity.rows[i].dataValues.quantity
              + countResult[0][`No${i + 1}Count`];
            }
          }
          console.log(result);
        }
        console.log(result);
      } catch (err) {
        reject(err);
      }

      resolve(result);
    });
  },
};

module.exports = mqttUtil;
