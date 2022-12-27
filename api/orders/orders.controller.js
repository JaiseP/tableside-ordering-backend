const { createNewOrder, getServerOrders, getOrderedProducts } = require("./orders.service");

module.exports = {
    createNewOrder: (req, res) => {
        const body = req.body;
        createNewOrder(body, (err, results) => {
            if(err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database Connection Error"
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    geServerOrderById: (req, res) => {
        const id = req.params.id;
        return new Promise(function(resolve, reject) {
            getServerOrders(id, (err, results) => {
                if(err) {
                    console.log(err);
                    return;
                } else {
                    if(!results) {
                        return res.json({
                            success: 0,
                            message: "Record Not Found",
                        });
                    }
                    let response = [];
                    results.forEach(order => {
                        getOrderedProducts(order.order_id, (err, results) => {
                            if(err) {
                                console.log(err);
                                return;
                            } else {
                                response.push(order);
                                console.log(`orderId:${order.order_id}`,results);
                                console.log(order);
                            }
                        });
                    });
                    // return resolve(response);
    
                    return res.json({
                        success: 1,
                        data: results
                    });
                }
                
            });
        })
        
    },
    getOrderedProducts : (req, res) => {
        const id = req.params.id;
        getOrderedProducts(id, (err, results) => {
            if(err) {
                console.log(err);
                return;
            } else {
                console.log(results);
                return res.json({
                    success: 1,
                    data: results
                });
            }
        })
    }
}