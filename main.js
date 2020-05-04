const express = require("express");
const path = require("path");
const nodemailer = require("nodemailer");

const app = express();
const port = process.env.PORT || 9000;

app.set("view engine", "ejs");
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
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "gnglab.dev@gmail.com", // generated ethereal user
      pass: "********", // generated ethereal password
    },
  });

  let mailOptions = {
    from: '"glennludszuweit.de" <gnglab.dev@gmail.com>', // sender address
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

    res.render("/");
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
