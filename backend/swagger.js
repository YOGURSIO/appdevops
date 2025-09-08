const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Tienda Online API',
      version: '1.0.0',
      description: 'API REST para la tienda online con Node.js, Express y MySQL',
      contact: {
        name: 'Soporte API',
        email: 'soporte@tienda-online.com'
      },
      license: {
        name: 'ISC',
        url: 'https://opensource.org/licenses/ISC'
      }
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Servidor de desarrollo'
      },
      {
        url: 'http://localhost:5000/api',
        description: 'API Base URL'
      }
    ],
    components: {
      schemas: {
        Producto: {
          type: 'object',
          required: ['nombre', 'precio'],
          properties: {
            id: {
              type: 'integer',
              description: 'ID único del producto',
              example: 1
            },
            nombre: {
              type: 'string',
              description: 'Nombre del producto',
              example: 'Camiseta Básica'
            },
            descripcion: {
              type: 'string',
              description: 'Descripción detallada del producto',
              example: 'Camiseta de algodón 100% en varios colores'
            },
            precio: {
              type: 'number',
              format: 'decimal',
              description: 'Precio del producto',
              example: 19.99
            },
            imagen_url: {
              type: 'string',
              description: 'URL de la imagen del producto',
              example: 'https://via.placeholder.com/300x300'
            },
            categoria: {
              type: 'string',
              description: 'Categoría del producto',
              example: 'Ropa'
            },
            stock: {
              type: 'integer',
              description: 'Cantidad en stock',
              example: 50
            },
            activo: {
              type: 'boolean',
              description: 'Si el producto está activo',
              example: true
            },
            fecha_creacion: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de creación del producto'
            },
            fecha_actualizacion: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de última actualización'
            }
          }
        },
        Pedido: {
          type: 'object',
          required: ['productos', 'total', 'cliente_email', 'cliente_nombre'],
          properties: {
            id: {
              type: 'integer',
              description: 'ID único del pedido',
              example: 1
            },
            productos: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  producto_id: {
                    type: 'integer',
                    example: 1
                  },
                  cantidad: {
                    type: 'integer',
                    example: 2
                  },
                  precio: {
                    type: 'number',
                    format: 'decimal',
                    example: 19.99
                  }
                }
              },
              description: 'Lista de productos en el pedido'
            },
            total: {
              type: 'number',
              format: 'decimal',
              description: 'Total del pedido',
              example: 39.98
            },
            cliente_email: {
              type: 'string',
              format: 'email',
              description: 'Email del cliente',
              example: 'cliente@ejemplo.com'
            },
            cliente_nombre: {
              type: 'string',
              description: 'Nombre del cliente',
              example: 'Juan Pérez'
            },
            cliente_telefono: {
              type: 'string',
              description: 'Teléfono del cliente',
              example: '+34 600 123 456'
            },
            direccion_envio: {
              type: 'string',
              description: 'Dirección de envío',
              example: 'Calle Ejemplo 123, Madrid'
            },
            estado: {
              type: 'string',
              enum: ['pendiente', 'procesando', 'enviado', 'entregado', 'cancelado'],
              description: 'Estado del pedido',
              example: 'pendiente'
            },
            fecha_pedido: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha del pedido'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: 'Mensaje de error',
              example: 'Error interno del servidor'
            }
          }
        },
        ApiResponse: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Mensaje de respuesta',
              example: 'API de Tienda Online funcionando'
            }
          }
        }
      }
    }
  },
  apis: ['./index.js', './routes/*.js'], // Rutas a los archivos que contienen definiciones de API
};

const specs = swaggerJsdoc(options);

module.exports = {
  specs,
  swaggerUi
};
