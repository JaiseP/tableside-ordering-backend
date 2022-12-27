const { getAllProducts } = require("./product.service");

module.exports = {
    getAllProducts: (req, res) => {
        getAllProducts((err, results) => {
            if(err) {
                return res.status(500).json({
                    success: 0,
                    message: "Database Connection Error"
                })
            } else {
                return res.status(200).json({
                    success: 1,
                    data: results
                });
            }
            
        })
    }
}