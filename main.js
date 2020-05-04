const express = require("express");
const path = require("path");
const nodemailer = require("nodemailer");
const exphbs = require("express-handlebars");

const app = express();
const port = process.env.PORT || 9000;

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.use(express.static(path.join(__dirname, "public")));

app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/send", (req, res) => {
  console.log(req.body);
  const output = `
        <p>You have a new message.</p>
        <h3>Contact Details</h3>
        <ul>
          <li>Name: ${req.body.name}</li>
          <li>Company: ${req.body.company}</li>
          <li>Email: ${req.body.email}</li>
          <li>Mobile: ${req.body.mobile}</li>
        </ul>
        <h3>Message</h3>
        <p>${req.body.message}</p>
      `;

  let transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 587,
    secure: false,
    auth: {
      user: "d262be34a8992c", // generated ethereal user
      pass: "cc5cf3e73fc3cb", // generated ethereal password
    },
  });

  let mailOptions = {
    from: '"glennludszuweit.de" <d262be34a8992c>', // sender address
    to: "glenn.ludszuweit@gmail.com", // list of receivers
    subject: `Profile Message from ${req.body.email}`, // Subject line
    text: "", // plain text body
    html: output, // html body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    res.redirect("/#contact", { msg: "Email Sent!" });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
