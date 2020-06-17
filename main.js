const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const session = require('express-session');
const flash = require('connect-flash');

const app = express();
const port = process.env.PORT || 9001;

app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
  })
);

app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/', (req, res, next) => {
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
    host: 'smtp.mailtrap.io',
    port: 587,
    secure: false,
    auth: {
      user: 'd262be34a8992c', // generated ethereal user
      pass: 'cc5cf3e73fc3cb', // generated ethereal password
    },
  });

  let mailOptions = {
    from: '"glennludszuweit.de" <d262be34a8992c>', // sender address
    to: 'glenn.ludszuweit@gmail.com', // list of receivers
    subject: `Profile Message from ${req.body.email}`, // Subject line
    text: '', // plain text body
    html: output, // html body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    // res.render('index', { msg: 'Email Sent!' });
    // window.alert('Message Sent!');
    req.flash('success', 'Email sent!');
    res.redirect('/');
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
