import { Request, Response } from "express";
import prisma from "../config/prisma";
import bcrypt from "bcrypt";

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