//! Burada bir function oluştrduk. Artık user contollerda ,order contollerda (uye olunca sipariş olusturunca )kullanıcıya MAİL gönderebiliriz. AMA o sayfada da REqUiRE ETMELİYİZ.

"use strict";

const nodemailer = require("nodemailer");

module.exports = function (to, subject, message) {
  //! GMAİLE BAĞLANMA GoogleMail (gmail)
  //* Google -> AccountHome -> Security -> Two-Step-Verify -> App-Passwords
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "smyyeoztrk43@gmail.com",
      pass: "mxfn tcla ntdv hnqk",
    },
  });

  // //? YandexMail (yandex):
  // const transporter = nodemailer.createTransport({
  //     service: 'Yandex',
  //     auth: {
  //         user: 'username@yandex.com',
  //         pass: 'password' // your emailPassword
  //     }
  // })

  //! MAİL GÖNDERME
  transporter.sendMail(
    {
      // from: 'smyyeoztrk43@gmail.com',
      to: to, // 'omercoskun4369@gmail.com', 
      subject: subject, //  'Hello',
      message, // 'Hello There. How are you?',
       // '<b>Hello There.</b> <p>How are you?</p>',
    },
    (error, success) => console.log(success, error)
  );
};
