const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./userAuth");

// sign up
router.post("/sign-up", async (req, res) => {
    try {
        const { userName, email, password, address } = req.body;

        // Check if all required fields are present
        if (!userName || !email || !password || !address) {
            return res.status(400).json({
                message: "All fields are required.",
            });
        }

        // Check username length
        if (userName.length < 4) {
            return res.status(400).json({
                message: "Username must be at least 4 characters long.",
            });
        }

        // Check if username already exists
        const existingUserName = await User.findOne({ userName });
        if (existingUserName) {
            return res.status(400).json({
                message: "Username already exists.",
            });
        }

        // Check if email already exists
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({
                message: "Email already exists.",
            });
        }

        // Check password length
        if (password.length <= 5) {
            return res.status(400).json({
                message: "Password must be greater than 5 characters.",
            });
        }

        // Optional: Hash the password here before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        const newUser = new User({
            userName,
            email,
            password: hashedPassword, // replace with hashed password
            address,
        });

        // Save the user
        await newUser.save();

        return res.status(201).json({
            message: "Signup successful.",
            newUser
        });

    } catch (error) {
        console.error("Signup error:", error);
        return res.status(500).json({
            message: "Internal server error.",
        });
    }
});


// sign in (Log in)
router.post("/sign-in", async (req, res) => {
    try {
        const { userName, password } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({ userName });
        if (!existingUser) {
            return res.status(400).json({
                message: "Invalid credentials.",
            });
        }

        // Compare the password
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials.",
            });
        }
        const authCliams = [
            { name: existingUser.userName }, { role: existingUser.role }
        ]
        const token = jwt.sign({ authCliams }, process.env.SECRET_KEY, { expiresIn: "7d" });

        // Success
        return res.status(200).json({
            message: "Sign in successful.",
            id: existingUser._id,
            role: existingUser.role,
            token

        });

    } catch (error) {
        console.error("Signin error:", error);
        return res.status(500).json({
            message: "Internal server error.",
        });
    }
});

// get the user information
router.get("/get-user-info", authenticateToken, async (req, res) => {
    try {

        // check user Aviable or not
        const { id } = req.headers;
        const data = await User.findById(id).select("-password");
        return res.status(200).json({
            message: "user infromation get successfully...",
            data
        })


    } catch (error) {
        console.error("Signin error:", error);
        return res.status(500).json({
            message: "Internal server error.",
        });
    }
});


// update the user address
router.put("/update-address", authenticateToken, async (req, res) => {
    try {

        const { id } = req.headers;
        const { address } = req.body;

        if (!address) {
            return res.status(400).json({
                message: "Address is required.",
            });
        }
        await User.findByIdAndUpdate(id, { address: address });

        return res.status(200).json({
            message: "Address updated successfully.",
        });


    } catch (error) {
        console.error("Signin error:", error);
        return res.status(500).json({
            message: "Internal server error.",
        });
    }
})

module.exports = router;
