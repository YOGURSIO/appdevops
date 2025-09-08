#!/bin/bash

echo "🗄️  Configuración de Base de Datos - Tienda Online"
echo "================================================"
echo ""

# Verificar si MySQL está instalado
if ! command -v mysql &> /dev/null; then
    echo "❌ MySQL no está instalado."
    echo ""
    echo "Instala MySQL usando:"
    echo "- macOS: brew install mysql"
    echo "- Ubuntu: sudo apt-get install mysql-server"
    echo "- Windows: https://dev.mysql.com/downloads/mysql/"
    echo ""
    exit 1
fi

echo "✅ MySQL encontrado"
echo ""

# Solicitar credenciales
read -p "🔑 Usuario de MySQL (default: root): " mysql_user
mysql_user=${mysql_user:-root}

echo "🔐 Contraseña de MySQL para $mysql_user:"
read -s mysql_password

echo ""
echo "🚀 Creando base de datos y tablas..."

# Ejecutar el script SQL
mysql -u "$mysql_user" -p"$mysql_password" < schema.sql

if [ $? -eq 0 ]; then
    echo "✅ Base de datos configurada correctamente!"
    echo ""
    echo "📝 Ahora actualiza el archivo backend/config.env con tus credenciales:"
    echo "   DB_USER=$mysql_user"
    echo "   DB_PASSWORD=tu_password"
    echo ""
    echo "🎉 ¡Todo listo! Ya puedes ejecutar la aplicación."
else
    echo "❌ Error configurando la base de datos."
    echo "   Verifica tus credenciales y que MySQL esté ejecutándose."
fi
