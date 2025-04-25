const express = require("express");
const app = express();
require("dotenv").config();
require("../backend/conn/connection");
const Users = require("./routes/user");
const Books = require("./routes/book");
const Favourite = require("./routes/favourite");
const Cart = require("./routes/cart");
const Order = require("./routes/order");
const cors = require("cors");

app.use(express.json());
app.use(cors());

// routes handling
app.use("/api/v1", Users);
app.use("/api/v1", Books);
app.use("/api/v1", Favourite);
app.use("/api/v1", Cart);
app.use("/api/v1", Order);

// Base route
app.get('/', (req, res) => {
    const formattedDateTime = new Date().toLocaleString('en-IN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'Asia/Kolkata'
    });

    res.json({
        message: "Welcome to the application for testing purposes only!!",
        datetime: formattedDateTime
    });
});


const PORT = process.env.PORT || 1001
// creating Port
app.listen(PORT, () => {
    console.log(`Server Started....! :- ${PORT}`)
})