/* eslint-disable no-undef */
const connection = require("../../../src/confiq/db");

module.exports = {
  getAllOrder: (search, sortBy, sort) => {
    return new Promise((resolve, reject) => {
      // connection.query(`SELECT id, categoryName as category, image FROM category`, (error, result) => {
      connection.query(
        `SELECT o.*, c.categoryName as category, p.name FROM order_seller o INNER JOIN category c ON c.id = o.categoryId INNER JOIN products p ON p.id = o.productId WHERE o.buyerName LIKE CONCAT('%',?,'%') ORDER BY ${sortBy} ${sort}`,
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
        `SELECT o.*, c.categoryName as category, p.name FROM order_seller o INNER JOIN category c ON c.id = o.categoryId INNER JOIN products p ON p.id = o.productId WHERE o.ID = ?`,
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
      connection.query(
        `INSERT INTO order_seller set ?`,
        data,
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
  updateOrder: (id, data) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE order_seller o SET ? WHERE o.id = ?",
        [data, id],
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
  deleteOrder: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "DELETE FROM order_seller WHERE id = ?",
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
};
