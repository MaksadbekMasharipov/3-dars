const AuthorSchema = require("../schema/author.schema")

const getAllAuthors = async (req, res) => {
    try {
        const authors = await AuthorSchema.find()
        res.status(200).json(authors);
    }catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const getOneAuthor = async (req, res) => {
    try {
        const { id } = req.params

        const foundedAuthor = await AuthorSchema.findById(id)

        if (!foundedAuthor) {
            return res.status(404).json({
                message: "Author not found"
            })
        }

        res.status(200).json(foundedAuthor)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const addAuthor = async (req, res) => {
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
        res.status(500).json({
            message: error.message
        })
    }
}

const updateAuthor = async (req, res) => {
    try {
        const { id } = req.params
        const { fullName, birthDate, deathDate, period, bio, work, imageUrl } = req.body;

        const foundedAuthor = await AuthorSchema.findById(id)

        if (!foundedAuthor) {
            return res.status(404).json({
                message: "Author not found"
            })
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
        res.status(500).json({
            message: error.message
        })
    }
}

const deleteAuthor = async (req, res) => {
    try {
        const { id } = req.params
        const deletedAuthor = await AuthorSchema.findByIdAndDelete(id);

        if (!deletedAuthor) {
            return res.status(404).json({
                message: "Author not found"
            })
        }

        res.status(200).json(deletedAuthor);
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {
    getAllAuthors,
    getOneAuthor,
    addAuthor,
    updateAuthor,
    deleteAuthor
}