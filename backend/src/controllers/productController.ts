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

//get only one product
export const getProductById = async(
    req: Request,
    res: Response
) => {
    try{

        const { id } = req.params;

        const product = await prisma.product.findUnique({
            where: {
                id: Number(id),
            },
        });
        
        if(!product){
            return res.status(404).json({
                message: "Product Not Found",
            });
        }

        return res.status(200).json({
            message: "Product fetched successfully",
            product
        });

    } catch(error){
        console.error(error);

        return res.status(500).json({
            message: "Failed to fetch product"
        });
    }
};

//update product
export const updateProduct = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const {
      name,
      brand,
      description,
      price,
      image,
      stock,
      categoryId,
    } = req.body;

    const product = await prisma.product.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        brand,
        description,
        price,
        image,
        stock,
        categoryId,
      },
    });

    return res.status(200).json({
      message: "Product updated successfully",
      product,
    });

  } catch (error) {
    console.error("UPDATE PRODUCT ERROR:", error);

    return res.status(500).json({
      message: "Failed to update product",
    });
  }
};

//delete product
export const deleteProduct = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    await prisma.product.delete({
      where: {
        id: Number(id),
      },
    });

    return res.status(200).json({
      message: "Product deleted successfully",
    });

  } catch (error) {
    console.error("DELETE PRODUCT ERROR:", error);

    return res.status(500).json({
      message: "Failed to delete product",
    });
  }
};