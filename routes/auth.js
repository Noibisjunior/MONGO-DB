const {register,login, registerPage,loginPage, dashboard} = require('../controller/auth')
const express = require('express')
const router = express.Router()

//creating a post route
router.route('/register').post(register)
router.route('/login').post(login)

//creating a get route
router.route('/register').get(registerPage);
router.route('/login').get(loginPage);
router.route('/dashboard').get(dashboard);
module.exports = router