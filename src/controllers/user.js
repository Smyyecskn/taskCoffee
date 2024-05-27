"use strict";

const User = require("../models/user");
const sendMail = require("../helpers/sendMail");

module.exports = {
  list: async (req, res) => {
    /*
      #swagger.tags = ["Users"]
      #swagger.summary = "List Users"
      #swagger.description = `
      You can send query with endpoint for filter[], search[], sort[], page and limit.
      <ul> Examples:
      <li>URL/?<b>filter[field1]=value1&filter[field2]=value2</b></li>
      <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
      <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
      <li>URL/?<b>page=2&limit=1</b></li>
      </ul>
      `
    */
    // //!Admin olmayan sadece kendi kayıtlarını görebilir.
    // const customFilters = req.user?.isAdmin ? {} : { _id: req.user.id };

    const data = await res.getModelList(User);
    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(User),
      data,
    });
  },

  // CRUD:

  create: async (req, res) => {
    /*
     #swagger.tags = ["Users"]
     #swagger.summary = "Create User"
    */

    // req.body.isAdmin = false;

    const data = await User.create(req.body);

    // /* SendMail *
    sendMail(
      data.email, // to
      "Welcome", // subject
      `
                <p>Welcome</p>
                <h1>,Hello ${data.username} Welcome to Coffee Store ☕</h1>
                
            `
    );
    res.status(201).send({
      error: false,
      data,
    });
  },

  read: async (req, res) => {
    /*
      #swagger.tags = ["Users"]
      #swagger.summary = "Get Single User"
    */

    // Manage only self-record.
    const customFilters = req.user?.isAdmin
      ? { _id: req.params.id }
      : { _id: req.user.id };

    const data = await User.findOne(customFilters);
    res.status(200).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {
    /*
      #swagger.tags = ["Users"]
      #swagger.summary = "Update User"
        #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "username": "user1",
                    "password": "Aa?123456",
                    "email": "user1@gmail.com",
                    "firstName": "user1",
                    "lastName": "user1",
                }
    */

    //!Sadece kendi kaydını GÜNCELLEYEBİLİR
    const customFilters = req.user?.isAdmin
      ? { _id: req.params.id }
      : { _id: req.user.id };

    //!admin değilse admin durumunu DEĞİŞTİREMEZ.
    if (!req.user?.isAdmin) {
      delete req.body.isAdmin;
    }
    const data = await User.updateOne(customFilters, req.body, {
      runValidators: true,
    });
    res.status(202).send({
      error: false,
      deletebody: req.body,
      data,
      new: await User.findOne(customFilters),
    });
  },

  delete: async (req, res) => {
    //!Sadece kendi kaydını SİLEBİLİR.
    /*
      #swagger.tags = ["Users"]
      #swagger.summary = "Delete User"
    */

    // if (req.params.id != req.user._id) {
    const data = await User.deleteOne({ _id: req.params.id });
    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
    // } else {
    //   // Admin kendini silemez.
    //   res.errorStatusCode = 403;
    //   throw new Error("You can not remove your account.");
    // }
  },
};
