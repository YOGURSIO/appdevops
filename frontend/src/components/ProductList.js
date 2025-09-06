import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ProductList.css';

const ProductList = ({ productos, agregarAlCarrito }) => {
  const [categoriaFiltro, setCategoriaFiltro] = useState('todas');
  
  // Obtener categorías únicas
  const categorias = ['todas', ...new Set(productos.map(p => p.categoria))];
  
  // Filtrar productos
  const productosFiltrados = categoriaFiltro === 'todas' 
    ? productos 
    : productos.filter(p => p.categoria === categoriaFiltro);

  const manejarAgregarCarrito = (e, producto) => {
    e.preventDefault();
    e.stopPropagation();
    agregarAlCarrito(producto);
  };

  return (
    <div className="product-list">
      <div className="container">
        <h2>Nuestros Productos</h2>
        
        {/* Filtros */}
        <div className="filters">
          <label>Filtrar por categoría:</label>
          <select 
            value={categoriaFiltro} 
            onChange={(e) => setCategoriaFiltro(e.target.value)}
          >
            {categorias.map(categoria => (
              <option key={categoria} value={categoria}>
                {categoria.charAt(0).toUpperCase() + categoria.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Lista de productos */}
        <div className="products-grid">
          {productosFiltrados.map(producto => (
            <div key={producto.id} className="product-card">
              <Link to={`/producto/${producto.id}`} className="product-link">
                <div className="product-image">
                  <img src={producto.imagen_url} alt={producto.nombre} />
                </div>
                <div className="product-info">
                  <h3>{producto.nombre}</h3>
                  <p className="product-category">{producto.categoria}</p>
                  <p className="product-description">{producto.descripcion}</p>
                  <div className="product-footer">
                    <span className="product-price">${producto.precio}</span>
                    <span className="product-stock">Stock: {producto.stock}</span>
                  </div>
                </div>
              </Link>
              <button 
                className="add-to-cart-btn"
                onClick={(e) => manejarAgregarCarrito(e, producto)}
                disabled={producto.stock === 0}
              >
                {producto.stock === 0 ? 'Sin Stock' : 'Agregar al Carrito'}
              </button>
            </div>
          ))}
        </div>

        {productosFiltrados.length === 0 && (
          <div className="no-products">
            <p>No hay productos disponibles en esta categoría.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
