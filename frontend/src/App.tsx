import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Navbar from "./components/Navbar";

function App() {

  const[cartCount, setCartCount] = useState(0);

  return (
   <BrowserRouter>
   <Navbar cartCount={cartCount} />
   
   <Routes>
    <Route path="/" element={<Home />} /> 
    <Route path="/login" element={<Login/>} /> 
    <Route path="/register" element={<Register />} /> 
    <Route path="/products" element={<Products />} /> 

    <Route path="/products/:id" 
    element={<ProductDetails setCartCount={setCartCount} />} />

    <Route path="/cart" 
    element={<Cart setCartCount={setCartCount}/>} />

    <Route path="/orders" element={<Orders />} /> 
   </Routes>
   
   </BrowserRouter>
  );
}

export default App;