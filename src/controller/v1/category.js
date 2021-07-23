/* eslint-disable no-undef */
const category = require("../../models/v1/category");
const helper = require("../../helper/response");

module.exports = {
  getCategory: (req, res) => {
    category
      .getAllCategory()
      .then((result) => {
        helper.response(res, "OK", result);
      })
      .catch((err) => {
        console.log(err);
        helper.response(res, null, 404, "Data Not Found");
      });
  },
  getCategorybyID: (req, res) => {
    const id = req.params.id;
    const page = parseInt(req.query.page) || 1;
    // const search = req.query.search || "";
    // const sortBy = req.query.sortBy || "categoryid";
    // const sort = req.query.sort || "ASC";
    const limit = parseInt(req.query.limit) || 15;
    const offset = (page - 1) * limit;
    category
      .getCategorybyID(id)
      .then(() => {
        category.getProductCount().then((result) => {
          let total = result[0].TotalProducts;
          const prevPage = page === 1 ? 1 : page - 1;
          const nextPage = page === total ? total : page + 1;
          console.log(offset);
          console.log(result);
          console.log(total);
          category
            .getProductbyCategory(
              id,
              //   search,
              //   sortBy,
              //   sort,
              offset,
              limit
            )
            .then((data) => {
              let pageDetail = {
                total: Math.ceil(total),
                per_page: limit,
                current_page: page,
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
                // console.log(data);
              } else {
                helper.responsePagination(
                  res,
                  "Data is nut found",
                  404,
                  true,
                  pageDetail,
                  data
                );
              }
            })
            .catch((error) => {
              helper.response(res, null, 404, error);
              // console.log(error);
            });
        });
      })
      .catch((err) => {
        helper.response(res, null, 404, err);
        console.log(err);
      });
  },
  addCategory: (req, res) => {
    const data = {
      categoryName: req.body.categoryName,
      image: req.body.image,
      createdAt: new Date(),
    };
    category
      .addCategory(data)
      .then(() => {
        helper.response(res, "Succes input category", data, 200);
      })
      .catch((error) => {
        helper.response(res, "Error input category", null, 410);
        console.log(error);
      });
  },
  updateCategory: (req, res) => {
    const id = req.params.id;
    const data = {
      categoryName: req.body.categoryName,
      modifiedAt: new Date(),
    };
    category
      .updateCategory(Number(id), data)
      .then((res) => {
        helper.response(res, "Success update category");
      })
      .catch((err) => {
        console.log(err);
        helper.response(res, null, 404, err);
      });
  },
  deleteCategory: (req, res) => {
    const id = req.params.id;
    category
      .deleteCategory(Number(id))
      .then((res) => {
        helper.response(res, "Success delete category");
      })
      .catch((err) => {
        console.log(err);
        helper.response(res, null, 404, "Id cateogry for delete No found");
      });
  },
};
