const pool = require("../../config/database");

module.exports = {
    getAllProducts: (callBack) => {
        pool.query(
            `SELECT * FROM products`,
            [],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                } else {
                    return callBack(null, results)
                }
                
            }
        )
    }
}