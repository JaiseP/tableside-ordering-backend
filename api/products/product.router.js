const { getAllProducts } = require("./product.controller");
const router = require("express").Router();

router.get("/", getAllProducts);

module.exports = router;