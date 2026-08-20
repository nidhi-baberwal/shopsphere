import { Link } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
    return (
      <main>
        <section className="hero">
            <div className="hero-content">
                <h1>Discover Your Style</h1>

                <p>
                    Explore the latest fashion trends and find products you'll love.
                </p>

                <button>Shop Now</button>
            </div>

        </section>

        <section className="categories">
            <h2>Shop By Category</h2>

            <div className="category-list">
                <Link to="/products?category=women" className="category-card">
                    <img src="/images/women.jpg" alt="Women's fashion" />
                    <h3>Women</h3>
                </Link>

                <Link to="/products?category=men" className="category-card">
                    <img src="/images/men.jpg" alt="Men's fashion" />
                    <h3>Men</h3>
                </Link>

                <Link to="/products?category=kids" className="category-card">
                    <img src="/images/kids.jpg" alt="Kids fashion" />
                    <h3>Kids</h3>
                </Link>

                <Link to="/products?category=home" className="category-card">
                    <img src="/images/home.jpg" alt="Home accessories" />
                    <h3>Home</h3>
                </Link>

            </div>

        </section>
      </main>
    );
}

export default Home;