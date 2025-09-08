-- Crear base de datos
CREATE DATABASE IF NOT EXISTS tienda_online;
USE tienda_online;

-- Tabla de productos
CREATE TABLE IF NOT EXISTS productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10, 2) NOT NULL,
    imagen_url VARCHAR(500),
    categoria VARCHAR(100),
    stock INT DEFAULT 0,
    activo BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de usuarios (opcional para autenticación)
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255),
    telefono VARCHAR(20),
    direccion TEXT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de pedidos
CREATE TABLE IF NOT EXISTS pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_email VARCHAR(255) NOT NULL,
    cliente_nombre VARCHAR(255) NOT NULL,
    cliente_telefono VARCHAR(20),
    direccion_envio TEXT,
    total DECIMAL(10, 2) NOT NULL,
    estado ENUM('pendiente', 'procesando', 'enviado', 'entregado', 'cancelado') DEFAULT 'pendiente',
    fecha_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de items del pedido
CREATE TABLE IF NOT EXISTS pedido_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pedido_id INT NOT NULL,
    producto_id INT NOT NULL,
    cantidad INT NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id) ON DELETE CASCADE,
    FOREIGN KEY (producto_id) REFERENCES productos(id)
);

-- Insertar productos de ejemplo
INSERT INTO productos (nombre, descripcion, precio, imagen_url, categoria, stock) VALUES
('Camiseta Básica', 'Camiseta de algodón 100% en varios colores', 19.99, 'https://via.placeholder.com/300x300/007bff/ffffff?text=Camiseta', 'Ropa', 50),
('Jeans Clásicos', 'Pantalones jeans de corte clásico', 49.99, 'https://via.placeholder.com/300x300/28a745/ffffff?text=Jeans', 'Ropa', 30),
('Zapatillas Deportivas', 'Zapatillas cómodas para uso diario', 79.99, 'https://via.placeholder.com/300x300/dc3545/ffffff?text=Zapatillas', 'Calzado', 25),
('Chaqueta de Cuero', 'Chaqueta de cuero sintético de alta calidad', 129.99, 'https://via.placeholder.com/300x300/6c757d/ffffff?text=Chaqueta', 'Ropa', 15),
('Mochila Casual', 'Mochila espaciosa para uso diario', 39.99, 'https://via.placeholder.com/300x300/17a2b8/ffffff?text=Mochila', 'Accesorios', 40),
('Reloj Digital', 'Reloj deportivo con múltiples funciones', 89.99, 'https://via.placeholder.com/300x300/ffc107/000000?text=Reloj', 'Accesorios', 20),
('Auriculares Bluetooth', 'Auriculares inalámbricos de alta calidad', 59.99, 'https://via.placeholder.com/300x300/6f42c1/ffffff?text=Auriculares', 'Electrónicos', 35),
('Libro de Programación', 'Guía completa de desarrollo web moderno', 29.99, 'https://via.placeholder.com/300x300/20c997/ffffff?text=Libro', 'Libros', 60);
