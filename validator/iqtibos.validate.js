const joi = require("joi")

const iqtibosValidator = (data) => {
    const schema = joi.object({
        text: joi.string().min(3).max(500).required(),
        added_by: joi.string().required()
    })

    return schema.validate(data)
} 

module.exports = iqtibosValidator