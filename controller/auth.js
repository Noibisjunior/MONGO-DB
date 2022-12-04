//importing the model folder
const Auth = require('../model/auth');
const nodemailer = require('nodemailer');
const JWT = require('jsonwebtoken');
const axios = require('axios');

exports.register = async (req, res) => {
  const { email, username, password, confirmPassword } = req.body;
  if (!email || !username || !password || !confirmPassword) {
    // console.log(`please provide all the required information`);
    // return res.status(400).redirect('register.html')
    return res.status(400).render('register', {
      msg: 'please provide all the required information',
    });
  }
  //authenticating using email because it is unique to every user
  const user = await Auth.findOne({ email });

  if (user) {
    // console.log('user exist');
    // return res.status(400).redirect('register.html')
    return res.status(400).render('register', { msg: 'user already exist' });
  }
  const newUser = await Auth.create({ ...req.body });

  // if user does not exist then the user will be redirected to the login route
  const token = newUser.createJWT();
  //  console.log(token);
  res.cookie('token', token, { secure: false, httpOnly: true });

  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS, //follow the 2-step-verification process to get the password
    },
  });

  const mailOptions = {
    from: 'Abdulsalaamnoibi1@gmail.com',
    to: req.body.email,
    subject: 'NOIBISDEV CODING BOOTCAMP',
    text: 'Welcome To Our Coding Bootcamp,At NOIBISDEV we ensure that every student maximize their potentials by learning from our bootcamp training',
  }

  transport.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err)
    } else {
      console.log('please check,we just sent you an email' + info.response);
    }
  })
  return res.status(201).redirect('login');
}

//creating functionality for the login route
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Auth.findOne({ email });

    if (!user) {
      // console.log(`user doesn't exist`);
      return res.status(400).render('login', { msg: `user doesn't exist` });
    }

    const userExist = await user.comparePassword(password);
    if (!userExist) {
      // console.log('please provide a valid password');
      return res.status(400).json({ msg: 'please provide a valid password' });
    }
    const token = user.createJWT();
    // console.log(token);
    res.cookie('token', token, { secure: false, httpOnly: true });
    return res.status(200).redirect('dashboard');
  } catch (error) {
    console.log(error);
  }
};

exports.logOut = (req, res) => {
  try {
    res.clearCookie('token');
    return res.status(200).redirect('register');
  } catch (error) {
    console.log(error);
  }
};

exports.registerPage = (req, res) => {
  return res.render('register', { title: 'REGISTER' });
};
exports.loginPage = (req, res) => {
  return res.render('login', { title: 'LOGIN' });
};
exports.form = (req, res) => {
  return res.render('form', { title: 'form' });
};

exports.dashboard = async (req, res) => {
  const token = req.cookies.token;
  const payload = JWT.verify(token, process.env.JWT_SECRET);
  const username = payload.username.toString().toUpperCase();
    
const options = {
  method: 'POST',
  url: 'https://quotel-quotes.p.rapidapi.com/quotes/random',
  headers: {
    'content-type': 'application/json',
    'X-RapidAPI-Key': '10c1e18cbfmsh79e64baa6789e33p1d854cjsn7a954c28943d',
    'X-RapidAPI-Host': 'quotel-quotes.p.rapidapi.com',
  },
  data: '{}',
};
   axios
    .request(options)
    .then(function (response) {
      // console.log(response.data);
      const array = response.data.quote;
      return res.render('dashboard', {
        title: 'DASHBOARD',
        msg: username,
        msj: array,
      });
    })
    .catch(function (error) {
      console.error(error);
    });
};



























//   // const options = {
//   //   method: 'GET',
//   //   url: 'https://inspiring-quotes.p.rapidapi.com/random',
//   //   params: { author: 'Albert' },
//   //   headers: {
//   //     'X-RapidAPI-Key': '10c1e18cbfmsh79e64baa6789e33p1d854cjsn7a954c28943d',
//   //     'X-RapidAPI-Host': 'inspiring-quotes.p.rapidapi.com',
//   //   },
//   // };
//   // axios
//   //   .request(options)
//   //   .then(function (response) {
//   //     // console.log(response.data);
//   //     const array = response.data.quote;
//   //     // console.log(array)
//   //     // const T/ime = setInterval(() => array,1000)
//       return res.render('dashboard', {
//         title: 'DASHBOARD',
//         msg: username,
//         // msj: array,
//       });
//     })
//     .catch(function (error) {
//       console.error(error);
//     });
// };

// ,msg: username
