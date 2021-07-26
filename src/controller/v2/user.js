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
    console.log(user, "cek user");
    if (user.length > 0) {
      return helper.response(res, "email sudah ada", null, 401);
    }
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
        // Store hash in your password DB.
        const data = {
          id: uuidv4(),
          name: name,
          email: email,
          roles: "custommer",
          password: hash,
          status: "inactive",
        };

        jwt.sign(
          { email: data.email },
          process.env.SECRET_KEY,
          { expiresIn: "1h" },
          (err, res) => {
            if (err) {
              res.send("failed");
            } else {
              console.log(res, " cek");
              let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 323,
                secure: false, // use SSL
                auth: {
                  user: "badkrmaa@gmail.com", // username for your mail server
                  pass: "Kiddies45", // password
                },
              });
              let activeEmail = `<div>
              <p>Follow link for activation</p>
              <a href="http://localhost:4000/v2/auth/actived/${res}">click</a>
              </div>`;
              transporter.sendMail({
                from: `👻 badkrmaa@gmail.com`, // sender address
                to: data.email, // list of receivers
                subject: "Activation email ✔", // Subject line
                html: activeEmail, // html body
              });
            }
          }
        );
        users
          .register(data)
          .then(() => {
            delete data.password;

            helper.response(
              res,
              "Register Succues and need activation",
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
  login: async (req, res) => {
    const { email, password } = req.body;
    const result = await userModels.findUser(email);
    const user = result[0];
    bcrypt.compare(password, user.password, function (err, resCompare) {
      if (!resCompare) {
        return helpers.response(res, null, 401, { message: "password wrong" });
      }
      // generate token
      jwt.sign(
        { email: user.email, role: "1" },
        process.env.SECRET_KEY,
        { expiresIn: "24h" },
        function (err, token) {
          console.log(token);
          console.log(process.env.SECRET_KEY);
          delete user.password;
          user.token = token;
          helper.response(res, user, 200);
        }
      );
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
          .then((result) => {
            helper.response(res, "Activation Succes", result);
          })
          .catch((error) => {
            helper.response(res, error.message);
          });
      }
    });
  },
};
