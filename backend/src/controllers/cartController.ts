import { Request, Response } from "express";
import prisma from "../config/prisma";

export const createCart = async(
    req: Request,
    res: Response
) => {
    try{
        
        const userId = req.userId;

        const existingCart = await prisma.cart.findUnique({
            where: {
                userId
            },
        });

        if(existingCart){
            return res.status(200).json({
                message: "Cart already exists",
            });
        }

        const cart = await prisma.cart.create({
            data: {
               userId,
            },
        });

        return res.status(200).json({
            message: "Cart created successfully",
            cart
        });

    } catch (error){
        console.error(error);

        return res.status(500).json({
            message:"Failed to create cart",
        });
    }
};