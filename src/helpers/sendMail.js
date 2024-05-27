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

  //! MAİL GÖNDERME
  transporter.sendMail(
    {
      // from: 'smyyeoztrk43@gmail.com',
      to: to,
      subject: subject,
      text: message,
      html: message,
    },
    (error, success) => console.log(success, error)
  );
};
