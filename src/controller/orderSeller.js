const orderSeller = require("../models/orderSeller");
const helper = require("../helper/response");

module.exports = {
    // getCategory: (req, res) => {
    //     category.getAllCategory()
    //         .then(result => {
    //             helper.response(res, result)
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //             helper.response(res, null, 404, "Data Not Found")
    //         })
    // },
    // getCategorybyID: (req, res) => {
    //     const id = req.params.id
    //     category.getCategorybyID(Number(id))
    //         .then(result => {
    //             helper.response(res, result)
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //             helper.response(res, null, 404, "Data Not Found")
    //         })
    // },
    addOrder: (req, res) => {
        const data = {
            status_order: req.body.status_order,
            buyerName: req.body.buyerName,
            productId: req.body.productId,
            categoryId: req.body.categoryId
        }
        orderSeller.addOrder(data)
            .then(() => {
                helper.response(res, "Succes input order", data, 200);
                // console.log(result);
            })
            .catch((error) => {
                helper.response(res, "Error input order", null, 410);
                console.log(error);
            })
    },
    updateOrder: (req, res) => {
        const id = req.params.id
        const data = {
            status_order: req.body.status_order
        }
        orderSeller.updateOrder(Number(id), data)
            .then((result) => {
                helper.response(res, "Success update order", result)
            })
            .catch((err) => {
                console.log(err)
                helper.response(res, null, 404, "Id order for update No found")
            })
    },
    deleteOrder: (req, res) => {
        const id = req.params.id
        orderSeller.deleteOrder(Number(id))
            .then((result) => {
                helper.response(res, "Success delete order", result)
            })
            .catch((err) => {
                console.log(err)
                helper.response(res, null, 404, "Id order for delete No found")
            })
    }
}