"use strict";

//!token oluşturma ve login logout kısımlarını yapma.

const User = require("../models/user");
const Token = require("../models/token");
const passwordEncrypt = require("../helpers/passwordEncrypt"); //altta tokenData oluşturmak için import ettik.

module.exports = {
  login: async (req, res) => {
    /*
            #swagger.tags = ["Authentication"]
            #swagger.summary = "Login"
            #swagger.description = 'Login with username (or email) and password for get Token'
            #swagger.parameters["body"] = {
                in: "body",
                required: true,
                schema: {
                    "username": "user1",
                    "password": "User12345?",
                }
            }
        */

    const { username, email, password } = req.body;

    if ((username || email) && password) {
      const user = await User.findOne({ $or: [{ username }, { email }] });

      if (user && user.password == passwordEncrypt(password)) {
        if (user.isActive) {
          // Use UUID:
          // const { randomUUID } = require('crypto')
          // let tokenData = await Token.findOne({ userId: user._id })
          // if (!tokenData) tokenData = await Token.create({
          //     userId: user._id,
          //     token: randomUUID()
          // })

          // TOKEN:
          let tokenData = await Token.findOne({ userId: user._id });
          if (!tokenData)
            tokenData = await Token.create({
              userId: user._id,
              token: passwordEncrypt(user._id + Date.now()),
            });

          res.send({
            error: false,
            token: tokenData.token,
            user,
          });
        } else {
          res.errorStatusCode = 401;
          throw new Error("This account is not active.");
        }
      } else {
        res.errorStatusCode = 401;
        throw new Error("Wrong username/email or password.");
      }
    } else {
      res.errorStatusCode = 401;
      throw new Error("Please enter username/email and password.");
    }
  },

  logout: async (req, res) => {
    /*
            #swagger.tags = ["Authentication"]
            #swagger.summary = "Token: Logout"
            #swagger.description = 'Delete token-key.'
        */

    const auth = req.headers?.authorization || null; // Token ...tokenKey...
    const tokenKey = auth ? auth.split(" ") : null; // ['Token', '...tokenKey...']

    let message = null,
      result = {};

    if (tokenKey) {
      if (tokenKey[0] == "Token") {
        // SimpleToken

        result = await Token.deleteOne({ token: tokenKey[1] });
        message = "Token deleted. Logout was OK.";
      }
    }
    res.send({
      error: false,
      message,
      result,
    });
  },
};
