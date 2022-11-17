/* focus
1. create a schema for other user fields(username and password) done
2.hash the submitted password using bcrypt module done
3.create a compare password using bcrypt.compare done but install bcrypt
4.create express-handle-bars to create a dynamic web application done but install express
5.display a visual error message using render method done
6.create a nodemailer to send an email to successful registerd users*/ 

require('dotenv').config()

const express = require('express');
const app = express();
const port = 5000
const connectDB = require('./DATABASE/connect');
const router = require('./routes/auth');
const {engine} = require('express-handlebars');
const path = require('path');
// app.use(express.static('public'))
app.use('/public', express.static(path.join(__dirname, 'public')));
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.use('/', router)
// app.use('landingpage')
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server is listening on port ${port}`
    ))
  }
   catch (error) {
    console.log(error);
  }
};





start();