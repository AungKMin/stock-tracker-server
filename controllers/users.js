import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

import User from '../models/user.js';

const jwtSecret = (process.env.JWT_SECRET ? process.env.JWT_SECRET : 'development');

export const signin = async (req, res) => { 
    const { email, password } = req.body;
    
    try { 
        const existingUser = await User.findOne({ email });
        if (!existingUser) { 
            return res.status(404).json({ message: "No user with that email" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordCorrect) { 
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, jwtSecret, { expiresIn: '1h' });
        
        res.status(200).json({ result: existingUser, token });
    } catch (error) { 
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

export const signup = async (req, res) => { 
    const { email, password, confirmPassword, firstName, lastName } = req.body;

    try { 
        const existingUser = await User.findOne({ email });

        if (existingUser) { 
            return res.status(400).json({ message: 'Account already exists' });
        }

        if (password !== confirmPassword) { 
            return res.status(400).json({ message: 'Passwords do not match.' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });

        const token = jwt.sign({ email: newUser.email, id: newUser._id }, jwtSecret, { expiresIn: "1h" });
        
        res.status(200).json({ result: newUser, token });
    } catch (error) { 
        console.log(error);
        res.status(500).json({ message: "Something went wrong " });
    }
} 

export const preferences = async (req, res) => { 

    if (!req?.userId) { 
        return res.json({ symbols: [] });
    }

    try { 
        const user = await User.findById(req.userId);

        if (!user) { 
            return res.status(404).json({ message: 'Not authenticated' });
        }

        res.status(200).json({ symbols: user.symbols });

    } catch (error) { 
        res.status(500).json({ message: 'Something went wrong' });
        console.log(error);
    }
}

export const changePreferences = async (req, res) => { 

    if (!req?.userId) { 
        return res.json({ symbols: [] });
    }

    try { 
        const user = await User.findById(req.userId);

        if (!user) { 
            return res.status(404).json({ message: 'Not authenticated' });
        }

        user.symbols = req.body;

        const newUser = await User.findByIdAndUpdate(req.userId, user, { new: true });

        res.status(201).json({ symbols: newUser.symbols });
    } catch (error) { 
        res.status(500).json({ message: 'Something went wrong' });
        console.log(error);
    }
}