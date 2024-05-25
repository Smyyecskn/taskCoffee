"use strict";

// Coffee Controller:

const Coffee = require("../models/coffee");

module.exports = {
  list: async (req, res) => {
    /*
            #swagger.tags = ["Coffees"]
            #swagger.summary = "List Coffees"
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

    const data = await res.getModelList(Coffee);

    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Coffee),
      data,
    });
  },

  // CRUD:

  create: async (req, res) => {
    /*
            #swagger.tags = ["Coffees"]
            #swagger.summary = "Create Coffee"
        */

    const data = await Coffee.create(req.body);

    res.status(201).send({
      error: false,
      data,
    });
  },

  read: async (req, res) => {
    /*
            #swagger.tags = ["Coffees"]
            #swagger.summary = "Get Single Coffee"
        */

    const data = await Coffee.findOne({ _id: req.params.id });

    res.status(200).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {
    /*
            #swagger.tags = ["Coffees"]
            #swagger.summary = "Update Coffee"
        */

    const data = await Coffee.updateOne({ _id: req.params.id }, req.body, {
      runValidators: true,
    });

    res.status(202).send({
      error: false,
      data,
      new: await Coffee.findOne({ _id: req.params.id }),
    });
  },

  delete: async (req, res) => {
    /*
            #swagger.tags = ["Coffees"]
            #swagger.summary = "Delete Coffee"
        */

    const data = await Coffee.deleteOne({ _id: req.params.id });

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
};
