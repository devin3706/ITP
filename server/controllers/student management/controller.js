import StudentModel from '../../models/student management/Student.js';

export const getAllStudents = async (req, res) => {
    try {
        const students = await StudentModel.find({});
        res.json(students);
    } catch (err) {
        res.json(err);
    }
};

export const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await StudentModel.findById(id);
        res.json(user);
    } catch (err) {
        res.json(err);
    }
};

export const updateUserById = async (req, res) => {
    try {
        const id = req.params.id;
        await StudentModel.findByIdAndUpdate(id, {
            name: req.body.name,
            email: req.body.email,
            school: req.body.school,
            number: req.body.number,
            address: req.body.address
        });
        res.json({ message: 'User updated successfully' });
    } catch (err) {
        res.json(err);
    }
};

export const deleteUserById = async (req, res) => {
    try {
        const id = req.params.id;
        await StudentModel.findByIdAndDelete(id);
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.json(err);
    }
};

export const createUser = async (req, res) => {
    try {
        const student = await StudentModel.create(req.body);
        res.json(student);
    } catch (err) {
        res.json(err);
    }
};

export const loginUser = (req, res) => {
    const {email, password} = req.body;
    StudentModel.findOne({email: email})
    .then(user => {
        if(user) {
            if(user.password === password) {
                res.json("Success");
            } else {
                res.json("The password is incorrect");
            }
        } else {
            res.json("No records existed");
        }
    });
};