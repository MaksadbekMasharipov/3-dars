const joi = require("joi")

const bookValidator = (data) => {
    const schema = joi.object({
        title: joi.string().min(3).max(150).required(),
        pages: joi.number().integer().min(3).max(5000).required(),
        publishedYear: joi.number().integer().min(1000).max(new Date().getFullYear()).required(),
        publishedHome: joi.string().required(),
        description: joi.string().min(20).max(500).required(),
        period: joi.string().valid("Temuriylar davri", "Sovet davri", "Jadid davri", "Mustaqillik davri").required(),
        genre: joi.string().valid("Horror", "Fantasy", "Sience-fiction", "Historical", "Comedy", "Romance", "Thriller").required(),
        imageUrl: joi.string().uri().required(),
        authorInfo: joi.string().hex().length(24).required(),
        iqtibosInfo: joi.string().hex().length(24).optional()
    })

    return schema.validate(data)
} 

module.exports = bookValidator