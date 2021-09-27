/* eslint-disable no-undef */
const address = require('../models/address');
const helper = require('../helper/response');

module.exports = {
  createAddress: (req, res) => {
    const { id_user, name_address, name_recipient, phone_recipient, address, postal_code, city, primary_address } =
      req.body;
    const data = {
      id_user,
      name_address,
      name_recipient,
      phone_recipient,
      address,
      postal_code,
      city,
      primary_address: primary_address ? primary_address : null,
      created_at: new Date(),
    };
    address
      .createAddress(data)
      .then(() => {
        helper.response(res, 'Sukses', data, 200);
      })
      .catch((err) => {
        helper.response(res, err.message, null, 500);
      });
  },
  getItemAddress: (req, res) => {
    const id = req.params.id;
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
