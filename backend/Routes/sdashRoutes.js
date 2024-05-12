const express = require('express');
const router = express.Router();
const users = require('../Model/studentDash');

router.use(express.json());

router.post('/add', async (req, res) => {
    try {
        // Extract fields from request body
        const { name, phone, email, dob, batch, gender } = req.body;
        const existingUser = await users.findOne({ $or: [{ name }, { email }] });
        // If a similar entry exists, prevent duplicates
        if (existingUser) {
            console.log('Duplicate entry: A user with this email already exists.');

            return res.status(400).json({ error: 'Duplicate entry: A user with this email already exists.' });
        }

        // Create a new document using Mongoose model
        const newStudent = new users({
            name,
            phone,
            email,
            dob,
            batch,
            gender
        });

        // Save the document to the database
        const savedStudent = await newStudent.save();
        console.log(savedStudent);
        res.status(200).send({ message: "Exit form submitted" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "An error occurred while saving data" });
    }
});

module.exports = router;
