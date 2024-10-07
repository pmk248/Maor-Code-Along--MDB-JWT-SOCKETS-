import { Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";
import User from "../models/User"
import bcrypt from "bcrypt";


export const registerUser = async(req: Request, res: Response): Promise<void> => {
    try {
        const {username, email, password} = req.body;
        // checking if user exists
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            res.status(400).json({ message: "Email already registered!" });
            return;
        }
        // hash password
        const hashPassword = await bcrypt.hash(password, 10)
        // create a new user
        const newUser = new User({
            username,
            email,
            password: hashPassword
        });
        await newUser.save();
        res.status(201).json({ message: "registered successfully" });

    } catch(error) {
        res.status(500).json({ message: "error registering User!" });
        console.error(error);
    }
}

export const loginUser = async (): Promise<void> => {

}