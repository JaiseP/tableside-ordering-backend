const { create, getUserById, getUsers, getUserByUserName } = require("./user.service");

const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        create(body, (err, results) => {
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
    getUserById: (req, res) => {
        const id = req.params.id;
        getUserById(id, (err, results) => {
            if(err) {
                console.log(err);
                return;
            }
            if(!results) {
                return res.json({
                    success: 0,
                    message: "Record Not Found",
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    getUsers: (req, res) => {
        getUsers((err, results) => {
            if(err) {
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    login: (req, res) => {
        console.log("here");
        const body = req.body;
        getUserByUserName(body.username, (err, results) => {
            if(err) {
                console.log(err);
                return;
            }
            if(!results) {
                res.json({
                    success: 0,
                    message: "Invalid Username",
                });
            }
            const result = compareSync(body.password, results.password);
            if(result) {
                results.password = undefined;
                const jsonwebtoken = sign({result: results}, "qwe1234", {
                    expiresIn: "1h"
                });
                return res.json({
                    success:1,
                    userId : results.id,
                    username : results.username,
                    name : results.name,
                    message: "login successfully",
                    token: jsonwebtoken
                });
            } else {
                return res.json({
                    success: 0,
                    message: "Invalid Password",
                });
            }
        })
    }
}