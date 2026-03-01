const { Schema, model } = require("mongoose");

const Book = new Schema({
    title: {
        type: String,
        required: true,
        minLength: [3, "kamida 3 sahifa bo'lishi kerak"],
        maxLength: [150, "ko'pi bilan 150 harfdan iborat bo'lishi kerak"],
        trim: true
    },
    pages: {
        type: Number,
        required: true,
        min: [3, "kamida 3 sahifa bo'lishi kerak"],
        max: [5000, "ko'pi bilan 5000 sahifadan iborat bo'lishi kerak"]
    },
    publishedYear: {
        type: Number,
        required: true,
        max: [new Date().getFullYear(), "Kelajak sana kiritib bo'lmaydi"]
    },
    publishedHome: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        minLength: [20, "kamida 20 harf bo'lishi kerak"],
        maxLength: [500, "ko'pi bilan 500 harfdan iborat bo'lishi kerak"],
        trim: true
    },
    period: {
        type: String,
        required: true,
        trim: true,
        enum: {
            values: ["Temuriylar davri", "Sovet davri", "Jadid davri", "Mustaqillik davri"],
            message: "{VALUE} bunday qiymat qabul qilinmaydi"
        }
    },
    genre: {
        type: String,
        required: true,
        enum: {
            values: ["Horror", "Fantasy", "Sience-fiction", "Historical", "Comedy", "Romance", "Thriller"],
            message: "{VALUE} bunday qiymat qabul qilinmaydi"
        }
    },
    imageUrl: {
        type: String,
        required: true,
    },
    authorInfo: {
        type: Schema.Types.ObjectId,
        ref: "author"
    },
    iqtibosInfo: {
        type: Schema.Types.ObjectId,
        ref: "iqtibos"
    }
}, {
    versionKey: false,
    timestamps: true
})

const BookSchema = model("book", Book)
module.exports = BookSchema