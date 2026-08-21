import { useEffect, useState } from "react";
import { useParams} from "react-router-dom";
import type { Product } from "../types/product";
import "../styles/ProductDetails.css";

const ProductDetails = () => {

    const { id } = useParams();

    const[product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        const fetchProduct = async() => {
            try{
                const response = await 
                          fetch(`http://localhost:5000/api/products/${id}`);

                const data = await response.json();

                setProduct(data.product);

            } catch(error) {
                console.error("Failed to fetch product:", error);
            }
        };

        fetchProduct();

    }, [id]);

    if(!product){
        return <p>...Loading</p>
    }

    return (
        <main className="product-details">
            <div className="product-details-image">
                <img src={product.image} alt={product.name} />
            </div>

            <div className="product-details-info">
           <h1>{product.name}</h1>

           <p className="product-details-brand">
            {product.brand}
            </p>

           <p className="product-details-price">
             £{product.price}
            </p>

           <p>{product.description}</p>

           <p>
            Category: {product.category?.name}
           </p>

           <p>
            Stock: {product.stock}
           </p>

           </div>
        </main>
    );
};

export default ProductDetails;