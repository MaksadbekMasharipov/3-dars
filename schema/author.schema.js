const { Schema, model } = require("mongoose");

const Author = new Schema({
    fullName: {
        type: String,
        required: true,
        minLength: [3, "kamida 3 ta harfdan iborat bo'lishi kerak"],
        maxLength: [50, "ko'pi bilan 50 ta harfdan iborat bo'lishi kerak"],
        set: (value) => value.trim(),   // Bo'sh joylarni olib tashlaydi
        match: /^[a-zA-Z\s]+$/           // Faqat harf qabul qilishni ta'minlaydi
    },
    birthDate: {
        type: Date,
        required: true,
        max: [Date.now, "Kelajak sana kiritib bo'lmaydi"],
    },
    deathDate: {
        type: String,
        required: true,
        max: [Date.now, "Kelajak sana kiritib bo'lmaydi"],
        trim: true,
    },
    period: {
        type: String,
        required: true,
        trim: true,
        enum: {
            values: ["Temuriylar davri", "Sovet davri", "Jadid davri", "Mustaqillik davri"], // Faqat shu variantlarni yozsa oladi
            message: "{VALUE} bunday qiymat qabul qilinmaydi"
        }
    },
    bio: {
        type: String,
        required: true,
        minLength: [10, "kamida 10 ta harfdan iborat bo'lishi kerak"],
        maxLength: [500, "ko'pi bilan 500 ta harfdan iborat bo'lishi kerak"],
        trim: true,
    },
    work: {
        type: String,
        required: true,
        minLength: [10, "kamida 10 ta harfdan iborat bo'lishi kerak"],
        maxLength: [500, "ko'pi bilan 500 ta harfdan iborat bo'lishi kerak"],
        trim: true,
    },
    imageUrl: {
        type: String,
        required: true,
    }
}, {
    versionKey: false,
    timestamps: true
})

const AuthorSchema = model("author", Author)
module.exports = AuthorSchema