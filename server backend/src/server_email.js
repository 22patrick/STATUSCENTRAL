var nodemailer = require("nodemailer");

function email() {
  console.log("CHEGOU EMAIL");
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "suporte1.onevoip@gmail.com",
      pass: "invi.5040@2",
    },
  });

  var mailOptions = {
    from: "suporte1.onevoip@gmail.com",
    to: "patrick-lemo@hotmail.com",
    subject: "testando servidor Node.js",
    text: "locura deu certo!",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

email();
