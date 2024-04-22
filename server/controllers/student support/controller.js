import express from 'express';
import mongoose from 'mongoose';
import UserModel from '../../models/student support/Users.js';

const mainController = {
    getAllUsers: async (req, res) => {
        try {
            const feedbacks = await UserModel.find({});
            res.json(feedbacks);
        } catch (err) {
            res.json(err);
        }
    },

    getUserById: async (req, res) => {
        const id = req.params.id;
        try {
            const feedback = await UserModel.findById(id);
            res.json(feedback);
        } catch (err) {
            res.json(err);
        }
    },

    updateUserById: async (req, res) => {
        const id = req.params.id;
        try {
            const feedback = await UserModel.findByIdAndUpdate(id, req.body, { new: true });
            res.json(feedback);
        } catch (err) {
            res.json(err);
        }
    },

    deleteUserById: async (req, res) => {
        const id = req.params.id;
        try {
            const result = await UserModel.findByIdAndDelete(id);
            res.json(result);
        } catch (err) {
            res.json(err);
        }
    },

    createUser: async (req, res) => {
        try {
            const feedback = await UserModel.create(req.body);
            res.json(feedback);
        } catch (err) {
            res.json(err);
        }
    },

    postQuestion: async (req, res) => {
        const { Name, Email, Teacher, Question } = req.body;
        try {
            const question = await UserModel.create({
                Name,
                Email,
                Teacher,
                Feedback: Question,
                Rating: 0
            });
            res.json({ message: "Question posted successfully", question });
        } catch (err) {
            res.status(500).json({ error: "Failed to post question", err });
        }
    },

    getQuestionsForTeacher: async (req, res) => {
        const teacherName = req.params.teacherName;
        try {
            const questions = await UserModel.find({ Teacher: teacherName });
            res.json(questions);
        } catch (err) {
            res.status(500).json({ error: "Failed to retrieve questions for teacher", err });
        }
    }
};

export default mainController;
