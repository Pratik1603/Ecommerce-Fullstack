import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();
// auth controller
export const register = async (req, res) => {
    const { username, password } = req.body;
    try {
        let user = await User.findOne({ username });
        if (user) return res.status(400).json({ message: 'User already exists' });

        user = new User({ username, password });
        await user.save();
        // JWT token signIn
        const payload = { user: { id: user.id } };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign(
            { id: user._id, isOwner: user.isOwner },
            process.env.JWT_SECRET
          );
      
          const { password: pass, ...rest } = user._doc;
      // Storing token in cookie
          res
            .status(200)
            .cookie('access_token', token, {
              httpOnly: true,
              domain: 'localhost',
              path: '/',
              secure: false, // Change to true if using HTTPS
              sameSite: 'strict' // Adjust as needed for your requirements
            })
            .json(rest);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
