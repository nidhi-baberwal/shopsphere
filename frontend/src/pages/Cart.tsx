import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { CartItem } from "../types/cart";

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

            const response = await fetch("http://localhost:5000/api/cart", {
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
            : cartItem.quantity - 1;

    try{
        const token = localStorage.getItem("token");

        const response = await fetch(`http://localhost:5000/api/cart/${cartItem.productId}`, {
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

        const response = await fetch(`http://localhost:5000/api/cart/${cartItem.productId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
           });

        const result = await response.json();
        console.log(result); 

        setCartItems((currentItem) => 
             currentItem.filter((item) => {
                item.id !== cartItem.id
            })
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

        const response = await fetch("http://localhost:5000/api/order", {
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
        <main>
        <h1>Your Cart</h1>

        {cartItems.map((cartItem) => (
            <div key ={cartItem.id}>
        <img
        src={cartItem.product.image}
        alt={cartItem.product.name}
        />

        <h2>{cartItem.product.name}</h2>

        <p>£{cartItem.product.price}</p>

        <button onClick={() => handleQuantityChange(cartItem, "increase")}>
            +
        </button>

        <p>{cartItem.quantity}</p>

        <button onClick={() => handleQuantityChange(cartItem, "decrease")}>
            -
        </button>

        <button onClick={() => handleRemoveItem(cartItem)}>
           Remove
        </button>

        <p>Total: £{Number(cartItem.product.price) * cartItem.quantity}</p>

       </div>

        ))}

        <p> Cart Total: £{cartTotal.toFixed(2)} </p>

        {cartItems.length > 0 && (
            <button onClick={handleCheckout}>
            Checkout
        </button>
        )}

        </main>
    );
}

export default Cart;