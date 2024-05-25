"use strict";
/* -------------------------------------------------------*/

//Order Controller:

const Order = require("../models/order");
const Coffee = require("../models/coffee");
const sendMail = require("../helpers/sendMail");

module.exports = {
  list: async (req, res) => {
    /*
            #swagger.tags = ["Orders"]
            #swagger.summary = "List Orders"
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

    //! Kullanıcı sadece kendi siparişini değiştirebilir.
    let customFilter = { _id: req.params.id };
    if (!req.user.isAdmin) {
      customFilter = { _id: req.user._id };
    }

    const data = await res.getModelList(Order, customFilter, ['userId', 'CoffeeId'])
    // const data = await res.getModelList(Order, ...customFilter, [
    //   "userId",
    //   "coffeeId",
    // ]);

    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Order, customFilter),
      data,
    });
  },

  // CRUD:

  create: async (req, res) => {
    /*
            #swagger.tags = ["Orders"]
            #swagger.summary = "Create Order"
        */

    // userId verisini req.user'dan al:
    req.body.userId = req.user._id;

    // coffee fıyatı yoksa Coffee tablosundan al:
    if (!req.body?.price) {
      const CoffeeData = await Coffee.findOne({ _id: req.body.coffeeId });
      req.body.price = CoffeeData.price;
    }
    // Güncel ürün bilgisini al:
    const currentCoffee = await Coffee.findOne({ _id: req.body.coffeeId });

    if (currentCoffee.quantity >= req.body.quantity) {
      // Create:
      const data = await Order.create(req.body);

      // Satış sonrası güncel stok adedini azalt:
      const updateCoffee = await Coffee.updateOne(
        { _id: data.coffeeId },
        { $inc: { quantity: -data.quantity } }
      );

      res.status(201).send({
        error: false,
        data,
      });
    } else {
      res.errorStatusCode = 422;
      throw new Error("There is not enough coffee-quantity for this order.", {
        cause: { currentCoffee },
      });
    }

    /* SendMail */ //!Kullanıcıya mail gönderdik.
    sendMail(
      data.email, // to
      "Siparişiniz alındı.", // subject
      // Message
      `
                <p>Siparişiniz alındı☕☕☕</p>
    `
    );
  },

  read: async (req, res) => {
    /*
            #swagger.tags = ["Orders"]
            #swagger.summary = "Get Single Order"
        */

    // Manage only self-record.
    let customFilter = {};
    if (!req.user.isAdmin) {
      customFilter = { userId: req.user.id };
    }

    const data = await Order.findOne({
      //bir başka kullanıcının siparişlerini görmesin diye.
      _id: req.params.id,
      ...customFilter,
    }).populate(["userId", "coffeeId"]);

    res.status(200).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {
    /*
            #swagger.tags = ["Orders"]
            #swagger.summary = "Update Order"
        */
    if (req.body?.quantity) {
      // mevcut adet bilgisini al:
      const currentOrder = await Order.findOne({ _id: req.params.id });
      // farkı bul:
      const difference = req.body.quantity - currentOrder.quantity;
      // farkı kaydet:
      const updateCoffee = await Coffee.updateOne(
        { _id: currentOrder.coffeeId, quantity: { $gte: difference } },
        { $inc: { quantity: -difference } }
      );
      // console.log(updateCoffee)

      // Update işlemi olmamışsa, hata verdir. hata verince sistem devam etmeyecektir:,
      if (updateCoffee.modifiedCount == 0) {
        res.errorStatusCode = 422;
        throw new Error("There is not enough coffee-quantity for this Order.");
      }
    }

    const data = await Order.updateOne({ _id: req.params.id }, req.body, {
      runValidators: true,
    });

    res.status(202).send({
      error: false,
      data,
      new: await Order.findOne({ _id: req.params.id }),
    });
  },
  delete: async (req, res) => {
    /*
            #swagger.tags = ["Orders"]
            #swagger.summary = "Delete Order"
        */

    // mevcut adet bilgisini al:
    const currentOrder = await Order.findOne({ _id: req.params.id });

    // Delete:
    const data = await Order.deleteOne({ _id: req.params.id });

    // Adeti Coffee'dan arttır:iade işleminde
    const updateCoffee = await Coffee.updateOne(
      { _id: currentOrder.coffeeId },
      { $inc: { quantity: +currentOrder.quantity } }
    );

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
};
