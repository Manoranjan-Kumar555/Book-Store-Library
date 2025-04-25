const mongose = require("mongoose");


const orderSchema = new mongose.Schema({
    user: {
        type: mongose.Types.ObjectId,
        ref: "user",
    },
    book: {
        type: mongose.Types.ObjectId,
        ref: "books",
    },
    status: {
        type: String,
        default: "Order Placed",
        enum: ["Order Placed", "Out for Delivery", "Delivered Canceled"]
    },
}, { timestamps: true })

module.exports = mongose.model("order", orderSchema);