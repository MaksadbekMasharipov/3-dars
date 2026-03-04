const CustomErrorhandler = require("../error/custom-error.handler")
const profileInfoValidator = require("../validator/auth.profile.validate")

module.exports = function(req, res, next) {
    const {error} = profileInfoValidator(req.body)

    if (error) {
        throw CustomErrorhandler.BadRequest(error.message)
    }

    next()
};
