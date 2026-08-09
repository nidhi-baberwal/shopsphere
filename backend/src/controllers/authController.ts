import { Request, Response } from "express";
import prisma from "../config/prisma";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

//register
export const register = async (
    req: Request,
    res: Response
) => {
    try{
        //get user data from frontend
        const { name, email, password } = req.body;

        //check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if(existingUser) {
            return res.status(400).json({
                message: "Email already registered"
            });
        }

        //hash password before storing
        const hashedPassword = await bcrypt.hash(password,10);

        //create user in database
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        });

        //sending response
        return res.status(201).json({
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });

    } catch(error){
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong"
        });

    }

};

//login
export const login = async(
    req: Request,
    res: Response
) => {
    try{

    //get login data from frontend
     const{ email, password } = req.body;

     //find user by email
     const user = await prisma.user.findUnique({
        where: {
            email
        }
    });

     //user doesn't exist
     if(!user) {
        return res.status(401).json({
            message: "Invalid email or password"
        });
     }

     //compare entered password with hashed password
     const isPasswordValid = await bcrypt.compare(
        password,
        user.password
     );

     //password is not valid
     if (!isPasswordValid) {
    return res.status(401).json({
        message: "Invalid email or password"
    });
}
    
    //create token
     const token = jwt.sign(
        {userId: user.id},
        process.env.JWT_SECRET as string,
        {expiresIn: "7d"}
     );

     //send token to frontend

     return res.status(200).json({
        message: "Login successful",
        token, 
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        }
     });
     
    } catch(error){
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong"
        });
    }
};