const express = require('express');
const { getAllUser, getUser, createUser, updateUser, deleteUser, registerUser, loginUser } = require('../controller/user');
const { AuthUserValidation } = require('../middleware/user');

const userRouter = express.Router();

// console.log(createUser);


userRouter.post("/signup", registerUser);
userRouter.post("/signin",loginUser)
userRouter.get("/", getAllUser )
userRouter.get("/:id", getUser )
userRouter.post("/" , createUser )
userRouter.put("/:id", updateUser )
userRouter.delete("/:id", deleteUser )

module.exports = userRouter;
