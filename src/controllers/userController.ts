import { Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";
import Iuser from "../models/User"
import bcrypt from "bcrypt";


export const registerUser = async(req: Request, res: Response): Promise<void> => {
    try {
        const {username, email, password} = req.body;
        // checking if user exists
        const existingUser = await Iuser.findOne({ email })
        if (existingUser) {
            res.status(400).json({ message: "Email already registered!" });
            return;
        }
        // hash password
        const hashPassword = await bcrypt.hash(password, 10)
        // create a new user
        const newUser = new Iuser({
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

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        const user = await Iuser.findOne({ email });
        if (!user) {
            res.status(400).json({ message: "Username or Password is incorrect!" });
            return;
        }
        // check if password is correct
        const passwordIsCorrect = await bcrypt.compare(password, user.password);
        if (!passwordIsCorrect) {
            res.status(400).json({ message: "Username or Password is incorrect!" });
            return;
        }
        // generate JWT
        const token = jsonwebtoken.sign({ id: user._id }, "my_secret", {expiresIn: "4h"});
        res.json({ token });
    } catch(error) { 
        res.status(500).json({ message: "error logging in!" });
        console.error(error);
    }
}