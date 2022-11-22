const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authentication');


const {
  register,
  login,
  registerPage,
  loginPage,
  dashboard,
  logOut
} = require('../controller/auth');
//creating a post route
router.route('/register').post(register)
router.route('/login').post(login)

//creating a get route
router.route('/register').get(registerPage);
router.route('/login').get(loginPage);
router.route('/dashboard').get(authMiddleware,dashboard);
router.route('/logOut').get(logOut)
module.exports = router