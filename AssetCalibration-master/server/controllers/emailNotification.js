const nodemailer = require("nodemailer");

const sendMail = async (req, res) => {
  email = req.body.email;
  password = req.body.password;
  receiver = req.body.receiver;
  subject = req.body.subject;
  text = req.body.text;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: email,
      pass: password,
    },
    tls: { rejectUnauthorized: false },
  });

  let mailOption = {
    from: "AssetCalibrationSystemCOMP231@gmail.com",
    to: receiver,
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOption, (err, success) => {
    if (err) {
      return res.status(404).json({
        message: "err",
      });
    } else {
      return res.status(200).json({
        message: "email sent",
      });
    }
  });
};
module.exports = {
  sendMail,
};
