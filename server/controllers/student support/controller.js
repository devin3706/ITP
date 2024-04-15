import UserModel from '../../models/student support/Users.js';

const UserController = {
    getAllUsers: (req, res) => {
        UserModel.find({})
        .then(users => res.json(users))
        .catch(err => res.json(err));
    },
    getUserById: (req, res) => {
        const id = req.params.id;
        UserModel.findById(id)
        .then(user => res.json(user))
        .catch(err => res.json(err));
    },
    updateUser: (req, res) => {
        const id = req.params.id;
        UserModel.findByIdAndUpdate(id, req.body, { new: true })
        .then(user => res.json(user))
        .catch(err => res.json(err));
    },
    deleteUser: (req, res) => {
        const id = req.params.id;
        UserModel.findByIdAndDelete(id)
        .then(result => res.json(result))
        .catch(err => res.json(err));
    },
    createUser: (req, res) => {
        UserModel.create(req.body)
        .then(user => res.json(user))
        .catch(err => res.json(err));
    }
};

export default UserController;
