import React from 'react';
import { Link } from 'react-router-dom';
import './Cart.css';

const Cart = ({ carrito, actualizarCantidad, eliminarDelCarrito, calcularTotal }) => {
  if (carrito.length === 0) {
    return (
      <div className="cart">
        <div className="container">
          <div className="empty-cart">
            <h2>Tu carrito está vacío</h2>
            <p>¡Agrega algunos productos para comenzar!</p>
            <Link to="/" className="continue-shopping-btn">
              Continuar Comprando
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="container">
        <h2>Mi Carrito</h2>
        
        <div className="cart-content">
          <div className="cart-items">
            {carrito.map(item => (
              <div key={item.id} className="cart-item">
                <div className="item-image">
                  <img src={item.imagen_url} alt={item.nombre} />
                </div>
                
                <div className="item-details">
                  <h3>{item.nombre}</h3>
                  <p className="item-category">{item.categoria}</p>
                  <p className="item-price">${item.precio}</p>
                </div>
                
                <div className="item-quantity">
                  <label>Cantidad:</label>
                  <div className="quantity-controls">
                    <button 
                      onClick={() => actualizarCantidad(item.id, item.cantidad - 1)}
                      disabled={item.cantidad <= 1}
                    >
                      -
                    </button>
                    <span>{item.cantidad}</span>
                    <button 
                      onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}
                      disabled={item.cantidad >= item.stock}
                    >
                      +
                    </button>
                  </div>
                </div>
                
                <div className="item-total">
                  <p className="subtotal">${(item.precio * item.cantidad).toFixed(2)}</p>
                </div>
                
                <div className="item-actions">
                  <button 
                    className="remove-btn"
                    onClick={() => eliminarDelCarrito(item.id)}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="cart-summary">
            <div className="summary-card">
              <h3>Resumen del Pedido</h3>
              
              <div className="summary-line">
                <span>Subtotal:</span>
                <span>${calcularTotal().toFixed(2)}</span>
              </div>
              
              <div className="summary-line">
                <span>Envío:</span>
                <span>{calcularTotal() >= 50 ? 'Gratis' : '$5.00'}</span>
              </div>
              
              <div className="summary-line total-line">
                <span>Total:</span>
                <span>${(calcularTotal() + (calcularTotal() >= 50 ? 0 : 5)).toFixed(2)}</span>
              </div>
              
              {calcularTotal() < 50 && (
                <div className="free-shipping-notice">
                  <p>💡 Agrega ${(50 - calcularTotal()).toFixed(2)} más para envío gratis</p>
                </div>
              )}
              
              <div className="checkout-actions">
                <Link to="/checkout" className="checkout-btn">
                  Proceder al Checkout
                </Link>
                <Link to="/" className="continue-shopping">
                  Continuar Comprando
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
