import Admin from "../../models/admin/admins.js";

// exports.adminById = async (req, res, next) => {
//     Admin.findById(req._id).exec((err, admin) => {
//         if (err || !admin){
//             return res.status(404).json({
//                 error: "User not found",
//             });
//         }
//
//         req.admin = admin;
//
//         next();
//     });
// };

export const adminById = async (req, res, next) => {
    try {
        const { adminID } = req.params;
        const admin = await Admin.findById(adminID, 'fName, lName, username, email, contact');

        if (!admin) {
            return res.status(404).json({
                error: "User not found",
            });
        }

        req.admin = admin;

        next();
    } catch (err) {
        console.error("Error in adminById middleware:", err);
        return res.status(500).json({
            error: "Internal Server Error",
        });
    }
};
