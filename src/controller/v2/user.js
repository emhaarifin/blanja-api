/* eslint-disable no-undef */
const users = require("../../models/v2/user");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const helper = require("../../helper/response");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

module.exports = {
  registerCus: async (req, res) => {
    const { name, email, password } = req.body;
    const user = await users.findUser(email);
    if (user.length > 0) {
      return helper.response(res, "email sudah ada", null, 401);
    }
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
        const data = {
          id: uuidv4(),
          name: name,
          email: email,
          roles: "custommer",
          password: hash,
          status: "inactive",
        };
        users
          .register(data)
          .then(() => {
            jwt.sign(
              { email: data.email },
              process.env.SECRET_KEY,
              { expiresIn: "1h" },
              (err, res) => {
                if (err) {
                  res.send("failed");
                } else {
                  let transporter = nodemailer.createTransport({
                    service: "gmail", // use SSL
                    auth: {
                      user: "blanja.check@gmail.com", // username for your mail server
                      pass: "anymxizeuxchgdri", // password
                    },
                  });
                  let activeEmail = `<div>
                  <p>Follow link for activation</p>
                  <a href="http://localhost:4000/v2/auth/actived/${res}">click</a>
                  </div>`;
                  transporter.sendMail({
                    from: `Blanja`, // sender address
                    to: data.email, // list of receivers
                    subject: "Activation email", // Subject line
                    html: activeEmail, // html body
                  });
                }
              }
            );
            delete data.password;

            helper.response(
              res,
              "Register Success and need activation",
              data,
              200
            );
          })
          .catch(() => {
            helper.response(res, "internal server error", null, 500);
          });
      });
    });
  },
  registerSeller: async (req, res) => {
    const { name, email, password, store_name, phone_number } = req.body;
    const user = await users.findUser(email);
    if (user.length > 0) {
      return helper.response(res, "email sudah ada", null, 401);
    }
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
        const data = {
          id: uuidv4(),
          name: name,
          email: email,
          roles: "seller",
          phone_number: phone_number,
          password: hash,
          status: "inactive",
        };
        users
          .register(data)
          .then(async () => {
            delete data.password;
            jwt.sign(
              { email: data.email },
              process.env.SECRET_KEY,
              { expiresIn: "1h" },
              (err, res) => {
                if (err) {
                  res.send("failed");
                } else {
                  let transporter = nodemailer.createTransport({
                    service: "gmail", // use SSL
                    auth: {
                      user: "blanja.check@gmail.com", // username for your mail server
                      pass: "anymxizeuxchgdri", // password
                    },
                  });
                  let activeEmail = `<div>
                <p>Follow link for activation</p>
                <a href="http://localhost:4000/v2/auth/actived/${res}">click</a>
                </div>`;
                  transporter.sendMail({
                    from: `Blanja`, // sender address
                    to: data.email, // list of receivers
                    subject: "Activation email", // Subject line
                    html: activeEmail, // html body
                  });
                }
              }
            );
            const store = {
              id: uuidv4(),
              store_name: store_name,
              user_id: data.id,
            };
            await users
              .addStore(store)
              .then(() => {
                helper.response(
                  res,
                  "Register Success and need activation",
                  data,
                  200
                );
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
    try {
      const checkUser = await users.findUser(req.body.email);
      if (checkUser.length > 0) {
        const checkPassword = await bcrypt.compare(
          req.body.password,
          checkUser[0].password
        );
        if (checkPassword) {
          const { id, name, roles, avatar } = checkUser[0];
          const payload = {
            id,
            name,
            roles,
            avatar,
            ...checkUser[0],
          };
          delete payload.password;
          const token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: "1h",
          });
          const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN, {
            expiresIn: "24h",
          });
          payload.token = token;
          payload.refreshToken = refreshToken;

          helper.response(res, "Login success", payload, 200);
        } else {
          helper.response(res, "Password wrong");
        }
      } else {
        helper.response(res, "Email not found", 400);
      }
    } catch (error) {
      next(error);
    }
  },
  refreshToken: (req, res) => {
    const token = req.body.refreshToken;
    jwt.verify(token, process.env.SECRET_KEY, (err, result) => {
      const payload = {};
      delete payload.password;
      const refresh = jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: "1h",
      });
      delete payload.password;
      const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN, {
        expiresIn: "24h",
      });
      payload.token = refresh;
      payload.refreshToken = refreshToken;
      helper.response(res, "New Refresh Token", payload);
    });
  },
  activactions: (req, res) => {
    const token = req.params.token;
    jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
      if (err) {
        helper.response(res, "Activation Failed", 500);
      } else {
        const email = decode.email;
        users
          .activation(email)
          .then(() => {
            helper.response(res, "Activation Succes");
          })
          .catch((error) => {
            helper.response(res, error.message);
          });
      }
    });
  },
};
