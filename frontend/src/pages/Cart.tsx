import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { CartItem } from "../types/cart";
import "../styles/Cart.css";
import API_URL from "../config/api";

interface CartProps{
    setCartCount: React.Dispatch<React.SetStateAction<number>>
}

const Cart = ({setCartCount} : CartProps) => {
    const[cartItems, setCartItems] = useState<CartItem[]>([]);

    const navigate = useNavigate();

   useEffect(() => {
    const fetchProducts = async() => {

        try{
            const token = localStorage.getItem("token");

            const response = await fetch(`${API_URL}/api/cart`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                
            });

            const result = await response.json();

            console.log(result.cart);

            setCartItems(result.cart.items);

            const totalQuantity = result.cart.items.reduce(
                (total:number, item: CartItem) => 
                    total + item.quantity,
                0
            );

            setCartCount(totalQuantity);

        } catch(error){
            console.error(error);
        }
    };
         fetchProducts();
 }, [setCartCount]);

 const handleQuantityChange = async(
    cartItem: CartItem,
    action: "increase" | "decrease"
) => {

    const newQuantity = 
        action=== "increase" 
            ? cartItem.quantity + 1
            : Math.max(1, cartItem.quantity - 1);

    try{
        const token = localStorage.getItem("token");

        const response = await fetch(`${API_URL}/api/cart/${cartItem.productId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                quantity: newQuantity,
            }),
        });

        const result = await response.json();
        console.log(result);

        setCartItems((currentItems) =>
                currentItems.map((item) => {
                    if(item.id === result.cartItem.id){
                        return{
                            ...item,
                            quantity: result.cartItem.quantity,
                        };
                    }
                    return item;
                })
            );

            setCartCount((previousCount) => 
             action === "increase"
            ? previousCount + 1
            : previousCount -1
            );

    } catch(error) {
        console.error(error);
    }
 }

 const handleRemoveItem = async(cartItem: CartItem) => {
    try{

        const token = localStorage.getItem("token");

        const response = await fetch(`${API_URL}/api/cart/${cartItem.productId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
           });

        const result = await response.json();
        console.log(result); 

        setCartItems((currentItem) => 
             currentItem.filter((item) => item.id !== cartItem.id)
        );

        setCartCount((previousCount) => 
            previousCount - cartItem.quantity
        );

    } catch(error){
        console.error(error);
    }
 }

 const cartTotal = cartItems.reduce((total, cartItem) => {
       return total + Number(cartItem.product.price) * cartItem.quantity;
 }, 0);

 const handleCheckout = async() => {
    try{

        const token = localStorage.getItem("token");

        const response = await fetch(`${API_URL}/api/order`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        });

        const result = await response.json();
        console.log("Response status:", response.status);
        console.log("Response OK:", response.ok);
        console.log("Result:", result);
        

        if(response.ok){
        console.log("Navigating to orders...");
        setCartItems([]);
        setCartCount(0);
        navigate("/orders");
        }

    } catch(error) {
        console.error(error);
    }
 }

    return (
        <main className="cart-page">
        <h1>Your Cart</h1>

        <div className="cart-container">

        {cartItems.map((cartItem) => (
            <div className="cart-item"
            key ={cartItem.id}>

        <img
        className="cart-item-image"
        src={cartItem.product.image}
        alt={cartItem.product.name}
        />

        <div className="cart-item-details">

        <h2>{cartItem.product.name}</h2>

        <p className="cart-item-price">
            £{cartItem.product.price}
        </p>

        <div className="quantity-controls">

        <button onClick={() => handleQuantityChange(cartItem, "decrease")}>
            -
        </button>

        <span>{cartItem.quantity}</span>

        <button onClick={() => handleQuantityChange(cartItem, "increase")}>
            +
        </button>

    </div>    

        <button
         className="remove-button"
         onClick={() => handleRemoveItem(cartItem)}>
           Remove
        </button>

    </div>    

        <p className="item-total">
            Total: £{Number(cartItem.product.price) * cartItem.quantity}</p>

    </div>

        ))}

    </div>

    <div className="cart-summary">
        <p> Cart Total: 
            <strong> £{cartTotal.toFixed(2)} </strong>
        </p>

        {cartItems.length > 0 && (
            <button
            className="checkout-button" 
            onClick={handleCheckout}>
            Checkout
        </button>
        )}

    </div>

</main>
    );
}

export default Cart;