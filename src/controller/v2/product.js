/* eslint-disable no-undef */
const product = require("../../models/v2/product");
const helper = require("../../helper/response");
const redis = require("redis");
const client = redis.createClient();
const path = require("path");
const fs = require("fs");
const dirPath = path.join(__dirname, "../../../uploads");

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

    product
      .getAllWithRedis()
      .then((resRedist) => {
        client.setex("data", 60 * 60, JSON.stringify(resRedist));
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
        client.setex(`product/${id}`, 60 * 60, JSON.stringify(result));
        helper.response(res, "ok", result);
      })
      .catch(() => {
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
      image: `${process.env.BASE_URL}/file/${req.file.filename}`,
      price: req.body.price,
      createdAt: new Date(),
    };
    product
      .addProduct(data)
      .then(() => {
        helper.response(res, "Succes input data", data, 200);
      })
      .catch((err) => {
        fs.unlink(`${dirPath}/${req.file.filename}`, (err) => {
          if (err) {
            console.log("Error unlink image product!" + err);
          }
        });
        helper.response(res, err.message, null, 410);
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
      price: req.body.price,
      modifiedAt: new Date(),
    };

    if (req.file) {
      data.image = `${process.env.BASE_URL}/file/${req.file.filename}`;
      product
        .updateProduct(Number(id), data)
        .then(() => {
          helper.response(res, "Success update data");
        })
        .catch((err) => {
          helper.response(res, null, 404, err);
        });
      helper.response(res, "Success update data");
    } else {
      product
        .updateProduct(Number(id), data)
        .then(() => {
          helper.response(res, "Success update data");
        })
        .catch((err) => {
          helper.response(res, null, 404, err);
        });
    }
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
