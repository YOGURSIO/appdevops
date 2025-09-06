import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Checkout.css';

const API_URL = 'http://localhost:5000/api';

const Checkout = ({ carrito, calcularTotal, vaciarCarrito }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
    ciudad: '',
    codigoPostal: ''
  });
  const [procesando, setProcesando] = useState(false);
  const [errores, setErrores] = useState({});

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error cuando el usuario empiece a escribir
    if (errores[name]) {
      setErrores(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validarFormulario = () => {
    const nuevosErrores = {};
    
    if (!formData.nombre.trim()) {
      nuevosErrores.nombre = 'El nombre es requerido';
    }
    
    if (!formData.email.trim()) {
      nuevosErrores.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      nuevosErrores.email = 'El email no es válido';
    }
    
    if (!formData.telefono.trim()) {
      nuevosErrores.telefono = 'El teléfono es requerido';
    }
    
    if (!formData.direccion.trim()) {
      nuevosErrores.direccion = 'La dirección es requerida';
    }
    
    if (!formData.ciudad.trim()) {
      nuevosErrores.ciudad = 'La ciudad es requerida';
    }
    
    if (!formData.codigoPostal.trim()) {
      nuevosErrores.codigoPostal = 'El código postal es requerido';
    }
    
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const manejarSubmit = async (e) => {
    e.preventDefault();
    
    if (!validarFormulario()) {
      return;
    }
    
    setProcesando(true);
    
    try {
      const pedidoData = {
        cliente_email: formData.email,
        cliente_nombre: formData.nombre,
        cliente_telefono: formData.telefono,
        direccion_envio: `${formData.direccion}, ${formData.ciudad}, ${formData.codigoPostal}`,
        total: calcularTotal() + (calcularTotal() >= 50 ? 0 : 5),
        productos: carrito.map(item => ({
          producto_id: item.id,
          cantidad: item.cantidad,
          precio: item.precio
        }))
      };
      
      const response = await axios.post(`${API_URL}/pedidos`, pedidoData);
      
      // Mostrar mensaje de éxito
      alert(`¡Pedido creado exitosamente! ID del pedido: ${response.data.pedido_id}`);
      
      // Vaciar carrito y redirigir
      vaciarCarrito();
      navigate('/');
      
    } catch (error) {
      console.error('Error creando pedido:', error);
      alert('Error al procesar el pedido. Por favor, intenta nuevamente.');
    } finally {
      setProcesando(false);
    }
  };

  const total = calcularTotal();
  const envio = total >= 50 ? 0 : 5;
  const totalFinal = total + envio;

  if (carrito.length === 0) {
    return (
      <div className="checkout">
        <div className="container">
          <div className="empty-checkout">
            <h2>No hay productos en el carrito</h2>
            <p>Agrega algunos productos antes de hacer el checkout.</p>
            <button onClick={() => navigate('/')} className="back-to-shop-btn">
              Ir a la Tienda
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout">
      <div className="container">
        <h2>Finalizar Compra</h2>
        
        <div className="checkout-content">
          <div className="checkout-form">
            <form onSubmit={manejarSubmit}>
              <h3>Información de Envío</h3>
              
              <div className="form-group">
                <label htmlFor="nombre">Nombre Completo *</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={manejarCambio}
                  className={errores.nombre ? 'error' : ''}
                />
                {errores.nombre && <span className="error-text">{errores.nombre}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={manejarCambio}
                  className={errores.email ? 'error' : ''}
                />
                {errores.email && <span className="error-text">{errores.email}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="telefono">Teléfono *</label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={manejarCambio}
                  className={errores.telefono ? 'error' : ''}
                />
                {errores.telefono && <span className="error-text">{errores.telefono}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="direccion">Dirección *</label>
                <input
                  type="text"
                  id="direccion"
                  name="direccion"
                  value={formData.direccion}
                  onChange={manejarCambio}
                  className={errores.direccion ? 'error' : ''}
                />
                {errores.direccion && <span className="error-text">{errores.direccion}</span>}
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="ciudad">Ciudad *</label>
                  <input
                    type="text"
                    id="ciudad"
                    name="ciudad"
                    value={formData.ciudad}
                    onChange={manejarCambio}
                    className={errores.ciudad ? 'error' : ''}
                  />
                  {errores.ciudad && <span className="error-text">{errores.ciudad}</span>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="codigoPostal">Código Postal *</label>
                  <input
                    type="text"
                    id="codigoPostal"
                    name="codigoPostal"
                    value={formData.codigoPostal}
                    onChange={manejarCambio}
                    className={errores.codigoPostal ? 'error' : ''}
                  />
                  {errores.codigoPostal && <span className="error-text">{errores.codigoPostal}</span>}
                </div>
              </div>
              
              <button 
                type="submit" 
                className="submit-order-btn"
                disabled={procesando}
              >
                {procesando ? 'Procesando...' : 'Confirmar Pedido'}
              </button>
            </form>
          </div>
          
          <div className="order-summary">
            <div className="summary-card">
              <h3>Resumen del Pedido</h3>
              
              <div className="order-items">
                {carrito.map(item => (
                  <div key={item.id} className="order-item">
                    <div className="item-info">
                      <span className="item-name">{item.nombre}</span>
                      <span className="item-quantity">x{item.cantidad}</span>
                    </div>
                    <span className="item-total">${(item.precio * item.cantidad).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              
              <div className="summary-totals">
                <div className="summary-line">
                  <span>Subtotal:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                
                <div className="summary-line">
                  <span>Envío:</span>
                  <span>{envio === 0 ? 'Gratis' : `$${envio.toFixed(2)}`}</span>
                </div>
                
                <div className="summary-line total-line">
                  <span>Total:</span>
                  <span>${totalFinal.toFixed(2)}</span>
                </div>
              </div>
              
              {total < 50 && (
                <div className="shipping-notice">
                  <p>💡 Agrega ${(50 - total).toFixed(2)} más para envío gratis</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
