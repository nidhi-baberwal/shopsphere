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

export const addToCart = async(
    req: Request,
    res: Response
) => {
    try{

        const userId = req.userId;

        if(!userId){
            return res.status(401).json({
                message: "User not authenticated",
            });
        }

        const{ productId, quantity} = req.body;

        if(!productId || !quantity){
            return res.status(400).json({
                message: "ProductId and quantity both are required",
            });
        }

        const cart = await prisma.cart.findUnique({
            where: {
                userId,
            },
        });

        if(!cart){
            return res.status(404).json({
                message: "Cart not found",
            });
        }

        const product = await prisma.product.findUnique({
            where: {
                id: productId,
            },
        });

        if(!product){
            return res.status(404).json({
                message: "Product not found",
            });
        }

        const cartItem = await prisma.cartItem.create({
            data: {
                cartId: cart.id,
                productId,
                quantity,
            },
        });

        return res.status(200).json({
            message: "Product added to cart successfully",
            cartItem,
        });

    } catch(error){
        console.error(error);

        return res.status(500).json({
            message: "Failed to add product to cart",
        });
    }
}