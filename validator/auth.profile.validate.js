const joi = require("joi")

const profileInfoValidator = (data) => {
    const schema = joi.object({
        firstName: joi.string().min(2).max(50).pattern(new RegExp(/^[a-zA-Z\s]+$/)).optional(),
        lastName: joi.string().min(2).max(50).pattern(new RegExp(/^[a-zA-Z\s]+$/)).optional(),
        phoneNumber: joi.string().pattern(new RegExp(/^[\d\+\-\s\(\)]+$/)).min(5).max(20).optional()
    })

    return schema.validate(data)
}

module.exports = profileInfoValidator
