/* eslint-disable no-undef */
const connection = require("../../../src/confiq/db");

module.exports = {
  getProductCount: () => {
    return new Promise((resolve) => {
      connection.query(
        "SELECT COUNT(*) as TotalProducts FROM products",
        (err, result) => {
          if (!err) {
            resolve(result);
          } else new Error(err);
        }
      );
    });
  },
  getAllProduct: (search, sortBy, sort, offset, limit) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT p.*, categoryName as category FROM products p INNER JOIN category c ON c.id = p.categoryId WHERE p.name LIKE CONCAT('%',?,'%') ORDER BY ${sortBy} ${sort} LIMIT ?, ?`,
        [search, offset, limit],
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

  getAllWithRedis: () => {
    // (SELECT COUNT(*) FROM products) AS TotalProducts,
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT p.*, categoryName as category FROM products p INNER JOIN category c ON c.id = p.categoryId`,
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

  getProductbyID: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT p.*, c.categoryName as category FROM products p INNER JOIN category c ON c.id = p.CategoryId WHERE p.id = ${id}`,
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

  addProduct: (data) => {
    return new Promise((resolve, reject) => {
      connection.query(`INSERT INTO products set ?`, data, (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      });
    });
  },
  updateProduct: (id, data) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE products SET ? WHERE id = ?",
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
  deleteProduct: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "DELETE FROM products WHERE id = ?",
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
