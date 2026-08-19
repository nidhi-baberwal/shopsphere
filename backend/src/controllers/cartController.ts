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

//add to cart
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
};

//get current logged user's cart
export const getCart = async(
    req: Request,
    res: Response
) => {
    try{
        const userId = req.userId;

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

        if(!cart){
            return res.status(404).json({
                message: "Cart not found",
            });
        }

        return res.status(200).json({
            message: "Cart fetched successfully",
            cart,
        });
        
    } catch(error){
        console.error(error);

        return res.status(500).json({
            message: "Failed to get cart",
        });
    }
};

//update product quantity
export const updateCartItem = async(
    req: Request,
    res: Response
) => {
    try{
        const userId = req.userId;

        const productId = Number(req.params.productId);

        const { quantity } = req.body;

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

        const cartItem = await prisma.cartItem.findFirst({
            where: {
                cartId: cart.id,
                productId: productId,
            },
        });

        if(!cartItem){
            return res.status(404).json({
                message: "Product is not found in cart",
            });
        }

        const updatedCartItem = await prisma.cartItem.update({
            where: {
                id: cartItem.id,
            },
            data: {
                quantity,
            },
        });

        return res.status(200).json({
            message: "CartItem updated successfully",
            cartItem: updatedCartItem,
        });

    } catch(error){
        console.error(error)

        return res.status(500).json({
            message: "Something went wrong",
        });
    }
};

//delete product from cart
export const deleteCartItem = async(
    req: Request,
    res: Response
) => {
    try{
        const userId = req.userId;

        const productId = Number(req.params.productId);

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

        const cartItem = await prisma.cartItem.findFirst({
            where: {
                cartId: cart.id,
                productId: productId,
            },
        });

        if(!cartItem){
            return res.status(404).json({
                message: "Product is not found in cart",
            });
        }

       await prisma.cartItem.delete({
        where: {
            id:cartItem.id,
        },
       });

        return res.status(200).json({
            message: "product removed from cart successfully",
        });

    } catch(error){
        console.error(error)

        return res.status(500).json({
            message: "Something went wrong",
        });
    }
};