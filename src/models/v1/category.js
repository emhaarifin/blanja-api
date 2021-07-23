/* eslint-disable no-undef */
const connection = require("../../../src/confiq/db");

module.exports = {
  getProductCount: () => {
    return new Promise((resolve) => {
      connection.query(
        "SELECT COUNT(*) as TotalProducts FROM products",
        // c.id, c.categoryName as category, c.image, p.* FROM category c INNER JOIN products p ON c.id = p.categoryId
        (err, result) => {
          if (!err) {
            resolve(result);
          } else new Error(err);
        }
      );
    });
  },
  getAllCategory: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT id, categoryName as category, image, color FROM category`,
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
  getCategorybyID: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT c.id, c.categoryName as category, c.image FROM category c WHERE c.id = ?",
        id,
        (error, result) => {
          if (!error) {
            resolve(result);
            // FROM products p INNER JOIN products p ON p.categoryId = c.id
          } else {
            reject(error);
          }
        }
      );
    });
  },
  getProductbyCategory: (id, offset, limit) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT c.id, c.categoryName as category, c.image, p.* FROM category c INNER JOIN products p ON c.id = p.categoryId WHERE c.id = ? LIMIT ?, ?`,
        [id, offset, limit],
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
  addCategory: (data) => {
    return new Promise((resolve, reject) => {
      connection.query(`INSERT INTO category set ?`, data, (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      });
    });
  },
  updateCategory: (id, data) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE category SET ? WHERE id = ?",
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
  deleteCategory: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "DELETE FROM category WHERE id = ?",
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
