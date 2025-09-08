# Base de Datos - Tienda Online

## 🐳 Configuración con Docker (Recomendado)

### Opción 1: Configuración automática
```bash
# Ejecutar el script de configuración automática
cd database/
chmod +x docker-setup.sh
./docker-setup.sh
```

### Opción 2: Configuración manual
```bash
# Desde la raíz del proyecto
docker-compose up -d --build

# Verificar que los servicios estén ejecutándose
docker-compose ps
```

### Servicios incluidos:
- **MySQL 8.0**: Base de datos principal (puerto 3306)
- **phpMyAdmin**: Interfaz web para administrar la BD (puerto 8080)

### Credenciales de acceso:
- **Base de datos**: `tienda_online`
- **Usuario**: `tienda_user`
- **Contraseña**: `tienda_pass`
- **Usuario root**: `root` / `root123`

### Acceso a phpMyAdmin:
Visita: http://localhost:8080
- Usuario: `root`
- Contraseña: `root123`

### Comandos útiles:
```bash
# Ver logs de MySQL
docker-compose logs mysql

# Conectar directamente a MySQL
docker-compose exec mysql mysql -u root -proot123

# Parar servicios
docker-compose down

# Parar y eliminar datos persistentes
docker-compose down -v

# Reconstruir contenedores
docker-compose up -d --build
```

---

## 📋 Configuración Manual de MySQL (Alternativa)

### 1. Instalar MySQL
- **macOS**: `brew install mysql`
- **Ubuntu**: `sudo apt-get install mysql-server`
- **Windows**: Descargar desde https://dev.mysql.com/downloads/mysql/

### 2. Iniciar MySQL
```bash
# macOS con Homebrew
brew services start mysql

# Ubuntu
sudo systemctl start mysql

# Windows (como servicio)
net start mysql
```

### 3. Crear la base de datos
```bash
# Conectar a MySQL
mysql -u root -p

# Ejecutar el script de schema
source /ruta/a/tienda-online/database/schema.sql
```

### O usando el archivo directamente:
```bash
mysql -u root -p < /ruta/a/tienda-online/database/schema.sql
```

## Estructura de la Base de Datos

### Tablas:
- **productos**: Catálogo de productos de la tienda
- **usuarios**: Información de usuarios registrados (opcional)
- **pedidos**: Pedidos realizados por los clientes
- **pedido_items**: Items específicos de cada pedido

### Configuración del Backend

#### Para Docker:
Asegúrate de actualizar las credenciales en `backend/config.env`:
```
DB_HOST=localhost  # o 'mysql' si el backend también está en Docker
DB_PORT=3306
DB_USER=tienda_user
DB_PASSWORD=tienda_pass
DB_NAME=tienda_online
```

#### Para instalación manual:
```
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=tienda_online
```

## 🛠️ Archivos de configuración

- `Dockerfile`: Configuración del contenedor MySQL
- `docker-compose.yml`: Orquestación de servicios (MySQL + phpMyAdmin)
- `my.cnf`: Configuración personalizada de MySQL
- `docker-setup.sh`: Script de configuración automática
- `env.example`: Ejemplo de variables de entorno
