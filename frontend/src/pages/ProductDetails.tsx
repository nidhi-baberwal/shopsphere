import { useEffect, useState } from "react";
import { useParams} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import type { Product } from "../types/product";
import "../styles/ProductDetails.css";

interface ProductDetailsProps {
        setCartCount: React.Dispatch<React.SetStateAction<number>>;
    }

const ProductDetails = ({setCartCount}: ProductDetailsProps) => {

    const { id } = useParams();

    const[product, setProduct] = useState<Product | null>(null);

    const navigate = useNavigate();

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

   const handleCart = async() => {
    try{
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:5000/api/cart/items", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                productId: Number(id),
                quantity: 1,
            }),
        });

        const result = await response.json();
        console.log(result);

        if(!response.ok){
            throw new Error(result.message || "Cart failed")
        }

        setCartCount((previousCount) => previousCount + 1);

        navigate("/cart");

    } catch(error){
        console.error(error);
    }
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

           <button 
           className="add-to-cart-btn"
           onClick={handleCart}
           >
            Add to Cart
           </button>

           </div>
        </main>
    );
};

export default ProductDetails;