const CustomErrorhandler = require("../error/custom-error.handler");
const iqtibosValidator = require("../validator/iqtibos.validate");


module.exports = function(req, res, next) {
    const {error} = iqtibosValidator(req.body)

    if (error) {
        throw CustomErrorhandler.BadRequest(error.message)
    }

    next()
};