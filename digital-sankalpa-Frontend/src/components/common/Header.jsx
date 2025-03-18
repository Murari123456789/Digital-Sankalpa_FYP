import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";
import { User, Heart, ShoppingCart } from "lucide-react"; // ✅ Import proper icons

const Header = () => {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      let queryParams = `query=${encodeURIComponent(searchQuery)}`;
      if (selectedCategory !== "All Categories") {
        queryParams += `&category=${encodeURIComponent(selectedCategory)}`;
      }
      navigate(`/products?${queryParams}`);
    }
  };

  return (
    <header className="bg-purple-700 shadow-sm">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="flex justify-between items-center py-2 border-b border-purple-500">
          <div className="flex gap-4 text-sm text-white">
            {user ? (
              <>
                <button onClick={logout} className="hover:text-purple-300">Sign Out</button>
                <span>|</span>
                <Link to="/profile" className="hover:text-purple-300">My Account</Link>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-purple-300">Sign In</Link>
                <span>|</span>
                <Link to="/register" className="hover:text-purple-300">Create an Account</Link>
              </>
            )}
            <span>|</span>
            <Link to="/contact" className="hover:text-purple-300">Contact Us</Link>
          </div>
          <div>
            <Link to="/warranty" className="text-white text-sm hover:underline">Extended Warranty</Link>
          </div>
        </div>

        {/* Main Header */}
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-white font-bold text-xl">
            Digital Sankalpa
          </Link>

          {/* Search Bar */}
          <div className="w-1/2 relative">
            <form onSubmit={handleSearch} className="flex">
              <div className="relative w-full flex">
                <div className="relative min-w-[200px]">
                  <select
                    className="appearance-none w-full bg-purple-600 border border-purple-500 rounded-l-md py-3 pl-5 pr-10 text-white text-lg leading-tight focus:outline-none focus:border-purple-300"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option>All Categories</option>
                    <option>Printers</option>
                    <option>Accessories</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="Search products..."
                  className="flex-grow border-y border-r border-purple-500 py-2 px-4 bg-purple-600 text-white focus:outline-none focus:border-purple-300"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button 
                  type="submit" 
                  className="bg-purple-500 text-white px-4 py-2 rounded-r-md hover:bg-purple-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </form>
          </div>

          {/* Icons Section */}
          <div className="flex items-center gap-6">
            <div className="text-right">
              <div className="text-sm text-purple-300">CALL US NOW</div>
              <div className="font-semibold text-white">9855080600</div>
            </div>

            {/* Profile Icon */}
            <Link to="/profile" className="text-white hover:text-purple-300">
              <User size={24} />
            </Link>

            {/* Wishlist Icon */}
            <Link to="/wishlist" className="text-white hover:text-purple-300">
              <Heart size={24} />
            </Link>

            {/* Cart Icon */}
            <Link to="/cart" className="relative text-white hover:text-purple-300">
              <ShoppingCart size={24} />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-purple-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Navigation */}
        <nav className="py-3 border-t border-purple-500">
          <ul className="flex space-x-6 text-sm text-white">
            <li><Link to="/products" className="hover:text-purple-300">All Products</Link></li>
            <li><Link to="/sales" className="hover:text-purple-300">Sale</Link></li>
            <li><Link to="/locations" className="hover:text-purple-300">Locations</Link></li>
            <li><Link to="/warranty" className="hover:text-purple-300">Warranty</Link></li>
            <li><Link to="/contact" className="hover:text-purple-300">Contact</Link></li>
            {user?.isAdmin && (
              <li><Link to="/admin" className="hover:text-purple-300">Admin Dashboard</Link></li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
