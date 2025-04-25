const mongose = require("mongoose");


const bookSchema = new mongose.Schema({

    url: {
        type: String,
        require: true,
    },
    title: {
        type: String,
        require: true,
    },
    auther: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    language: {
        type: String,
        require: true,
    },
}, { timestamps: true })

module.exports = mongose.model("books", bookSchema);