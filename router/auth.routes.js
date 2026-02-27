const { Router } = require("express")
const { register, varify } = require("../controller/auth.controller")

const authRouter = Router()

authRouter.post("/register", register )
authRouter.post("/verify", varify )


module.exports = authRouter 