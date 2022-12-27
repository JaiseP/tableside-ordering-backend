const { createNewOrder, geServerOrderById, getOrderedProducts } = require("./orders.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

router.post("/", createNewOrder);
router.get("/server/:id", geServerOrderById);
router.get("/serverOrder/:id", getOrderedProducts);
// router.get("/", checkToken, getUsers);
// router.get("/:id", checkToken, getUserById);
// router.post("/login", login);

module.exports = router;