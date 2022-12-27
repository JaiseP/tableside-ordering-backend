const pool = require("../../config/database");

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `insert into users (name, username, password, role)
            values(?,?,?,?)`,
            [
                data.name,
                data.username,
                data.password,
                data.role
            ],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        );
    },
    getUsers : callBack => {
        pool.query(
            `SELECT id, name, username, role FROM users`,
            [],
            (err, result, fields) => {
                if(err) {
                    return callBack(err);
                }
                return callBack(null, result);
            }
        )
    },
    getUserById: (id, callBack) => {
        pool.query(
            `SELECT id, name, username, role FROM users WHERE id = ?`,
            [id],
            (err, results, fields) => {
                if(err) {
                    return callBack(err);
                }
                return callBack(null, results[0]);
            }
        )
    },
    getUserByUserName: (username, callBack) => {
        pool.query(
            `SELECT * FROM users WHERE username = ?`,
            [username],
            (error, results, fields) => {
                if(error) {
                    callBack(error);
                }
                return callBack(null, results[0])
            }
        );
    }
}