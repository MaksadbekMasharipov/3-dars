const CustomErrorhandler = require("../error/custom-error.handler");
const AuthorSchema = require("../schema/author.schema")

const getAllAuthors = async (req, res, next) => {
    try {
        const authors = await AuthorSchema.find()

        res.status(200).json(authors);
    }catch (error) {
        next(error)
    }
}

const search = async (req, res, next) => {
    try {
        const {searchingValue} = req.query
        const result = await AuthorSchema.find({
            fullName: {$regex: searchingValue, $options: "i" }
        })
    }catch (error) {
        next(error)
    }
}

const getOneAuthor = async (req, res, next) => {
    try {
        const { id } = req.params

        const foundedAuthor = await AuthorSchema.findById(id)

        if (!foundedAuthor) {
            throw CustomErrorhandler.NotFound("Author not found")
        }

        res.status(200).json(foundedAuthor)
    } catch (error) {
        next(error)
    }
}

const addAuthor = async (req, res, next) => {
    try {
        const { fullName, birthDate, deathDate, period, bio, work, imageUrl } = req.body

        const newAuthor = await AuthorSchema.create({
            fullName,
            birthDate,
            deathDate,
            period,
            bio,
            work,
            imageUrl
        })

        res.status(201).json(newAuthor);

    } catch (error) {
        next(error)
    }
}

const updateAuthor = async (req, res, next) => {
    try {
        const { id } = req.params
        const { fullName, birthDate, deathDate, period, bio, work, imageUrl } = req.body;

        const foundedAuthor = await AuthorSchema.findById(id)

        if (!foundedAuthor) {
            throw CustomErrorhandler.NotFound("Author not found")
        }

        foundedAuthor.fullName = fullName || foundedAuthor.fullName;
        foundedAuthor.birthDate = birthDate || foundedAuthor.birthDate;
        foundedAuthor.deathDate = deathDate || foundedAuthor.deathDate
        foundedAuthor.period = period || foundedAuthor.period
        foundedAuthor.bio = bio || foundedAuthor.bio
        foundedAuthor.work = work || foundedAuthor.work
        foundedAuthor.imageUrl = imageUrl || foundedAuthor.imageUrl
        await foundedAuthor.save();


        res.status(200).json(foundedAuthor);
    } catch (error) {
        next(error)
    }
}

const deleteAuthor = async (req, res, next) => {
    try {
        const { id } = req.params
        const deletedAuthor = await AuthorSchema.findByIdAndDelete(id);

        if (!deletedAuthor) {
            throw CustomErrorhandler.NotFound("Author not found")
        }

        res.status(200).json(deletedAuthor);
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllAuthors,
    search,
    getOneAuthor,
    addAuthor,
    updateAuthor,
    deleteAuthor
}