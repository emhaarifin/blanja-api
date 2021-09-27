/* eslint-disable no-undef */
const connection = require('../confiq/db');
module.exports = {
  createAddress: (data) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO address SET ?', data, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  getItemAddress: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM address WHERE id_address = ?', id, (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(new Error(error));
        }
      });
    });
  },
  updateAddress: () => {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE address SET ? WHERE id_address = ?', [data, id], (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(new Error(error));
        }
      });
    });
  },
};
