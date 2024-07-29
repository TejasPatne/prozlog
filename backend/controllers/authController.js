// library imports
import validator from 'validator';
import jwt from 'jsonwebtoken';

// file imports
import User from "../models/userModel.js";
import { JWT_SECRET } from '../config/env.js';

export const register = async (req, res) => {
    const user = req.body;

    if(!user.userName || !user.fullName || !user.email || !user.password || !user.confirmPassword) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });
    }

    if(!validator.isEmail(user.email) || !validator.contains(user.email, "ves.ac.in")) {
        return res.status(400).json({
            success: false,
            message: "Invalid email"
        });
    }

    if(user.password.length < 8) {
        return res.status(400).json({
            success: false,
            message: "Password must be at least 8 characters long"
        });
    }

    if(user.password !== user.confirmPassword) {
        return res.status(400).json({
            success: false,
            message: "Passwords do not match"
        });
    }

    try {
        const existingUser = await User.findOne({email: user.email});
        if(existingUser) return res.status(400).json({
            success: false,
            message: "Username already exists"
        });

        const newUser = await User.create({
            userName: user.userName,
            fullName: user.fullName,
            email: user.email,
            password: user.password
        });

        return res.status(201).json({
            success: true,
            message: "User created successfully",
        });
    } catch (error) {
        console.log("Error in authController (register)", error.message)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

export const login = async (req, res) => {
    const user = req.body;

    if(!user.email || !user.password) {
        return res.status(400).json({message: "All fields are required"});
    }

    if(!validator.isEmail(user.email) || !validator.contains(user.email, "ves.ac.in")) {
        return res.status(400).json({message: "Invalid email"});
    }

    try {
        const existingUser = await User.findOne({email: user.email});

        if(!existingUser) return res.status(404).json({message: "Invalid credentials"});

        if(existingUser.password !== user.password) return res.status(400).json({
            success: false,
            message: "Invalid credentials"
        });

        const token = jwt.sign({user: req.user}, JWT_SECRET, {expiresIn: "1h"});

        if(!token) return res.status(500).json({message: "Failed to generate token"});

        return res.cookie("token", token, {
            httpOnly: true, 
            secure: true, 
            sameSite: "strict",
            maxAge: 24*60*60*1000
        })
        .status(200)
        .json({
            success: true,
            message: "Login successful",
            payload: {
                userName: existingUser.userName,
                fullName: existingUser.fullName
            }
        });
    } catch (error) {
        console.log("Error in authController (login)", error.message)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}

export const logout = (req, res) => {
    try {
        if(!req.cookies.token) return res.status(401).json({message: "Unauthorized"});
        const validate = jwt.verify(req.cookies.token, JWT_SECRET);
        if(!validate) return res.status(401).json({message: "Unauthorized"});
        
        return res
            .clearCookie("token")
            .status(200)
            .json({message: "Logout successful"});
    } catch (error) {
        console.log("Error in authController (logout)", error.message)
        return res.status(500).json({message: "Internal Server Error"});
    }
}