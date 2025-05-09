const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// USER SIGNUP
const signup = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();

    res.status(201).json({ message: "Signup successful" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

// USER LOGIN
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const exist = await User.findOne({ email });
    if (!exist) {
      return res.status(404).json({ message: "User doesn't exist" });
    }

    const passwordMatched = await bcrypt.compare(password, exist.password);
    if (!passwordMatched) {
      return res.status(401).json({ message: "Password incorrect" });
    }

    const token = jwt.sign(
      {
        name: exist.name,
        id: exist._id,
        role: exist.role // Include role in JWT
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error during login: ", error)
    return res.status(500).json({ message: "Server error" })
  }
};

module.exports = { signup, login };
