import { useEffect, useState } from "react";
import type { CartItem } from "../types/cart";

const Cart = () => {
    const[cartItems, setCartItems] = useState<CartItem[]>([]);

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

        } catch(error){
            console.error(error);
        }
    };
         fetchProducts();
 }, []);

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

        setCartItems((currentItem) => {
            return currentItem.filter((item) => {
                item.id !== cartItem.id
            })
        });

    } catch(error){
        console.error(error);
    }
 }

 const cartTotal = cartItems.reduce((total, cartItem) => {
       return total + Number(cartItem.product.price) * cartItem.quantity;
 }, 0);

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

        <button>Checkout</button>
        </main>
    );
}

export default Cart;