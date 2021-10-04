/* eslint-disable no-undef */
const address = require('../models/address');
const helper = require('../helper/response');

module.exports = {
  createAddress: async (req, res) => {
    const data = {
      id_user: req.body.id_user,
      name_address: req.body.name_address,
      name_recipient: req.body.name_recipient,
      phone_recipient: req.body.phone_recipient,
      address: req.body.address,
      postal_code: req.body.postal_code,
      city: req.body.city,
      primary_address: req.body.primary_address ? req.body.primary_address : null,
      created_at: new Date(),
    };

    await address
      .createAddress(data)
      .then(() => {
        helper.response(res, 'Sukses', data, 200);
      })
      .catch((err) => {
        helper.response(res, err.message, null, 500);
      });
  },
  getItemAddress: (req, res) => {
    const id = req.id;
    address
      .getItemAddress(id)
      .then((result) => {
        helper.response(res, 'sukses', result, 200);
      })
      .catch((err) => {
        helper.response(res, err.message, null, 500);
      });
  },
  updateAddress: (req, res) => {
    const { id_user, name_address, name_recipient, phone_recipient, address, postal_code, city, primary_address } =
      req.body;
    const id = req.params.id;

    const newData = {
      id_user,
      name_address,
      name_recipient,
      phone_recipient,
      address,
      postal_code,
      city,
      primary_address,
    };
    address
      .updateAddress(id, newData)
      .then(() => {
        helper.response(res, 'sukses', newData, 200);
      })
      .catch((err) => {
        helper.response(res, err.message, null, 500);
      });
  },
};
