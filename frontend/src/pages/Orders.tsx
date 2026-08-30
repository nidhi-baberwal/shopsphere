import { useState, useEffect } from "react";
import type { Order } from "../types/order";
import "../styles/Orders.css";


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
        <main className="orders-page">
        
        <div className="orders-header">
            <h1>Your Orders</h1>
            <p>Track and view your recent purchases</p>
        </div>


        <div className="orders-container">
        {orders.map((order) => (
            <div className="order-card" key={order.id}>

                <div className="order-header">

                    <div>
                        <span className="order-label">Order</span>
                        <h2>Order #{order.id} </h2>
                    </div>

                    <span className={`order-status ${order.status.toLowerCase()}`}>
                        {order.status}
                    </span>

                </div>

                <div className="order-info">

                    <div>
                        <span>Order Date</span>
                        <strong>
                            {new Date(order.createdAt).toLocaleDateString()}
                        </strong>
                    </div> 

                    <div>
                        <span>Total Amount</span>
                        <strong>{order.totalAmount}</strong>
                    </div>

                </div>  

                <div className="order-items">

                    <h3>Order Items</h3> 

                    {order.items.map((item) => (
                    <div className="order-item" key={item.id}>

                        <div className="order-icon">
                            🛍️ 
                        </div>

                        <div className="item-details">
                        <strong>Product #{item.productId}</strong>
                        <span>Quantity: {item.quantity}</span>
                        </div>

                        <strong className="item-price">
                            £{item.price}
                        </strong>

                    </div>
                ))}

                </div>
            </div>
        ))}

        </div>

        </main>
    );
};

export default Orders;