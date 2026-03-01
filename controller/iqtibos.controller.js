const CustomErrorhandler = require("../error/custom-error.handler");
const IqtibosSchema = require("../schema/iqtibos.schema");

const getAllIqtibos = async (req, res) => {
    try {
        const iqtibos = await IqtibosSchema.find()
        res.status(200).json(iqtibos);
    }catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const getOneIqtibos = async (req, res) => {
    try {
        const { id } = req.params

        const foundedIqtibos = await IqtibosSchema.findById(id)

        if (!foundedIqtibos) {
            throw CustomErrorhandler.NotFound("Iqtibos not found") 
        }

        res.status(200).json(foundedIqtibos)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const addIqtibos = async (req, res) => {
    try {
        const { text, book } = req.body

        const newIqtibos = await IqtibosSchema.create({
            text,
            book
        })

        res.status(201).json(newIqtibos);

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const updateIqtibos = async (req, res) => {
    try {
        const { id } = req.params
        const { text, book } = req.body;

        const foundedIqtibos = await IqtibosSchema.findById(id)

        if (!foundedIqtibos) {
            throw CustomErrorhandler.NotFound("Iqtibos not found") 
        }

        await IqtibosSchema.findByIdAndUpdate(id, {text, book})


        res.status(200).json(foundedIqtibos);
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const deleteIqtibos = async (req, res) => {
    try {
        const { id } = req.params
        const deletedIqtibos = await IqtibosSchema.findByIdAndDelete(id);

        if (!deletedIqtibos) {
            throw CustomErrorhandler.NotFound("Iqtibos not found") 
        }

        res.status(200).json(deletedIqtibos);
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {
    getAllIqtibos,
    getOneIqtibos,
    addIqtibos,
    updateIqtibos,
    deleteIqtibos
}