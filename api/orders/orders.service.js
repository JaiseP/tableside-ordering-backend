const pool = require("../../config/database");

module.exports = {
    createNewOrder: (data, callBack) => {
        pool.query(
            `SELECT id, name, username FROM users WHERE role = ? ORDER BY RAND() LIMIT 1`,
            ['server'],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                } else {
                    let assignedServerId = results[0]['id'];
                    let assignedServerName = results[0]['name'];
                    pool.query(`INSERT INTO orders (table_no, status,assigned_server_id, total_price, payment_mode, is_paid) VALUES(?,?,?,?,?,?)`,
                    [data.tableNo, 1, assignedServerId, data.totalAmount, 'cash', 1],
                    (error, results, fields) => {
                        if(error) {
                            return callBack(error);
                        }
                        let orderId = results.insertId;
                        
                        for (const [key, value] of Object.entries(data.items)) {
                            pool.query(`INSERT INTO order_info (order_id, product_id, quantity) VALUES(?,?,?)`,
                            [orderId, value.itemId, value.itemQty],
                            (error, results, fields) => {
                                if(error) {
                                    return callBack(error);
                                }
                                const res = {
                                    orderId : orderId,
                                    assignedServerId : assignedServerId,
                                    assignedServerName : assignedServerName
                                };
                                return callBack(null, res);
                            }
                            )
                        }
                    }
                    )
                }
            }
        );
    },
    getServerOrders : async (id, callBack) => {
        try {
        pool.query(
            `SELECT * FROM orders WHERE assigned_server_id = ? ORDER BY order_id`,
            [id],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                } 
                return callBack(null, results);
                
            }
        )
        } catch (err) {
            console.log(err);
        }
    },
    getOrderedProducts : async (id, callBack) => {
        await pool.query(
            `SELECT oi.product_id, p.product_name, oi.quantity FROM order_info oi INNER JOIN products p ON oi.product_id = p.product_id WHERE oi.order_id = ${id}`,
            [],
            (error, results, fields) => {
                if(error) {
                    console.log(error);
                } else {
                    let products = [];
                    results.forEach((product) => {
                        products.push({
                            product_name : product.product_name,
                            quantity : product.quantity
                        });
                    });
                    return callBack(null, results);
                }
            }
        )
    }
    
}

const getOrderedProducts = async (id) => {
try{

    let data = await pool.query(
        `SELECT oi.product_id, p.product_name, oi.quantity FROM order_info oi INNER JOIN products p ON oi.product_id = p.product_id WHERE oi.order_id = ${id}`,
        [],
        (error, results, fields) => {
            if(error) {
                console.log(error);
            } else {
                let products = [];
                results.forEach((product) => {
                    products.push({
                        product_name : product.product_name,
                        quantity : product.quantity
                    });
                });
                console.log(products);
                // return products
                // res.send(results);
                return callBack(null, results);
            }
            
    // return products;
        }
    )
} catch(e) {

}
}