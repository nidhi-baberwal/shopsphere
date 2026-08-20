export interface Category{
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
}

export interface Product{
    id: number;
    name: string;
    brand: string;
    price: string;
    image: string;
    stock: number;
    categoryId: number;
    description: string;
    createdAt: string;
    updatedAt: string;
    category: Category;
}

export interface ProductsResponse{
    products: Product[];
}