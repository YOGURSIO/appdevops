import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';

// Componentes
import Header from './components/Header';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';

const API_URL = '/api';

function App() {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar productos al iniciar
  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const response = await axios.get(`${API_URL}/productos`);
        setProductos(response.data);
      } catch (error) {
        console.error('Error cargando productos:', error);
      } finally {
        setLoading(false);
      }
    };

    cargarProductos();
  }, []);

  // Funciones del carrito
  const agregarAlCarrito = (producto, cantidad = 1) => {
    setCarrito(carritoActual => {
      const productoExistente = carritoActual.find(item => item.id === producto.id);
      
      if (productoExistente) {
        return carritoActual.map(item =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        );
      } else {
        return [...carritoActual, { ...producto, cantidad }];
      }
    });
  };

  const actualizarCantidad = (id, nuevaCantidad) => {
    if (nuevaCantidad <= 0) {
      eliminarDelCarrito(id);
    } else {
      setCarrito(carritoActual =>
        carritoActual.map(item =>
          item.id === id ? { ...item, cantidad: nuevaCantidad } : item
        )
      );
    }
  };

  const eliminarDelCarrito = (id) => {
    setCarrito(carritoActual => carritoActual.filter(item => item.id !== id));
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const calcularTotal = () => {
    return carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
  };

  if (loading) {
    return (
      <div className="loading">
        <h2>Cargando productos...</h2>
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        <Header cantidadCarrito={carrito.reduce((total, item) => total + item.cantidad, 0)} />
        
        <main className="main-content">
          <Routes>
            <Route 
              path="/" 
              element={
                <ProductList 
                  productos={productos} 
                  agregarAlCarrito={agregarAlCarrito} 
                />
              } 
            />
            <Route 
              path="/producto/:id" 
              element={
                <ProductDetail 
                  productos={productos}
                  agregarAlCarrito={agregarAlCarrito} 
                />
              } 
            />
            <Route 
              path="/carrito" 
              element={
                <Cart 
                  carrito={carrito}
                  actualizarCantidad={actualizarCantidad}
                  eliminarDelCarrito={eliminarDelCarrito}
                  calcularTotal={calcularTotal}
                />
              } 
            />
            <Route 
              path="/checkout" 
              element={
                <Checkout 
                  carrito={carrito}
                  calcularTotal={calcularTotal}
                  vaciarCarrito={vaciarCarrito}
                />
              } 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;