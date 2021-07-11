const connection = require("../confiq/db")

module.exports = {
    getAllCategory: () => {
        return new Promise((resolve, reject) => {
            // connection.query(`SELECT id, categoryName as category, image FROM category`, (error, result) => {
                connection.query(`SELECT o.*, categoryName as category FROM order_seller o INNER JOIN category c ON c.id = p.categoryId WHERE p.name LIKE CONCAT('%',?,'%') ORDER BY ${sortBy} ${sort} LIMIT ?, ?`, [search, offset, limit], (error, result) => {
               
                if (!error) {
                    resolve(result);
                } else {
                    reject(new Error(error));
                }
            })
        })
    },
    getOrderbyID: (id) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT id, categoryName as category, image FROM category WHERE ID = ${id}`, (error, result) => {
                if (!error) {
                    resolve(result)
                } else {
                    reject((error))
                }
            })
        })
    },
    addOrder: (data) => {
        return new Promise((resolve, reject) => {
            connection.query(`INSERT INTO order_seller set ?`, data, (error, result) => {
                if (!error) {
                    resolve(result)
                } else {
                    reject((error))
                }
            })
        })
    },
    updateOrder: (id, data) => {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE order_seller SET ? WHERE id = ?', [data, id], (error, result) => {
                if (!error) {
                    resolve(result)
                } else {
                    reject(error)
                }
            })
        })
    },
    deleteOrder: (id) => {
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM order_seller WHERE id = ?', id, (error, result) => {
                if (!error) {
                    resolve(result)
                } else {
                    reject(error)
                }
            })
        })
    }
}

