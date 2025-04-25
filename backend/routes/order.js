const router = require("express").Router();
const mongoose = require("mongoose");
const User = require("../models/user");
const Book = require("../models/book");
const Order = require("../models/order");
const { authenticateToken } = require("./userAuth");
const user = require("../models/user");

// Helper to validate ObjectId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

router.post("/place-order", authenticateToken, async (req, res) => {
    try {
        const userId = req.headers.id?.trim();
        const { order } = req.body;

        if (!isValidObjectId(userId)) {
            return res.status(400).json({
                status: "Failed",
                message: "Invalid user ID.",
            });
        }

        if (!Array.isArray(order) || order.length === 0) {
            return res.status(400).json({
                status: "Failed",
                message: "Order array is required and cannot be empty.",
            });
        }
        // for loop
        for (const orderItem of order) {
            if (!isValidObjectId(orderItem._id)) continue;

            // Create and save order
            const newOrder = new Order({
                user: userId,
                book: orderItem._id,
            });

            const savedOrder = await newOrder.save();

            // Add order ID to user's orders array
            await User.findByIdAndUpdate(userId, {
                $push: { orders: savedOrder._id },
            });

            // Remove book from cart
            await User.findByIdAndUpdate(userId, {
                $pull: { cart: orderItem._id },
            });
        }

        return res.status(200).json({
            status: "Success",
            message: "Order placed successfully.",
        });

    } catch (error) {
        console.log("Place order error:", error);
        return res.status(500).json({
            message: "An error occurred while placing the order.",
            error: error.message,
        });
    }
});


// Get order history of a particular user
router.get("/get-order-history", authenticateToken, async (req, res) => {
    try {
        const userId = req.headers.id?.trim();

        if (!isValidObjectId(userId)) {
            return res.status(400).json({
                status: "Failed",
                message: "Invalid user ID.",
            });
        }

        const userData = await User.findById(userId).populate({
            path: "orders",
            populate: { path: "book" },
        });

        if (!userData) {
            return res.status(404).json({
                status: "Failed",
                message: "User not found.",
            });
        }

        const orderData = [...userData.orders].reverse(); // copy and reverse

        return res.status(200).json({
            status: "Success",
            message: "Fetched order history successfully.",
            data: orderData,
        });

    } catch (error) {
        console.log("History order error:", error);
        return res.status(500).json({
            status: "Failed",
            message: "An error occurred while fetching order history.",
            error: error.message,
        });
    }
});


// Get all orders (ADMIN only)
router.get("/get-all-orders", authenticateToken, async (req, res) => {
    try {
        const orders = await Order.find()
            .populate("book")
            .populate("user")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            status: "Success",
            message: "Fetched all orders (Admin only).",
            data: orders,
        });

    } catch (error) {
        console.log("Admin order fetch error:", error);
        return res.status(500).json({
            status: "Failed",
            message: "An error occurred while fetching orders for admin.",
            error: error.message,
        });
    }
});


// Update the order status ----- ADMIN -----
router.put("/update-status/:id", authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        // Check if user is admin
        const userId = req.user?.id; // assuming authenticateToken sets req.user
        const userData = await User.findById(userId);

        if (!userData || userData.role !== "admin") {
            return res.status(403).json({
                status: "Failed",
                message: "Access denied. Admins only.",
            });
        }

        // Validate Order ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                status: "Failed",
                message: "Invalid order ID.",
            });
        }

        // Update order status
        const updatedOrder = await Order.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({
                status: "Failed",
                message: "Order not found.",
            });
        }

        return res.status(200).json({
            status: "Success",
            message: "Order status updated successfully.",
            order: updatedOrder,
        });

    } catch (error) {
        console.log("Update order status error:", error);
        return res.status(500).json({
            status: "Failed",
            message: "An error occurred while updating order status.",
            error: error.message,
        });
    }
});



module.exports = router;
