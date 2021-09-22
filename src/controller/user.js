/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const users = require('../models/user');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const helper = require('../helper/response');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
// const user = require("../../models/v2/user");

module.exports = {
  registerCus: async (req, res) => {
    const { name, email, password } = req.body;
    const user = await users.findUser(email);
    if (user.length > 0) {
      return helper.response(res, 'email sudah ada', null, 401);
    }
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
        const data = {
          id: uuidv4(),
          name: name,
          email: email,
          roles: 'custommer',
          password: hash,
          status: 'inactive',
        };
        users
          .register(data)
          .then(() => {
            jwt.sign({ email: data.email }, process.env.SECRET_KEY, { expiresIn: '1h' }, (err, res) => {
              if (err) {
                res.send('failed');
              } else {
                let transporter = nodemailer.createTransport({
                  service: 'gmail', // use SSL
                  auth: {
                    user: 'blanja.check@gmail.com', // username for your mail server
                    pass: 'anymxizeuxchgdri', // password
                  },
                });
                let activeEmail = `<div>
                  <p>Follow link for activation</p>
                  <a href="http://localhost:4000/v2/auth/actived/${res}">click</a>
                  </div>`;
                transporter.sendMail({
                  from: `Blanja`, // sender address
                  to: data.email, // list of receivers
                  subject: 'Activation email', // Subject line
                  html: activeEmail, // html body
                });
              }
            });
            delete data.password;

            helper.response(res, 'Register Success and need activation', data, 200);
          })
          .catch(() => {
            helper.response(res, 'internal server error', null, 500);
          });
      });
    });
  },
  registerSeller: async (req, res) => {
    const { name, email, password, store_name, phone_number } = req.body;
    const user = await users.findUser(email);
    if (user.length > 0) {
      return helper.response(res, 'email sudah ada', null, 401);
    }
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
        const data = {
          id: uuidv4(),
          name: name,
          email: email,
          roles: 'seller',
          phone_number: phone_number,
          password: hash,
          status: 'inactive',
        };
        users
          .register(data)
          .then(async () => {
            delete data.password;
            jwt.sign({ email: data.email }, process.env.SECRET_KEY, { expiresIn: '1h' }, (err, res) => {
              if (err) {
                res.send('failed');
              } else {
                let transporter = nodemailer.createTransport({
                  service: 'gmail', // use SSL
                  auth: {
                    user: 'blanja.check@gmail.com', // username for your mail server
                    pass: 'anymxizeuxchgdri', // password
                  },
                });
                let activeEmail = `<div>
                <p>Follow link for activation</p>
                <a href="http://localhost:4000/v2/auth/actived/${res}">click</a>
                </div>`;
                transporter.sendMail({
                  from: `Blanja`, // sender address
                  to: data.email, // list of receivers
                  subject: 'Activation email', // Subject line
                  html: activeEmail, // html body
                });
              }
            });
            const store = {
              id: uuidv4(),
              store_name: store_name,
              user_id: data.id,
            };
            await users
              .addStore(store)
              .then(() => {
                data.store = store;
                console.log(data);
                helper.response(res, 'Register Success and need activation', data, 200);
              })
              .catch((error) => {
                helper.response(res, error, null, 500);
              });
          })
          .catch((error) => {
            helper.response(res, error, null, 500);
          });
      });
    });
  },
  login: async (req, res, next) => {
    const checkUser = await users.findUser(req.body.email);
    if (checkUser.length > 0) {
      const checkPassword = bcrypt.compare(req.body.password, checkUser[0].password);
      if (checkPassword) {
        const { id, name, roles, avatar } = checkUser[0];
        console.log(typeof roles);
        if (roles === 'seller') {
          users.getStoreData(id).then((result) => {
            checkUser[0].StoreData = result;
            console.log(result);
            console.log(id);
            const payload = {
              id,
              name,
              roles,
              avatar,
              ...checkUser[0],
            };
            delete payload.email;
            delete payload.password;
            const token = jwt.sign(payload, process.env.SECRET_KEY, {
              expiresIn: '1h',
            });
            const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN, {
              expiresIn: '24h',
            });
            payload.token = token;
            payload.refreshToken = refreshToken;
            helper.response(res, 'Login success', payload, 200);
          });
        } else {
          const payload = {
            id,
            name,
            roles,
            avatar,
            ...checkUser[0],
          };
          delete payload.email;
          delete payload.password;
          const token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: '1h',
          });
          const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN, {
            expiresIn: '24h',
          });
          payload.token = token;
          payload.refreshToken = refreshToken;
          helper.response(res, 'Login success', payload, 200);
        }
      } else {
        helper.response(res, 'Password wrong', null, 401);
      }
    } else {
      helper.response(res, 'Email not found', null, 401);
    }
  },
  refreshToken: (req, res) => {
    const token = req.body.refreshToken;
    jwt.verify(token, process.env.SECRET_KEY, (err, result) => {
      const payload = {};
      delete payload.password;
      const refresh = jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: '1h',
      });
      delete payload.password;
      const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN, {
        expiresIn: '24h',
      });
      payload.token = refresh;
      payload.refreshToken = refreshToken;
      helper.response(res, 'New Refresh Token', payload);
    });
  },
  getUserByID: (req, res) => {
    const id = req.params.id;
    users
      .getUserById(id)
      .then((result) => {
        const roles = result[0].roles;
        if (roles === 'seller') {
          users
            .getStoreData(id)
            .then((data) => {
              result[0].StoreData = data;
              helper.response(res, 'ok', result);
            })
            .catch((err) => {
              helper.response(res, err.message, null, 404);
            });
        } else {
          helper.response(res, 'ok', result);
        }
      })
      .catch((err) => {
        helper.response(res, 'Not Found', null, 404);
      });
  },
  updateProfile: async (req, res) => {
    const id = req.params.id;
    const data = {
      email: req.body.email,
      phone_number: req.body.phone_number,
    };

    const checkStore = await users.findStore(id);
    if (checkStore.length > 0) {
      console.log(checkStore);
      const storeData = {
        store_name: req.body.store_name,
        store_description: req.body.store_description,
      };
      users
        .updateStoreUser(id, storeData)
        .then(() => {
          data.store_name = storeData.store_name;
          data.store_description = storeData.store_description;
          users
            .updateUser(id, data)
            .then(() => {
              helper.response(res, 'Succes Update Profile', 200);
            })
            .catch((err) => {
              helper.response(res, err.message, null, 401);
            });
        })
        .catch((err) => {
          helper.response(res, err.message, null, 400);
        });
    } else {
      const profileUser = {
        name: req.body.name,
        gender: req.body.gender,
        date_of_birth: new Date(),
      };
      data.name = profileUser.name;
      data.gender = profileUser.gender;
      data.date_of_birth = profileUser.date_of_birth;
      users
        .updateUser(id, data)
        .then(() => {
          helper.response(res, 'Success Update Profile', 200);
        })
        .catch((err) => {
          console.log(req.body);
          helper.response(res, err.message, null, 401);
        });
    }
  },
  activactions: (req, res) => {
    const token = req.params.token;
    jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
      if (err) {
        helper.response(res, 'Activation Failed', null, 401);
      } else {
        const email = decode.email;
        users
          .activation(email)
          .then(() => {
            helper.response(res, 'Activation Succes');
          })
          .catch((error) => {
            helper.response(res, error.message);
          });
      }
    });
  },
};
