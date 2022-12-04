const authMiddleware = (req,res,next) => {
try {
    //accessing cookie from the browser
    const token = req.cookies.token
    // console.log(token);
    if(!token){
       return res.status(401).render('register')
    }
    next()
} catch (error) {
    return res.status(409).redirect('register')
}
}

module.exports = authMiddleware