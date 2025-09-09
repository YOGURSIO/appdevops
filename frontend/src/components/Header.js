import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = ({ cantidadCarrito }) => {
  // Versión hardcodeada que cambiaremos para cada build
  const version = 'blue';
  
  return (
    <header className={`header ${version === 'green' ? 'version-green' : ''}`}>
      <div className="container">
        <Link to="/" className="logo">
          <h1>🛍️ Tienda Online</h1>
          <span className="version-badge">version: {version}</span>
        </Link>
        
        <nav className="nav">
          <Link to="/" className="nav-link">Productos</Link>
          <Link to="/carrito" className="nav-link cart-link">
            🛒 Carrito
            {cantidadCarrito > 0 && (
              <span className="cart-badge">{cantidadCarrito}</span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
