import ALogins from "../../models/admin/adminLogins.js";
import SLogins from "../../models/admin/studentLogins.js";
import TLogins from "../../models/admin/teacherLogins.js";
import Class from "../../models/class scheduling/classModel.js";
import Question from "../../models/exam/questionSchema.js";
import StudentModel from "../../models/student management/Student.js";
import PdfDetails from "../../models/study material/PdfModel.js";
import Teacher from "../../models/teacher/Teacher.js";

const getTotalStudents = async (req, res) => {
    try {
        
        const totalStudents = await StudentModel.countDocuments();

        res.status(200).json({ totalStudents });
    } catch (error) {
        console.error("Failed to retrieve total number of students:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getTotalTeachers = async (req, res) => {
    try {
        
        const totalTeachers = await Teacher.countDocuments();

        res.status(200).json({ totalTeachers });
    } catch (error) {
        console.error("Failed to retrieve total number of teachers:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getTotalFiles = async (req, res) => {
    try {
        
        const totalFiles = await PdfDetails.countDocuments();

        res.status(200).json({ totalFiles });
    } catch (error) {
        console.error("Failed to retrieve total number of files:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getTotalClasses = async (req, res) => {
    try {
        
        const totalClasses = await Class.countDocuments();

        res.status(200).json({ totalClasses });
    } catch (error) {
        console.error("Failed to retrieve total number of classes:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getTotalExams = async (req, res) => {
    try {
        
        const totalExams = await Question.countDocuments();

        res.status(200).json({ totalExams });
    } catch (error) {
        console.error("Failed to retrieve total number of Exams:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getTotalTeacherLogins = async (req, res) => {
    try {
        
        const totalTeacherLogins = await TLogins.countDocuments();

        res.status(200).json({ totalTeacherLogins });
    } catch (error) {
        console.error("Failed to retrieve total number of teacher logins:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getStudentLoginsByMonth = async (req, res) => {
    try {
        // Aggregate query to group logins by month
        const studentLoginsByMonth = await SLogins.aggregate([
            {
                $group: {
                    _id: { $month: '$timestamp' }, // Group by month
                    count: { $sum: 1 } // Count logins in each group
                }
            }
        ]);

        res.status(200).json(studentLoginsByMonth);
    } catch (error) {
        console.error('Error fetching student logins by month:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getTeacherLoginsByMonth = async (req, res) => {
    try {
        // Aggregate query to group logins by month
        const teacherLoginsByMonth = await TLogins.aggregate([
            {
                $group: {
                    _id: { $month: '$timestamp' }, // Group by month
                    count: { $sum: 1 } // Count logins in each group
                }
            }
        ]);

        res.status(200).json(teacherLoginsByMonth);
    } catch (error) {
        console.error('Error fetching teacher logins by month:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getAdminLoginsByMonth = async (req, res) => {
    try {
        // Aggregate query to group logins by month
        const adminLoginsByMonth = await ALogins.aggregate([
            {
                $group: {
                    _id: { $month: '$timestamp' }, // Group by month
                    count: { $sum: 1 } // Count logins in each group
                }
            }
        ]);

        res.status(200).json(adminLoginsByMonth);
    } catch (error) {
        console.error('Error fetching admins logins by month:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


export { getTotalStudents, getTotalTeachers, getTotalFiles, getTotalClasses, getTotalExams, getTotalTeacherLogins, getTeacherLoginsByMonth, getAdminLoginsByMonth, getStudentLoginsByMonth };