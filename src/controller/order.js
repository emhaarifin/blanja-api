/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const order = require('../models/order');
const helper = require('../helper/response');

module.exports = {
  getOrder: (req, res) => {
    const search = req.query.search || '';
    const sortBy = req.query.sortBy || 'id';
    const sort = req.query.sort || 'ASC';
    order
      .getAllOrder(search, sortBy, sort)
      .then((result) => {
        helper.response(res, result);
      })
      .catch((err) => {
        console.log(err);
        helper.response(res, null, 404, err);
      });
  },
  getOrderbyID: (req, res) => {
    const id = req.params.id;
    order
      .getOrderbyID(Number(id))
      .then((result) => {
        helper.response(res, result);
      })
      .catch((err) => {
        console.log(err);
        helper.response(res, null, 404, err);
      });
  },
  addOrder: (req, res) => {
    const data = {
      status_order: req.body.status_order,
      buyerName: req.body.buyerName,
      productId: req.body.productId,
      categoryId: req.body.categoryId,
    };
    order
      .addOrder(data)
      .then(() => {
        helper.response(res, 'Succes input order', data, 200);
        // console.log(result);
      })
      .catch((error) => {
        helper.response(res, 'Error input order', null, 410);
        console.log(error);
      });
  },
  updateOrder: (req, res) => {
    const id = req.params.id;
    const data = {
      status_order: req.body.status_order,
    };
    order
      .updateOrder(Number(id), data)
      .then((result) => {
        helper.response(res, 'Success update order');
      })
      .catch((err) => {
        console.log(err);
        helper.response(res, null, 404, 'Id order for update No found');
      });
  },
  deleteOrder: (req, res) => {
    const id = req.params.id;
    order
      .deleteOrder(Number(id))
      .then((result) => {
        helper.response(res, 'Success delete order');
      })
      .catch((err) => {
        console.log(err);
        helper.response(res, null, 404, 'Id order for delete No found');
      });
  },
};
