import { useEffect, useState } from "react";
import type { Product, ProductsResponse } from "../types/product";
import "../styles/Products.css";
import { Link } from "react-router-dom";

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
       <main className="product-page">
        <h1>Products</h1>

        <div className="product-grid">
        {products.map((product) => (
            <Link 
            to={`/products/${product.id}`} 
            className="product-card" 
            key={product.id}>
                <img 
                src={product.image}
                alt={product.name}
                />

                <div className="product-info">
                <h2>{product.name}</h2>
                <p className="product-brand">{product.brand}</p>
                <p className="product-price">£{product.price}</p>
            </div>
            </Link>
        ))}
        </div>
       </main>
    );
}

export default Products;