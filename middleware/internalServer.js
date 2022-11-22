const { StatusCodes } = require('http-status-codes');

const InternalServerError = (req, res) => {
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).render('500');
};
module.exports = InternalServerError;
