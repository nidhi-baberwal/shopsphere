import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import { 
    FaHome,
    FaUser,
    FaUserPlus,
    FaBoxOpen,
    FaShoppingCart,
    FaClipboardList }
    from "react-icons/fa";

interface NavbarProps{
    cartCount: number
}

const Navbar = ({cartCount} : NavbarProps) => {
    return (
        <nav className="navbar">
            <Link to="/" className="navbar-logo">Shopsphere</Link>

            <div className="navbar-links">
                <Link to="/">
                  <FaHome className="nav-icon" />
                   Home
                </Link>

                <Link to="/login">
                  <FaUser className="nav-icon" />
                  Login
                </Link>

                <Link to="/register">
                  <FaUserPlus className="nav-icon" />
                   Register
                </Link>

                <Link to="/products">
                  <FaBoxOpen className="nav-icon" />
                  Products
                </Link>

                <Link to="/cart">
                  <FaShoppingCart className="nav-icon" />
                  Cart {cartCount}
                </Link>

                <Link to="/orders">
                   <FaClipboardList className="nav-icon" />
                   Orders
                </Link>
                
            </div>
        </nav>
    );
}
export default Navbar;