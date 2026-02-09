# Demo Cotización - Sistema de Cotización de Productos

Aplicación web para catálogo de productos con flujo de cotización vía WhatsApp.

## 🚀 Despliegue en Vercel (Gratuito)

### Requisitos previos
- Cuenta en [GitHub](https://github.com/) (gratuita)
- Cuenta en [Vercel](https://vercel.com/) (gratuita)

### Pasos para desplegar

#### 1. Crear repositorio en GitHub
```bash
# Inicializar git
git init

# Agregar archivos
git add .

# Primer commit
git commit -m "Initial commit - Demo Cotización"

# Crear repositorio en GitHub y conectar
# (Ve a github.com/new y crea un repositorio vacío)
git remote add origin https://github.com/TU_USUARIO/demo-cotizacion.git
git branch -M main
git push -u origin main
```

#### 2. Desplegar en Vercel

1. Ve a [vercel.com](https://vercel.com/) e inicia sesión con GitHub
2. Haz clic en "Add New Project"
3. Selecciona el repositorio `demo-cotizacion`
4. Vercel detectará automáticamente que es un proyecto Vite + React
5. Haz clic en "Deploy"

**¡Listo!** Tu aplicación estará en línea en unos minutos.

### URL asignada
Vercel asignará una URL como:
```
https://demo-cotizacion-tu-usuario.vercel.app
```

Puedes cambiar el dominio en la configuración del proyecto en Vercel.

---

## 🛠️ Desarrollo Local

### Instalar dependencias
```bash
npm install
```

### Ejecutar servidor de desarrollo
```bash
npm run dev
```
La aplicación estará disponible en http://localhost:3000/

### Build para producción
```bash
npm run build
```

---

## 📱 Configuración de WhatsApp

### Para el Negocio
1. Abre la aplicación
2. Haz clic en el ícono de engranaje (⚙️) en el header
3. Ingresa el número de WhatsApp del negocio
4. Formato: código de país + número (sin el símbolo +)
   - Perú: `51999999999`
   - México: `525512345678`

### Para el Cliente
Al solicitar una cotización, el cliente debe ingresar:
- **Nombre** (obligatorio)
- **Número de teléfono** (obligatorio)

El mensaje se pre-llena en el chat de WhatsApp del negocio.

---

## 🏗️ Stack Tecnológico

- **React 18.3** - Framework UI
- **TypeScript 5.6** - Tipado estático
- **Vite 6** - Build tool
- **React Router DOM 7** - Enrutamiento
- **Lucide React** - Iconos
- **CSS Vanilla** - Estilos sin dependencias

---

## 📁 Estructura del Proyecto

```
DemoCotizacion/
├── src/
│   ├── main.tsx                    # Entry point
│   ├── App.tsx                     # Main app con routing
│   ├── styles/
│   │   └── index.css              # Global styles
│   ├── domain/
│   │   ├── entities/
│   │   │   └── Product.ts         # Product y CartItem
│   │   └── interfaces/
│   │       └── IProductRepository.ts
│   ├── application/
│   │   ├── dto/
│   │   │   └── ProductDTO.ts     # DTOs con formatting
│   │   └── use-cases/
│   │       └── GetProductsUseCase.ts
│   ├── infrastructure/
│   │   ├── repositories/
│   │   │   └── LocalProductRepository.ts  # Mock data
│   │   ├── services/
│   │   │   └── WhatsAppService.ts  # WhatsApp integration
│   │   └── dependencies.ts        # Dependency injection
│   └── presentation/
│       ├── context/
│       │   └── CartContext.tsx      # Cart state
│       ├── components/
│       │   ├── Layout.tsx           # Main layout
│       │   ├── CartSidebar.tsx      # Cart sidebar
│       │   └── SettingsModal.tsx    # Settings modal
│       └── pages/
│           ├── CatalogPage.tsx      # Product catalog
│           ├── CartPage.tsx         # Cart page
│           └── Pages.css             # Pages styles
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 🌐 Hosting Gratuito Alternativo

### Netlify
1. Ve a [netlify.com](https://www.netlify.com/)
2. Arrastra la carpeta `dist` (después de `npm run build`)
3. O conecta tu repositorio de GitHub para deploy automático

### Cloudflare Pages
1. Ve a [dash.cloudflare.com](https://dash.cloudflare.com/)
2. Crea un proyecto de Pages
3. Conecta tu repositorio de GitHub

---

## 📄 Licencia

Este proyecto es una demo para fines educativos.
