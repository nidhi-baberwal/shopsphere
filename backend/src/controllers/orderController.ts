import { Request, Response } from "express";
import prisma from "../config/prisma";

export const createOrder = async(
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

        //Find the user's cart
        const cart = await prisma.cart.findUnique({
            where: {
                userId,
            },
            include: {
                items: {
                    include: {
                    product: true,
                    },
                },
            },
        });

        //check if cart exists
        if(!cart){
            return res.status(404).json({
                message: "Cart not found",
            });
        }

        //check if cart is empty
        if(cart.items.length === 0){
            return res.status(400).json({
                message: "Cart is empty",
            });
        }

        //calculate total amount
        const totalAmount = cart.items.reduce(
            (total, item) => 
                total + Number(item.product.price) * item.quantity,
            0
        );

        //create order
        const order = await prisma.order.create({
            data: {
                userId,
                totalAmount,
                status: "PENDING",

                items: {
                    create: cart.items.map((item) => ({
                        productId: item.productId,
                        quantity: item.quantity,
                        price: item.product.price,
                    })),
                },
            },
            include: {
                items: true,
            },
        });

        //clear cart if order is created
        await prisma.cartItem.deleteMany({
            where: {
                cartId: cart.id,
            },
        });

        return res.status(201).json({
            message: "Order created successfully",
            order,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Failed to create order",
        });
    }
};