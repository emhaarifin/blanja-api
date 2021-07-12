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
            .then((result) => {
                category.getProductbyCategory(Number(id))
                .then(data => {
                    helper.response(res, result, data)
                })
            })
            .catch((err) => {
                helper.response(res, null, 404, 'Data Not Found')
                console.log(err)
            })
    },
    addCategory: (req, res) => {
        const data = {
            categoryName: req.body.categoryName,
            image: req.body.image,
            createdAt: new Date()
        }
        category.addCategory(data)
            .then(() => {
                helper.response(res, "Succes input category", data, 200);
            })
            .catch((error) => {
                helper.response(res, "Error input category", null, 410);
                console.log(error);
            })
    },
    updateCategory: (req, res) => {
        const id = req.params.id
        const data = {
            categoryName: req.body.categoryName,
            modifiedAt: new Date()
        }
        category.updateCategory(Number(id), data)
            .then((result) => {
                helper.response(res, "Success update category")
            })
            .catch((err) => {
                console.log(err)
                helper.response(res, null, 404, err)
            })
    },
    deleteCategory: (req, res) => {
        const id = req.params.id
        category
            .deleteCategory(Number(id))
            .then((result) => {
                helper.response(res, "Success delete category")
            })
            .catch((err) => {
                console.log(err)
                helper.response(res, null, 404, "Id cateogry for delete No found")
            })
    }
}