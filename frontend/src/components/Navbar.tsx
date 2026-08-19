import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
    return (
        <nav className="navbar">
            <Link to="/" className="navbar-logo">Shopsphere</Link>

            <div className="navbar-links">
                <Link to="/">Home</Link>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
                <Link to="/products">Products</Link>
                <Link to="/cart">Cart</Link>
                <Link to="/orders">Orders</Link>
                
            </div>
        </nav>
    );
}
export default Navbar;