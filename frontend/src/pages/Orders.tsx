import { useState, useEffect } from "react";
import type { Order } from "../types/order";


const Orders = () => {

    const[orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        const fetchOrders = async() => {
            try{

                const token = localStorage.getItem("token");
                const response = await fetch("http://localhost:5000/api/order", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                });

                const result = await response.json();
                setOrders(result.orders);

            } catch(error){
                console.error(error);
            }
        }

        fetchOrders();
    }, []);
    
    return (
        <main>
        <h1>Your Orders</h1>
        
        {orders.map((order) => (
            <div key={order.id}>
                <h2>Order #{order.id} </h2>

                <p>Total: £{order.totalAmount}</p>

                <p>Status: {order.status} </p>

                <p>
                    Date: {new Date(order.createdAt).toLocaleDateString()}
                </p>

                {order.items.map((item) => (
                    <div key={item.id}>
                        <p>Product ID: {item.productId}</p>
                        <p>Quantity: {item.quantity}</p>
                        <p>Price: £{item.price}</p>
                    </div>
                ))}
            </div>
        ))}
        </main>
    );
}

export default Orders;