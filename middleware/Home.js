const Home = (req,res,next) =>{
     res.status(401).render('home')
     next()
}

module.exports = Home