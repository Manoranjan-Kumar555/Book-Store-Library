const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Bearer token like this

    if (!token) {
        return res.status(401).json({
            message: "Authentication token required...",
        });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({
                message: "Invalid or expired token... Please Sign in Again...",
            });
        }

        req.user = user;
        next();
    });
};

module.exports = { authenticateToken };
