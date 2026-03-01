const { Schema, model } = require("mongoose");

const Iqtibos = new Schema({
    text: {
        type: String,
        required: true,
        minLength: [3, "kamida 3 sahifa bo'lishi kerak"],
        maxLength: [500, "ko'pi bilan 500 harfdan iborat bo'lishi kerak"],
        trim: true
    },
    book: {
        type: String,
        required: true,
    }
}, {
    versionKey: false,
    timestamps: true
})

const IqtibosSchema = model("iqtibos", Iqtibos)
module.exports = IqtibosSchema