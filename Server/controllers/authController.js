const bcrypt = require('bcrypt');
const User = require('../Schemas/userSchema');

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS);

// Validate User ID
const validateId = async (id) => {
    const foundUser = await User.findOne({ id });
    return !!foundUser;
};

const register = async (req, res) => {
    try {
        const lastUser = await User.findOne().sort({ id: -1 });
        const newId = lastUser ? lastUser.id + 1 : 1;

        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        const newUser = new User({ id: newId, name, email, password: hashedPassword });
        await newUser.save();

        res.json({ message: "User saved successfully", id: newId });
    } catch (err) {
        console.error('Error during registration:', err);
        res.status(500).json({ message: "Error saving User" });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const foundUser = await User.findOne({ email });

        if (!foundUser) return res.status(404).json({ message: "Email not registered!" });
        if (await bcrypt.compare(password, foundUser.password)) {
            return res.json({ message: "Login Success", id: foundUser.id });
        } else {
            return res.status(401).json({ message: "Invalid Password" });
        }
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { register, login, validateId };
