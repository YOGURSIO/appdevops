import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './ProductDetail.css';

const ProductDetail = ({ productos, agregarAlCarrito }) => {
  const { id } = useParams();
  const [cantidad, setCantidad] = useState(1);
  
  const producto = productos.find(p => p.id === parseInt(id));

  if (!producto) {
    return (
      <div className="product-detail">
        <div className="container">
          <div className="error-message">
            <h2>Producto no encontrado</h2>
            <p>El producto que buscas no existe.</p>
            <Link to="/" className="back-link">← Volver a la tienda</Link>
          </div>
        </div>
      </div>
    );
  }

  const manejarAgregarCarrito = () => {
    agregarAlCarrito(producto, cantidad);
  };

  const manejarCambioCantidad = (e) => {
    const nuevaCantidad = parseInt(e.target.value);
    if (nuevaCantidad >= 1 && nuevaCantidad <= producto.stock) {
      setCantidad(nuevaCantidad);
    }
  };

  return (
    <div className="product-detail">
      <div className="container">
        <Link to="/" className="back-link">← Volver a la tienda</Link>
        
        <div className="product-detail-content">
          <div className="product-image-large">
            <img src={producto.imagen_url} alt={producto.nombre} />
          </div>
          
          <div className="product-info-detailed">
            <div className="product-category-badge">{producto.categoria}</div>
            <h1>{producto.nombre}</h1>
            <p className="product-description-full">{producto.descripcion}</p>
            
            <div className="product-price-large">${producto.precio}</div>
            
            <div className="product-stock-info">
              <span className={`stock-status ${producto.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                {producto.stock > 0 ? `✓ En stock (${producto.stock} disponibles)` : '✗ Sin stock'}
              </span>
            </div>

            {producto.stock > 0 && (
              <div className="add-to-cart-section">
                <div className="quantity-selector">
                  <label htmlFor="cantidad">Cantidad:</label>
                  <select 
                    id="cantidad"
                    value={cantidad} 
                    onChange={manejarCambioCantidad}
                  >
                    {[...Array(Math.min(producto.stock, 10))].map((_, i) => (
                      <option key={i + 1} value={i + 1}>{i + 1}</option>
                    ))}
                  </select>
                </div>
                
                <button 
                  className="add-to-cart-btn-large"
                  onClick={manejarAgregarCarrito}
                >
                  Agregar al Carrito ({cantidad} {cantidad === 1 ? 'unidad' : 'unidades'})
                </button>
              </div>
            )}

            <div className="product-features">
              <h3>Características:</h3>
              <ul>
                <li>✓ Envío gratis en compras superiores a $50</li>
                <li>✓ Garantía de satisfacción</li>
                <li>✓ Devoluciones hasta 30 días</li>
                <li>✓ Atención al cliente 24/7</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
