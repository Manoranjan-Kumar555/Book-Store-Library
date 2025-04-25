const mongose = require("mongoose");


const userSchema = new mongose.Schema({
    userName: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    avater: {
        type: String,
        default: "https://cdn-icons-png.flaticon.com/512/8847/8847419.png"
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"]
    },
    favourates: [
        {
            type: mongose.Types.ObjectId,
            ref: "books",
        }
    ],
    cart: [
        {
            type: mongose.Types.ObjectId,
            ref: "books",
        }
    ],
    orders: [
        {
            type: mongose.Types.ObjectId,
            ref: "order",
        }
    ]
}, { timestamps: true });

module.exports = mongose.model("user", userSchema);