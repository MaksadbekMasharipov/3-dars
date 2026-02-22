const BookSchema = require("../schema/book.schema")

const getAllBooks = async (req, res) => {
    try {
        const book = await BookSchema.find()
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

        const foundedBook = await BookSchema.findById(id)

        if (!foundedBook) {
            return res.status(404).json({
                message: "Book not found"
            })
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
        const { title, publishedYear, publishedHome, description, genre, pages, imageUrl } = req.body

        const newBook = await BookSchema.create({
            title, 
            publishedYear, 
            publishedHome, 
            description, 
            genre, 
            pages, 
            imageUrl
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
        const { title, publishedYear, publishedHome, description, genre, pages, imageUrl } = req.body;

        const foundedBook = await BookSchema.findById(id)

        if (!foundedBook) {
            return res.status(404).json({
                message: "Book not found" 
            })
        }

        await BookSchema.findByIdAndUpdate(id, {title, publishedYear, publishedHome, description, genre, pages, imageUrl})


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
            return res.status(404).json({
                message: "Book not found"
            })
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