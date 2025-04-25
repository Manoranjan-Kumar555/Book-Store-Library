const router = require("express").Router();
const mongoose = require("mongoose");
const User = require("../models/user");
const Book = require("../models/book");
const { authenticateToken } = require("./userAuth");

// Helper to validate ObjectId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// Add book to Favourites
router.put("/add-book-to-favourite", authenticateToken, async (req, res) => {
    try {
        const bookId = req.headers.bookid?.trim();
        const userId = req.headers.id?.trim();

        if (!isValidObjectId(bookId) || !isValidObjectId(userId)) {
            return res.status(400).json({ message: "Invalid book ID or user ID." });
        }

        const userData = await User.findById(userId);
        if (!userData) {
            return res.status(404).json({ message: "User not found." });
        }

        const isBookFavourite = userData.favourates.some(
            (favId) => favId.toString() === bookId
        );

        if (isBookFavourite) {
            return res.status(400).json({ message: "Book is already in favourites." });
        }

        userData.favourates.push(bookId);
        await userData.save();

        const addedBook = await Book.findById(bookId);

        return res.status(200).json({
            message: "Book added to favourites.",
            book: addedBook,
        });

    } catch (error) {
        console.log("Add book to favourite error:", error);
        return res.status(500).json({
            message: "An error occurred while adding book to favourites.",
            error: error.message,
        });
    }
});

// Remove book from Favourites
router.put("/remove-book-from-favourite", authenticateToken, async (req, res) => {
    try {
        const bookId = req.headers.bookid?.trim();
        const userId = req.headers.id?.trim();

        if (!mongoose.Types.ObjectId.isValid(bookId) || !mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid book ID or user ID." });
        }

        const userData = await User.findById(userId);
        if (!userData) {
            return res.status(404).json({ message: "User not found." });
        }

        const isBookFavourite = userData.favourates.some(
            (favId) => favId.toString() === bookId
        );

        if (!isBookFavourite) {
            return res.status(400).json({ message: "Book is not in favourites." });
        }

        // ✅ Use "new" here
        await User.findByIdAndUpdate(userId, {
            $pull: { favourates: new mongoose.Types.ObjectId(bookId) },
        });

        return res.status(200).json({
            message: "Book removed from favourites.",
        });

    } catch (error) {
        console.log("Remove book from favourite error:", error);
        return res.status(500).json({
            message: "An error occurred while removing book from favourites.",
            error: error.message,
        });
    }
});


// Get favourite books of a particular user
router.get("/get-favourite-book", authenticateToken, async (req, res) => {
    try {
        const userId = req.headers.id?.trim();

        if (!isValidObjectId(userId)) {
            return res.status(400).json({ message: "Invalid user ID." });
        }

        const userData = await User.findById(userId).populate("favourates");
        if (!userData) {
            return res.status(404).json({ message: "User not found." });
        }

        return res.status(200).json({
            status: "Success",
            message: "These are all the favourite books.",
            data: userData.favourates,
        });

    } catch (error) {
        console.log("Get favourite books error:", error);
        return res.status(500).json({
            message: "An error occurred while getting the favourite books.",
            error: error.message,
        });
    }
});

module.exports = router;
