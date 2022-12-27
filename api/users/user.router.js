const { createUser, getUserById, getUsers, login } = require("./user.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

router.post("/", createUser);
router.get("/", getUsers);
router.get("/:id", checkToken, getUserById);
router.post("/login", login);

module.exports = router;