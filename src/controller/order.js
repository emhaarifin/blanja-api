/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const order = require('../models/order');
const helper = require('../helper/response');

module.exports = {
  getOrder: (req, res) => {
    const id = req.id;
    console.log(id);
    const search = req.query.search || '';
    const sortBy = req.query.sortBy || 'id';
    const sort = req.query.sort || 'ASC';
    order
      .getAllOrder(search, id, sortBy, sort)
      .then((result) => {
        console.log(result.length);
        helper.response(res, 'sukses', result, 200);
      })
      .catch((err) => {
        console.log(err);
        helper.response(res, err.message, null, 404);
      });
  },
  getOrderbyID: (req, res) => {
    const id = req.params.id;
    order
      .getOrderbyID(Number(id))
      .then((result) => {
        helper.response(res, 'ok', result, 200);
      })
      .catch((err) => {
        console.log(err);
        helper.response(res, null, 404, err);
      });
  },
  addOrder: async (req, res) => {
    try {
      const id = req.id;
      const { dataOrder, payment_method } = req.body;
      await dataOrder.map(async (item) => {
        const data = {
          qty: item.qty,
          status: 'Not yet paid',
          total: item.qty * item.price,
          user_id: id,
          category_id: item.categoryId,
          product_id: item.id,
          payment_method,
        };
        await order.addOrder(data);
      });
      return helper.response(res, 'Succes input order', 200);
    } catch (error) {
      console.log(error);
      return helper.response(res, error, null, 410);
    }
  },
  updateOrder: (req, res) => {
    const id = req.params.id;
    const data = {
      status: req.body.status,
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
        helper.response(res, err.message, null, 404);
      });
  },
};
