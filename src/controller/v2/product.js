/* eslint-disable no-undef */
const product = require("../../models/product");
const helper = require("../../helper/response");
const redis = require("redis");
const client = redis.createClient();

module.exports = {
  getProduct: (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const search = req.query.search || "";
    const sortBy = req.query.sortBy || "id";
    const sort = req.query.sort || "ASC";
    const limit = parseInt(req.query.limit) || 15;
    const offset = (page - 1) * limit;
    product
      .getProductCount()
      .then((result) => {
        let total = result[0].TotalProducts;
        const prevPage = page === 1 ? 1 : page - 1;
        const nextPage = page === total ? total : page + 1;
        // console.log(offset);
        // console.log(result);
        // console.log(total);
        product
          .getAllProduct(search, sortBy, sort, offset, limit)
          .then((data) => {
            let pageDetail = {
              total: Math.ceil(total),
              per_page: limit,
              current_page: page,
              totalPage: Math.ceil(total / limit),
              nextLink: `http://localhost:4000${req.originalUrl.replace(
                "page=" + page,
                "page=" + nextPage
              )}`,
              prevLink: `http://localhost:4000${req.originalUrl.replace(
                "page=" + page,
                "page=" + prevPage
              )}`,
            };
            if (data[0] !== undefined) {
              client.setex("pageDetail", 60 * 60, JSON.stringify(pageDetail));
              client.setex("data", 60 * 60, JSON.stringify(data));
              helper.responsePagination(
                res,
                "OK",
                200,
                false,
                pageDetail,
                data
              );
            } else {
              helper.responsePagination(res, err, 404, true, pageDetail, data);
            }
          })
          .catch((error) => {
            helper.response(res, null, 404, error);
          });
      })
      .catch((error) => {
        helper.response(res, null, 404, error);
      });
  },

  getProductbyID: (req, res) => {
    const id = req.params.id;
    product
      .getProductbyID(id)
      .then((result) => {
        helper.response(res, "ok", result);
      })
      .catch(() => {
        // console.log(err);
        helper.response(res, null, 404, "Not Found");
      });
  },
  addProduct: (req, res) => {
    const data = {
      name: req.body.name,
      brand: req.body.brand,
      description: req.body.description,
      stock: req.body.stock,
      categoryId: req.body.categoryId,
      image: req.body.image,
      price: req.body.price,
      createdAt: new Date(),
    };
    product
      .addProduct(data)
      .then(() => {
        client.setex(`/products`, 60 * 60, JSON.stringify(data));
        helper.response(res, "Succes input data", data, 200);
      })
      .catch(() => {
        helper.response(res, "Error input data", null, 410);
        // console.log(error);
      });
  },
  updateProduct: (req, res) => {
    const id = req.params.id;
    const data = {
      name: req.body.name,
      brand: req.body.brand,
      description: req.body.description,
      stock: req.body.stock,
      categoryId: req.body.categoryId,
      image: req.body.image,
      price: req.body.price,
      modifiedAt: new Date(),
    };
    product
      .updateProduct(Number(id), data)
      .then(() => {
        helper.response(res, "Success update data");
      })
      .catch((err) => {
        // console.log(err);
        helper.response(res, null, 404, err);
      });
  },

  deleteProduct: (req, res) => {
    const id = req.params.id;
    product
      .deleteProduct(Number(id))
      .then(() => {
        helper.response(res, "Success delete product");
      })
      .catch((err) => {
        helper.response(res, 404, err);
      });
  },
};