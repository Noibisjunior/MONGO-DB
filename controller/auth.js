//importing the model folder
const Auth = require('../model/auth')
const nodemailer = require('nodemailer')

exports.register = async (req, res) => {
  const {email,username,password} = req.body;
  if (!email || !username || !password) {
    console.log(`please provide all the required information`);
    // return res.status(400).redirect('register.html')
    return res.status(400).render('register', {
        msg: 'please provide all the required information',
      });
  }
  //authenticating using email because it is unique to every user
  const user = await Auth.findOne({ email });

  if (user) {
    console.log('user exist');
    // return res.status(400).redirect('register.html')
    return res.status(400).render('register', { msg: 'user already exist' });
  }
  const newUser = await Auth.create({ ...req.body });
  //if user does not exist then the user will be redirected to the login route

  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'Abdulsalaamnoibi1@gmail.com',
      pass: 'mxivpkhpjtydavvj', //follow the 2-step-verification process to get the password
    },
  });

  const mailOptions = {
    from: 'Abdulsalaamnoibi1@gmail.com',
    to: req.body.email,
    subject: 'TESTING THE NODEMAILER ON MY EXPRESS APPLICATION',
    text: 'GOOD EVENING MR STEVE,MY ASSIGNMENT IS DONE AND DUSTED',
  };

  transport.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log('please check,we just sent you an email' + info.response);

      }});
    
  

  return res.status(201).redirect('login');

    
}


//creating functionality for the login route
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Auth.findOne({ email });
    if (!user) {
      console.log(`user doesn't exist`);
      return res.status(400).render('login', { msg: `user doesn't exist` });
    }
    const userExist = await user.comparePassword(password);
    if (!userExist) {
      console.log('please provide a valid password');
      return res
        .status(400)
        .render('login', { msg: 'please provide a valid password' });
    }
    return res.status(200).redirect('dashboard');
  } catch (error) {
    console.log(error);
  }
}

exports.registerPage = (req,res) => {
  return res.render('register', { title: 'REGISTER' });
}
exports.loginPage = (req,res) => {
  return res.render('login', { title: 'LOGIN' });
}
exports.dashboard = (req,res) => {
  return res.render('dashboard', { title: 'DASHBOARD' });
}
