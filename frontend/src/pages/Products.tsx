import { useEffect, useState } from "react";
import type { Product, ProductsResponse } from "../types/product";

const Products = () => {

    const[products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProducts = async() => {
            try{
                const response = await fetch("http://localhost:5000/api/products");

                const data: ProductsResponse = await response.json();

                setProducts(data.products);

            } catch(error){
                console.error("Failed to fetch products:", error);
            }
        };

        fetchProducts();
    }, []);

    console.log(products);

    return (
       <main>
        <h1>Products</h1>
       </main>
    );
}

export default Products;