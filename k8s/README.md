# Blue-Green Deployment Manual

Implementación manual de Blue-Green deployment para entender el concepto paso a paso.

## 📁 Estructura

```
k8s/
├── apps/
│   ├── deployment-blue.yaml     # Deployments versión actual (blue)
│   ├── deployment-green.yaml    # Deployments nueva versión (green)
│   └── service.yaml             # Services que switchean entre versiones
├── namespace.yaml               # Namespace
└── README.md                    # Esta guía
```

## 🚀 Pasos de Despliegue en Minikube

### 1. Iniciar minikube
```bash
minikube start
```

### 2. Configurar el docker de minikube
```bash
eval $(minikube docker-env)
```

### 3. Construir imágenes
```bash
# Versión actual (main)
docker build -t app-frontend:main ./frontend
docker build -t app-backend:main ./backend

# Nueva versión (v2)
git checkout v2
docker build -t app-frontend:v2 ./frontend
docker build -t app-backend:v2 ./backend
```

### 4. Aplicar manifests
```bash
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/apps/deployment-blue.yaml
kubectl apply -f k8s/apps/deployment-green.yaml
kubectl apply -f k8s/apps/service.yaml
```

### 5. Abrir la aplicación en el navegador
```bash
minikube service frontend-service -n appdevops
```

## 🔄 Switchear entre Blue y Green

### Cambiar a Green (nueva versión)
```bash
kubectl patch service frontend-service -n appdevops -p '{"spec":{"selector":{"app":"frontend","version":"green"}}}'
kubectl patch service backend-service -n appdevops -p '{"spec":{"selector":{"app":"backend","version":"green"}}}'
```

### Volver a Blue (versión anterior)
```bash
kubectl patch service frontend-service -n appdevops -p '{"spec":{"selector":{"app":"frontend","version":"blue"}}}'
kubectl patch service backend-service -n appdevops -p '{"spec":{"selector":{"app":"backend","version":"blue"}}}'
```

> 💡 **Esto redirige tráfico sin reiniciar pods (casi instantáneo).**

## 🔍 Comandos de Monitoreo

### Verificar estado de pods
```bash
kubectl get pods -n appdevops -l app=frontend
kubectl get pods -n appdevops -l app=backend
```

### Verificar a qué versión apuntan los services
```bash
kubectl get service frontend-service -n appdevops -o jsonpath='{.spec.selector}'
kubectl get service backend-service -n appdevops -o jsonpath='{.spec.selector}'
```

### Verificar todos los deployments
```bash
kubectl get deployments -n appdevops
```

### Consultar logs de una versión específica
```bash
kubectl logs -l app=frontend,version=blue -n appdevops
kubectl logs -l app=frontend,version=green -n appdevops
```

## 🎯 Cómo Funciona

1. **Dos versiones corriendo**: Blue (actual) y Green (nueva) están desplegadas simultáneamente
2. **Service selector**: Los services usan labels para decidir a qué versión enviar tráfico
3. **Switch instantáneo**: Cambiar el selector del service redirige todo el tráfico
4. **Zero downtime**: No se reinician pods, solo se cambia el ruteo

## 📊 Ejemplo Completo

```bash
# Estado inicial - tráfico va a blue
kubectl get service frontend-service -n appdevops -o jsonpath='{.spec.selector}'
# Output: {"app":"frontend","version":"blue"}

# Switch a green
kubectl patch service frontend-service -n appdevops -p '{"spec":{"selector":{"version":"green"}}}'

# Verificar cambio
kubectl get service frontend-service -n appdevops -o jsonpath='{.spec.selector}'
# Output: {"app":"frontend","version":"green"}

# Rollback a blue
kubectl patch service frontend-service -n appdevops -p '{"spec":{"selector":{"version":"blue"}}}'
```


## 🌐 Acceso desde el Browser

### Obtención de la URL de la aplicación
```bash
# Obtener URL del frontend
minikube service frontend-service -n appdevops --url

# O abrir directamente en el browser
minikube service frontend-service -n appdevops
```

### Visualizar los cambios en tiempo real
1. **Abrir la aplicación** en el browser usando el comando anterior
2. **Observar el indicador de versión** en el header (debería mostrar "vblue")
3. **Mantener la pestaña abierta** para visualizar los cambios
4. **Ejecutar el switch** de versión:
   ```bash
   kubectl patch service frontend-service -n appdevops -p '{"spec":{"selector":{"version":"green"}}}'
   ```
5. **Refrescar la página** (F5 o Ctrl+R) 
6. **El indicador ahora muestra "vgreen"** 🎉
7. **Realizar switch de vuelta** para comparar:
   ```bash
   kubectl patch service frontend-service -n appdevops -p '{"spec":{"selector":{"version":"blue"}}}'
   ```
8. **Refrescar nuevamente** para ver "vblue" otra vez

### Verificar qué versión está activa
```bash
# Ver selector actual del service
kubectl get service frontend-service -n appdevops -o jsonpath='{.spec.selector.version}'

# Ver pods que están recibiendo tráfico
kubectl get pods -n appdevops -l app=frontend,version=$(kubectl get service frontend-service -n appdevops -o jsonpath='{.spec.selector.version}')
```

### Acceso directo a cada versión (para pruebas)
```bash
# Port-forward directo a blue
kubectl port-forward -n appdevops deployment/frontend-blue 8080:80

# Port-forward directo a green  
kubectl port-forward -n appdevops deployment/frontend-green 8081:80
```
Luego accede a:
- Blue: http://localhost:8080
- Green: http://localhost:8081

### 💡 Indicador de Versión Incluido

El frontend **ya incluye un indicador de versión** en el header que muestra:
- **"vblue"** cuando está activa la versión blue
- **"vgreen"** cuando está activa la versión green

Esto permite visualizar **instantáneamente** qué versión está sirviendo el tráfico después de realizar el switch.

### Personalización de las versiones

Para hacer aún más visible la diferencia:

1. **Modificar colores o estilos** entre versiones
2. **Cambiar textos** en los componentes
3. **Implementar features diferentes** en cada versión
4. **Utilizar diferentes imágenes** con tags específicos:
   ```bash
   docker build -t app-frontend:main ./frontend
   git checkout v2  # o hacer cambios manuales
   docker build -t app-frontend:v2 ./frontend
   ```

## 🔧 Troubleshooting

### Si no se observan cambios después del switch:
```bash
# Forzar refresh del navegador o utilizar curl
curl $(minikube service frontend-service -n appdevops --url)
```

### Si los pods no están ready:
```bash
kubectl describe pod <pod-name> -n appdevops
kubectl logs <pod-name> -n appdevops
```
