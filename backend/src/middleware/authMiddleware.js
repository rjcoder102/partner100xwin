import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    let token;

    // ✅ Check if the token is in Authorization header (Bearer token)
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer ")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }
    // ✅ Or check cookies (your login sets "token")
    else if (req.cookies.token) {
        token = req.cookies.token;
    }

    if (!token) {
        return res.status(401).json({ error: "Authentication required" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user info to request
        req.user = {
            id: decoded.id,
            email: decoded.email
        };

        next();
    } catch (error) {
        console.error("Authentication error:", error.message);
        return res.status(401).json({ error: "Invalid or expired token" });
    }
};
