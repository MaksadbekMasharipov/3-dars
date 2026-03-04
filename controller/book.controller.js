const CustomErrorhandler = require("../error/custom-error.handler");
const BookSchema = require("../schema/book.schema")
const fs = require("fs")
const path = require("path")

const getAllBooks = async (req, res) => {
    try {
        const book = await BookSchema.find()
            .populate("authorInfo", "-_id fullName birthDate")
            .populate("iqtibosInfo", "-_id text added_by")
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const getOneBook = async (req, res) => {
    try {
        const { id } = req.params

        const foundedBook = await BookSchema.findById(id)
            .populate("authorInfo", "-_id fullName birthDate")
            .populate("iqtibosInfo", "-_id text added_by")

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
        const { title, publishedYear, publishedHome, description, period, genre, pages, imageUrl, authorInfo, iqtibosInfo, audio } = req.body

        const newBook = await BookSchema.create({
            title,
            publishedYear,
            publishedHome,
            description,
            period,
            genre,
            pages,
            imageUrl,
            authorInfo,
            iqtibosInfo,
            audio
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
        const { title, publishedYear, publishedHome, description, genre, pages, imageUrl, authorInfo, iqtibosInfo, audio } = req.body;

        const foundedBook = await BookSchema.findById(id)

        if (!foundedBook) {
            throw CustomErrorhandler.NotFound("Book not found")
        }

        await BookSchema.findByIdAndUpdate(id, { title, publishedYear, publishedHome, description, genre, pages, imageUrl, authorInfo, iqtibosInfo, audio })


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

const uploadFileBook = async (req, res) => {
    try {
        const { bookId } = req.params

        foundedBook = await BookSchema.findById(bookId)

        if (!foundedBook) {
            return res.status(404).json({
                message: "book not found"
            })
        }

        if (foundedBook.audio) {
            const fileUrl = path.join(__dirname, "..", foundedBook.audio)

            if (fs.existsSync(fileUrl)) {
                fs.unlinkSync(fileUrl)
            }
        }

        const changer = req.file.path.replace(/\\/, "/")
        foundedBook.audio = changer
        foundedBook.save()

        res.status(201).json({
            message: changer
        })
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
    deleteBook,
    uploadFileBook
}