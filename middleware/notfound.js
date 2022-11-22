const {StatusCodes} = require('http-status-codes')

const notFound = (req,res) =>{
    return res.status(StatusCodes.NOT_FOUND).redirect('404')
}
module.exports = notFound