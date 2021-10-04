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

    const { name_address, name_recipient, phone_recipient, address, postal_code, city } = data;
    if (!name_address) return helper.response(res, "Name Address can't be null!", null, 400);
    if (!name_recipient) return helper.response(res, "Name Recipient can't be null!", null, 400);
    if (!phone_recipient) return helper.response(res, "Phone can't be null!", null, 400);
    if (!address) return helper.response(res, "Address can't be null!", null, 400);
    if (!postal_code) return helper.response(res, "Postal Code can't be null!", null, 400);
    if (!city) return helper.response(res, "City can't be null!", null, 400);

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
