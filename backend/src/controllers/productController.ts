import { Request, Response } from "express";
import prisma from "../config/prisma";

export const getProducts = async(
    req: Request,
    res: Response
) => {
    try{
        const products = await prisma.product.findMany({
            include :{
                category: true,
            },
        });

        return res.status(201).json({
            products,
        });

    } catch (error){
        console.error(error);

        return res.status(500).json({
            message: "Failed to fetch products",
        });
    }
};

export const createProduct = async(
    req: Request,
    res: Response
) => {
    try{

        const{
            name,
            description,
            price,
            stock,
            image,
            brand,
            categoryId
        } = req.body;

        const product = await prisma.product.create({
            data: {
                name,
                description,
                price,
                stock,
                image,
                brand,
                categoryId,
            },
        });

        return res.status(200).json({
            message: "Product created successfully",
            product,
        });

    } catch (error){
        console.error("GET PRODUCTS ERROR:", error);

        return res.status(500).json({
            message: "Failed to fetch product",
        });
    }
};