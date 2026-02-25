const CustomErrorhandler = require("../error/custom-error.handler");
const BookSchema = require("../schema/book.schema")

const getAllBooks = async (req, res) => {
    try {
        const book = await BookSchema.find().populate("authorInfo", "-_id fullName birthDate")
        res.status(200).json(book);
    }catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const getOneBook = async (req, res) => {
    try {
        const { id } = req.params

        const foundedBook = await BookSchema.findById(id).populate("authorInfo", "-_id fullName birthDate")

        if (!foundedBook) {
            throw CustomErrorhandler.NotFound("Book not found") 
        }

        res.status(200).json(foundedBook)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const addBook = async (req, res) => {
    try {
        const { title, publishedYear, publishedHome, description, period, genre, pages, imageUrl, authorInfo } = req.body

        const newBook = await BookSchema.create({
            title, 
            publishedYear, 
            publishedHome, 
            description,
            period,
            genre, 
            pages, 
            imageUrl,
            authorInfo 
        })

        res.status(201).json(newBook);

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const updateBook = async (req, res) => {
    try {
        const { id } = req.params
        const { title, publishedYear, publishedHome, description, genre, pages, imageUrl, authorInfo } = req.body;

        const foundedBook = await BookSchema.findById(id)

        if (!foundedBook) {
            throw CustomErrorhandler.NotFound("Book not found") 
        }

        await BookSchema.findByIdAndUpdate(id, {title, publishedYear, publishedHome, description, genre, pages, imageUrl, authorInfo})


        res.status(200).json(foundedBook);
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const deleteBook = async (req, res) => {
    try {
        const { id } = req.params
        const deletedBook = await BookSchema.findByIdAndDelete(id);

        if (!deletedBook) {
            throw CustomErrorhandler.NotFound("Book not found") 
        }

        res.status(200).json(deletedBook);
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {
    getAllBooks,
    getOneBook,
    addBook,
    updateBook,
    deleteBook
}