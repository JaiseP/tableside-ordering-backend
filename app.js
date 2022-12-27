require("dotenv").config();
const express = require("express");
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
    cors: {
        origin: "*",
      },
});
var cors = require('cors')
const userRouter = require("./api/users/user.router");
const productRouter = require("./api/products/product.router");
const orderRouter = require("./api/orders/orders.router");

app.use(cors());
app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/products",productRouter);
app.use("/api/orders", orderRouter);

io.on("connection", (socket) => {
    socket.on("userJoin", ({ userType }) => {
        console.log('User Type Connected:',userType);
        socket.join(userType);
    });

    socket.on("serverJoin", ({
        userType,
        userId
    }) => {
        console.log('User Type Connected:',userId);
        socket.join(userId);
    })

    socket.on("orderPlaced", (data) => {
        console.log("received order:", data);
        // socket.broadcast.to(waiterid).emit("orderPlaced", data);
        io.to(data.userId).emit("orderPlaced", data)
        // socket.broadcast.to(data.userId).emit("orderPlaced", data);
      });

    socket.on("disconnect", () => {
        console.log("user disconnected");
      });
})


http.listen(process.env.APP_PORT, () => {
    console.log("Server up and running on PORT: ", process.env.APP_PORT);
});