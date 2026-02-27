const joi = require("joi")

const bookValidator = (data) => {
    const schema = joi.object({
        title: joi.string().min(3).max(150).required,
        pages: joi.number().integer().min(3).max(5000).required,
        publishedYear: joi.number().max("now").required,
        publishedHome: joi.string().required,
        description: joi.string().min(20).max(500).required,
        period: joi.string().valid("Temuriylar davri", "Sovet davri", "Jadid davri", "Mustaqillik davri").required,
        genre: joi.string().valid("Horror", "Fantasy", "Sience-fiction", "Historical", "Comedy", "Romance", "Thriller").required,
        imageUrl: joi.string().required,
        authorInfo: joi.string().required
    })

    return schema.validate(data)
} 

module.exports = bookValidator