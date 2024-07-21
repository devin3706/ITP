import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    let accessToken = req.cookies.jwt;

    // No cookie
    if (!accessToken) {
        return res.status(403).json({
            error: "Unauthorized",
        });
    }

    let payload;
    try {
        payload = jwt.verify(accessToken, process.env.JWT_SECRET);
        req._id = payload._id;

        next();

    } catch (err) {
        return res.status(403).json({
            error: "Unauthorized",
        });
    }
};
