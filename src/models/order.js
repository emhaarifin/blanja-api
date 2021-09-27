/* eslint-disable no-undef */
const connection = require('../confiq/db');

module.exports = {
  getAllOrder: (search, id, sortBy, sort) => {
    return new Promise((resolve, reject) => {
      // connection.query(`SELECT id, categoryName as category, image FROM category`, (error, result) => {
      connection.query(
        `SELECT o.*, c.categoryName as category, p.name FROM orders o INNER JOIN category c ON c.id = o.category_id INNER JOIN products p ON p.id = o.product_id WHERE o.status LIKE CONCAT ("%",?,"%") AND o.user_id LIKE CONCAT ("%","${id}","%") ORDER BY ${sortBy} ${sort}`,
        search,
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
  getOrderbyID: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT o.*, c.categoryName as category, p.name FROM orders o INNER JOIN category c ON c.id = o.category_id INNER JOIN products p ON p.id = o.product_id WHERE o.id = ?`,
        id,
        (error, result) => {
          if (!error) {
            resolve(result);
          } else {
            reject(error);
          }
        }
      );
    });
  },
  addOrder: (data) => {
    return new Promise((resolve, reject) => {
      connection.query(`INSERT INTO orders set ?`, data, (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      });
    });
  },
  updateOrder: (id, data) => {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE orders o SET ? WHERE o.id = ?', [data, id], (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      });
    });
  },
  deleteOrder: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM orders WHERE id = ?', id, (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      });
    });
  },
};
