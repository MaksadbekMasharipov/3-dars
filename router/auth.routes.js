const { Router } = require("express")
const { register, varify, login, logout, addProfileInfo, updateProfileInfo, deleteProfileInfo } = require("../controller/auth.controller")
const authorization = require("../middleware/authorization")
const profileValidator = require("../middleware/profile.validator.middleware")

const authRouter = Router()

authRouter.post("/register", register )
authRouter.post("/verify", varify )
authRouter.post("/login", login )
authRouter.get("/logout", authorization, logout )


authRouter.post("/add_profile_info", authorization, profileValidator, addProfileInfo)
authRouter.put("/update_profile_info/:id", authorization, profileValidator, updateProfileInfo)
authRouter.delete("/delete_profile_info/:id", authorization, deleteProfileInfo)



module.exports = authRouter 