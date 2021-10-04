/* eslint-disable no-undef */
const connection = require('../confiq/db');
module.exports = {
  createAddress: (data) => {
    return new Promise((resolve, reject) => {
      connection.query(`INSERT INTO address set ?`, data, (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      });
    });
  },
  getItemAddress: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM address WHERE id_user = "${id}" ORDER BY id_address DESC LIMIT 1 OFFSET 0`,
        (error, result) => {
          if (!error) {
            resolve(result);
          } else {
            reject(new Error(error));
          }
        }
      );
    });
  },
  updateAddress: () => {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE address set ? WHERE id_address = ?', [data, id], (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(new Error(error));
        }
      });
    });
  },
};
