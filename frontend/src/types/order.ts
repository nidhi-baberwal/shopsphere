export interface OrderItem {
    id: number;
    price: string;
    orderId: number;
    productId: number;
    quantity: number;
}

export interface Order {
    id: number;
    userId: number;
    totalAmount: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    items: OrderItem[];
}