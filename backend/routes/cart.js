const router = require("express").Router();
const mongoose = require("mongoose");
const User = require("../models/user");
const Book = require("../models/book");
const { authenticateToken } = require("./userAuth");

// Helper to validate ObjectId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// Add book to cart
router.put("/add-to-cart", authenticateToken, async (req, res) => {
    try {
        const bookId = req.headers.bookid?.trim();
        const userId = req.headers.id?.trim();

        if (!isValidObjectId(bookId) || !isValidObjectId(userId)) {
            return res.status(400).json({
                status: "Failed",
                message: "Invalid book ID or user ID.",
            });
        }

        const userData = await User.findById(userId);
        if (!userData) {
            return res.status(404).json({
                status: "Failed",
                message: "User not found.",
            });
        }

        const isBookInCart = userData.cart.some(item => item.toString() === bookId);
        if (isBookInCart) {
            return res.status(200).json({
                status: "Success",
                message: "Book is already in cart...",
            });
        }

        // Use `new` when creating ObjectId
        await User.findByIdAndUpdate(userId, {
            $push: { cart: new mongoose.Types.ObjectId(bookId) },
        });

        const addedBook = await Book.findById(bookId);
        const cartBooks = userData.cart;

        return res.status(200).json({
            status: "Success",
            message: "Book added to cart...",
            book: addedBook,
            total: cartBooks.length,
        });

    } catch (error) {
        console.log("Add to cart error:", error);
        return res.status(500).json({
            status: "Failed",
            message: "An error occurred while adding book to cart.",
            error: error.message,
        });
    }
});

// Delete / remove the book from the cart
router.delete("/remove-book-to-cart/:bookId", authenticateToken, async (req, res) => {
    try {
        const { bookId } = req.params;
        const userId = req.headers.id?.trim();

        if (!isValidObjectId(bookId) || !isValidObjectId(userId)) {
            return res.status(400).json({
                status: "Failed",
                message: "Invalid book ID or user ID.",
            });
        }

        const userData = await User.findById(userId);
        if (!userData) {
            return res.status(404).json({
                status: "Failed",
                message: "User not found.",
            });
        }

        const isBookInCart = userData.cart.some(item => item.toString() === bookId);
        if (!isBookInCart) {
            return res.status(400).json({
                status: "Failed",
                message: "Book is not in the cart.",
            });
        }

        await User.findByIdAndUpdate(userId, {
            $pull: { cart: new mongoose.Types.ObjectId(bookId) },
        });

        return res.status(200).json({
            status: "Success",
            message: "Book removed from the cart successfully.",
        });

    } catch (error) {
        console.log("Remove from cart error:", error);
        return res.status(500).json({
            status: "Failed",
            message: "An error occurred while removing book from the cart.",
            error: error.message,
        });
    }
});


// Get cart books of a particular user
router.get("/get-cart-book", authenticateToken, async (req, res) => {
    try {
        const userId = req.headers.id?.trim();

        if (!isValidObjectId(userId)) {
            return res.status(400).json({ message: "Invalid user ID." });
        }

        const userData = await User.findById(userId).populate("cart");
        if (!userData) {
            return res.status(404).json({ message: "User not found." });
        }
        const cartBooks = userData.cart;
        return res.status(200).json({
            status: "Success",
            message: "These are all the books in the cart.",
            total: cartBooks.length,
            data: userData.cart,
        });

    } catch (error) {
        console.log("Get cart books error:", error);
        return res.status(500).json({
            message: "An error occurred while getting the cart books.",
            error: error.message,
        });
    }
});


module.exports = router;
