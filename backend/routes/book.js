const router = require("express").Router();
const User = require("../models/user");
const Book = require("../models/book")
const { authenticateToken } = require("./userAuth");

// add book ---admin----
router.post("/add-book", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const userId = await User.findById(id);
        if (userId.role !== "admin") {
            return res.status(400).json({
                message: `You are not having the Access to Perform admin works...${userId.role}`
            })
        }

        const book = new Book({
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            description: req.body.description,
            language: req.body.language,
        });

        await book.save();

        return res.status(200).json({
            message: "Book added successfully...",
            book,
            role: userId.role
        });

    } catch (error) {
        console.log("Add book error:", error);
        return res.status(500).json({
            message: "Internal server error.",
        });
    }
});

// Update Book
router.put("/update-book", authenticateToken, async (req, res) => {
    try {
        const bookId = req.headers.bookid; // should be lowercase when accessing headers

        if (!bookId) {
            return res.status(400).json({
                message: "Book ID is required in headers.",
            });
        }

        const updatedBook = await Book.findByIdAndUpdate(
            bookId,
            {
                url: req.body.url,
                title: req.body.title,
                author: req.body.author,
                price: req.body.price,
                description: req.body.description,
                language: req.body.language,
            },
            { new: true }
        );

        if (!updatedBook) {
            return res.status(404).json({
                message: "Book not found.",
            });
        }

        return res.status(200).json({
            message: "Book updated successfully.",
            book: updatedBook
        });

    } catch (error) {
        console.log("Update book error:", error);
        return res.status(500).json({
            message: "An error occurred while updating the book.",
        });
    }
});

// delete book
router.delete("/delete-book", authenticateToken, async (req, res) => {
    try {
        const bookId = req.headers.bookid; // headers keys are case-insensitive, lowercase is safer

        if (!bookId) {
            return res.status(400).json({
                message: "Book ID is required in headers.",
            });
        }

        const deletedBook = await Book.findByIdAndDelete(bookId);

        if (!deletedBook) {
            return res.status(404).json({
                message: "Book not found.",
            });
        }

        return res.status(200).json({
            message: "Book deleted successfully.",
        });

    } catch (error) {
        console.log("Delete book error:", error);
        return res.status(500).json({
            message: "An error occurred while deleting the book.",
        });
    }
});

//get all books 
router.get("/get-all-books", async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 });
        const totalBooks = await Book.countDocuments();// total count of all books
        return res.status(200).json({
            message: "All Book Getting successfully...",
            status: "Success",
            totalBooks : totalBooks,
            data: books
        });

    } catch (error) {
        console.log("Delete book error:", error);
        return res.status(500).json({
            message: "An error occurred while getting all the books.",
        });
    }
})

// get recently added book limit4

router.get("/get-recent-books", async (req, res) => {
    try {

        const books = await Book.find().sort({ createdAt: -1 }).limit(4);
        const totalBooks = await Book.countDocuments(); // total count of all books

        return res.status(200).json({
            message: "Only recent add the Four Book Getting successfully...",
            status: "Success",
            recentTotalBooks: books.length, 
            totalBooks : totalBooks,
            data: books,
        });

    } catch (error) {
        console.log("Delete book error:", error);
        return res.status(500).json({
            message: "An error occurred while getting the recent all the four books.",
        });
    }
})

// Particular book ka details
router.get("/get-book-by-id/:id", async (req, res) => {
    try {
        const { id } = req.params;  // Getting book ID from the route params
        
        const book = await Book.findById(id); // Use Book model instead of User
        const totalBooks = await Book.countDocuments();

        if (!book) {
            return res.status(404).json({
                message: "Book not found.",
            });
        }

        return res.status(200).json({
            message: "Book details fetched successfully.",
            status: "Success",
            totalBooks:book.length,
            data: book
        });

    } catch (error) {
        console.log("Get book error:", error);
        return res.status(500).json({
            message: "An error occurred while fetching the book details.",
        });
    }
});


module.exports = router;