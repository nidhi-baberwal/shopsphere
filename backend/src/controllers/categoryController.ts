import { Request, Response } from "express";
import prisma from "../config/prisma";

export const createCategory = async(
    req: Request,
    res: Response
) => {
    try{
        console.log( "CREATE CATEGORY CONTROLLER CALLED");

        const { name } = req.body;

        const category = await prisma.category.create({
            data: {
                name,
            },
        })
        return res.status(200).json({
            message: "category created successfully",
            category,
        });

    } catch (error){
        console.error("CREATE CATEGORY ERROR:", error);

        return res.status(500).json({
            message: "failed to create category",
        });
    }
}