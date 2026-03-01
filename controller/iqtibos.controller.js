const CustomErrorhandler = require("../error/custom-error.handler");
const IqtibosSchema = require("../schema/iqtibos.schema");

const getAllIqtibos = async (req, res, next) => {
    try {
        const iqtibos = await IqtibosSchema.find()
        res.status(200).json(iqtibos);
    } catch (error) {
        next(error)
    }
}

const getOneIqtibos = async (req, res, next) => {
    try {
        const { id } = req.params

        const foundedIqtibos = await IqtibosSchema.findById(id)

        if (!foundedIqtibos) {
            throw CustomErrorhandler.NotFound("Iqtibos not found") 
        }

        res.status(200).json(foundedIqtibos)
    } catch (error) {
        next(error)
    }
}

const addIqtibos = async (req, res, next) => {
    try {
        const { text, added_by } = req.body

        const newIqtibos = await IqtibosSchema.create({
            text,
            added_by
        })

        res.status(201).json(newIqtibos);

    } catch (error) {
        next(error)
    }
}

const updateIqtibos = async (req, res, next) => {
    try {
        const { id } = req.params
        const { text, added_by } = req.body;

        const foundedIqtibos = await IqtibosSchema.findById(id)

        if (!foundedIqtibos) {
            throw CustomErrorhandler.NotFound("Iqtibos not found") 
        }

        const updatedIqtibos = await IqtibosSchema.findByIdAndUpdate(id, {text, added_by}, {new: true})


        res.status(200).json(updatedIqtibos);
    } catch (error) {
        next(error)
    }
}

const deleteIqtibos = async (req, res, next) => {
    try {
        const { id } = req.params
        const deletedIqtibos = await IqtibosSchema.findByIdAndDelete(id);

        if (!deletedIqtibos) {
            throw CustomErrorhandler.NotFound("Iqtibos not found") 
        }

        res.status(200).json(deletedIqtibos);
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllIqtibos,
    getOneIqtibos,
    addIqtibos,
    updateIqtibos,
    deleteIqtibos
}