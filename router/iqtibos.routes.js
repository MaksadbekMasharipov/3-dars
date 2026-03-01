const { Router } = require("express")
const { getOneIqtibos, getAllIqtibos, updateIqtibos, addIqtibos, deleteIqtibos } = require("../controller/iqtibos.controller")


const iqtibosRouter = Router()

iqtibosRouter.get("/get_all_iqtibos", getAllIqtibos )
iqtibosRouter.get("/get_one_iqtibos/:id", getOneIqtibos )
iqtibosRouter.post("/add_iqtibos", addIqtibos )
iqtibosRouter.put("/update_iqtibos/:id", updateIqtibos)
iqtibosRouter.delete("/delete_iqtibos/:id", deleteIqtibos)


module.exports = iqtibosRouter