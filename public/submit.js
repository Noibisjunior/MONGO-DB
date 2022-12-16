// const nodemailer = require('nodemailer')
//  const button = document.getElementsByClassName('btn btn-dark btn-md');
//  button.addEventListener('click',()=>{
//   const transport = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: process.env.EMAIL,
//       pass: process.env.PASS, //follow the 2-step-verification process to get the password
//     },
//   });

//   const mailOptions = {
//     from: 'Abdulsalaamnoibi1@gmail.com',
//     to: req.body.email,
//     subject: 'NOIBISDEV CODING BOOTCAMP',
//     text: 'Welcome To Our Coding Bootcamp,At NOIBISDEV we ensure that every student maximize their potentials by learning from our bootcamp training',
//   };

//   transport.sendMail(mailOptions, (err, info) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log('please check,we just sent you an email' + info.response);
//     }
//   });
//  })
// // function submit() {
// //     // alert('your Email has being received successfully')const transport = nodemailer.createTransport({
// // const transport = nodemailer.createTransport({
// //   service: 'gmail',
// //   auth: {
// //     user: process.env.EMAIL,
// //     pass: process.env.PASS, //follow the 2-step-verification process to get the password
// //   },
// // });

// // const mailOptions = {
// //   from: 'Abdulsalaamnoibi1@gmail.com',
// //   to: req.body.email,
// //   subject: 'NOIBISDEV CODING BOOTCAMP',
// //   text: 'Welcome To Our Coding Bootcamp,At NOIBISDEV we ensure that every student maximize their potentials by learning from our bootcamp training',
// // };

// // transport.sendMail(mailOptions, (err, info) => {
// //   if (err) {
// //     console.log(err)
// //   } else {
// //     console.log('please check,we just sent you an email' + info.response);
// //   }
// // });
// // }
// // submit()
// // // function form() {
// // //   alert('You have successfully registered on our coding bootcamp');
// // // }