const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
    let accessToken = req.cookies.jwt;

    //no cookie
    if (!accessToken) {
        return res.status(403).json({
            error: "Unautherized",
        });
    }

    let payload;
    try {
        payload = jwt.verify(accessToken, process.env.JWT_SECRET);
        req._id = payload._id;

        next();

    }catch(err){
        return res.status(403).json({
            error: "Unautherized",
        });
    }
}