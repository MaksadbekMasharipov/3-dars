const path = require("path")
const fs = require("fs")
const BookSchema = require("../schema/book.schema")


const stream = async (req, res) => {
    try {
        const { bookId } = req.params

        foundedBook = await BookSchema.findById(bookId)

        if (!foundedBook) {
            return res.status(404).json({
                message: "book not found"
            })
        }

        if(!foundedBook.audio) {
            return res.status(404).json({
                message: "audio not found"
            })
        }
        
        const fileUrl = path.join(__dirname, "..", foundedBook.audio)
        const stat = fs.statSync(fileUrl)
        const fileSize = stat.size
        const range = req.headers.range

        if (range) {
            const parts = range.slice(6).split("-")
            const start = parseInt(parts[0], 10)
            const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1
            const result = (end - start) + 1

            res.writeHead(200, {
                "Content-Range": `bytes ${start}-${end}/${fileSize}`,
                "Accept-Ranges": "bytes",
                "Content-Length": result,
                "Content-Type": "audio/mp3"
            })

            fs.createReadStream(fileUrl, { start, end }).pipe(res)

        } else{
            res.writeHead(200, {
                "Accept-Ranges": "bytes",
                "Content-Length": fileSize,
                "Content-Type": "audio/mp3"
            })

            fs.createReadStream(fileUrl).pipe(res)
        }


    }catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = stream