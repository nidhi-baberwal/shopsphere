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


//get all user orders
export const getOrders = async(
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

        const orders = await prisma.order.findMany({
            where: {
                userId,
            },
            include: {
                items: true,
            },
        });

        return res.status(200).json({
            orders,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Failed to get orders",
        });
    }
};

//get one order
export const getOrderById = async(
    req: Request,
    res: Response
) => {
    try{

        const userId = req.userId;
        const orderId = Number(req.params.id);

        if(!userId){
            return res.status(401).json({
                message: "User not authenticated",
            });
        }

        const order = await prisma.order.findFirst({
            where: {
                id: orderId,
                userId: userId,
            },
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
            },
        });

        if(!order){
            return res.status(404).json({
                message: "Order not found",
            });
        }

        return res.status(200).json({
            order,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Failed to get order",
        });
    }
};

//update order status
export const updateOrderStatus = async(
    req: Request,
    res: Response
) => {
    try{

        const userId = req.userId;
        const orderId = Number(req.params.id);
        const{ status } = req.body;

        const validStatuses = [
           "PENDING",
           "PROCESSING",
           "SHIPPED",
           "DELIVERED",
           "CANCELLED",
        ];

        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                message: "Invalid order status",
            });
        }

        if(!userId){
            return res.status(401).json({
                message: "User not authenticated",
            });
        }

        if(!status){
            return res.status(400).json({
                message: "Status is required",
            });
        }

        const order = await prisma.order.findFirst({
            where: {
                id: orderId,
                userId: userId,
            },
            include: {
                items: true,
            },
        });

        if(!order){
            return res.status(404).json({
                message: "Order not found",
            });
        }

        const updatedOrder = await prisma.order.update({
            where: {
                id: orderId,
            },
            data: {
                status,
            },
        });

        return res.status(200).json({
            order: updatedOrder,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Failed to update order status",
        });
    }
};
