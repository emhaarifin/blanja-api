const category = require("../models/category");
const helper = require("../helper/response");

module.exports = {
    getCategory: (req, res) => {
        category.getAllCategory()
            .then(result => {
                helper.response(res, result)
            })
            .catch((err) => {
                console.log(err)
                helper.response(res, null, 404, "Data Not Found")
            })
    },
    getCategorybyID: (req, res) => {
        const id = req.params.id
        category.getCategorybyID(Number(id))
            .then(result => {
                helper.response(res, result)
            })
            .catch((err) => {
                console.log(err)
                helper.response(res, null, 404, "Data Not Found")
            })
    },
    addCategory: (req, res) => {
        const data = {
            name: req.body.categoryName,
            createdAt: new Date()
        }
        category.addCategory(data)
            .then(() => {
                helper.response(res, "Succes input category", data, 200);
                // console.log(result);
            })
            .catch((error) => {
                helper.response(res, "Error input category", null, 410);
                console.log(error);
            })
    },
    updateCategory: (req, res) => {
        const id = req.params.id
        const data = {
            name: req.body.categoryName,
            modifiedAt: new Date()
        }
        category.updateCategory(Number(id), data)
            .then((result) => {
                helper.response(res, "Success update category", result)
            })
            .catch((err) => {
                console.log(err)
                helper.response(res, null, 404, "Id category for update No found")
            })
    },
    deleteCategory: (req, res) => {
        const id = req.params.id
        category
            .deleteCategory(Number(id))
            .then((result) => {
                helper.response(res, "Success delete category", result)
            })
            .catch((err) => {
                console.log(err)
                helper.response(res, null, 404, "Id cateogry for delete No found")
            })
    }
}