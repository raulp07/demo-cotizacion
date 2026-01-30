# 📋 Propuesta de Proyecto: Sistema de Cotización de Productos

## 🎯 Objetivo del Proyecto

Desarrollar una aplicación web moderna con **React 18** que permita a los clientes explorar productos, seleccionarlos para cotización y contactar directamente con el vendedor a través de WhatsApp para recibir una oferta personalizada.

> [!NOTE]
> **Demo con datos locales**: Los datos de productos se cargarán desde archivos JSON locales. La capa de infraestructura estará preparada con el patrón Repository para facilitar la integración con una base de datos real en el futuro.

---

## 🏗️ Arquitectura: Clean Architecture + React 18

```
DemoCotizacion/
├── public/
│   ├── index.html
│   └── favicon.ico
│
├── src/
│   ├── domain/                      # 🔵 Capa de Dominio (Núcleo)
│   │   ├── entities/
│   │   │   ├── Product.ts           # Entidad Producto
│   │   │   ├── Category.ts          # Entidad Categoría
│   │   │   └── QuoteItem.ts         # Item del carrito de cotización
│   │   ├── valueObjects/
│   │   │   └── Money.ts             # Objeto de valor para precio
│   │   └── repositories/
│   │       ├── IProductRepository.ts    # Interfaz del repositorio
│   │       └── ICategoryRepository.ts   # Interfaz del repositorio
│   │
│   ├── application/                 # 🟢 Capa de Aplicación (Casos de Uso)
│   │   ├── useCases/
│   │   │   ├── GetAllProducts.ts        # Obtener todos los productos
│   │   │   ├── GetProductsByCategory.ts # Filtrar por categoría
│   │   │   ├── GetCategories.ts         # Obtener categorías
│   │   │   └── SearchProducts.ts        # Buscar productos
│   │   ├── dtos/
│   │   │   ├── ProductDTO.ts
│   │   │   └── CategoryDTO.ts
│   │   └── services/
│   │       └── QuoteService.ts          # Lógica del carrito
│   │
│   ├── infrastructure/              # 🟠 Capa de Infraestructura
│   │   ├── repositories/
│   │   │   ├── LocalProductRepository.ts    # ✅ Implementación LOCAL (Demo)
│   │   │   ├── LocalCategoryRepository.ts   # ✅ Implementación LOCAL (Demo)
│   │   │   └── ApiProductRepository.ts      # 🔜 Preparado para API/BD futura
│   │   ├── services/
│   │   │   └── WhatsAppService.ts       # Servicio de integración WhatsApp
│   │   ├── data/                        # 📦 Datos locales (Demo)
│   │   │   ├── products.json            # Catálogo de productos
│   │   │   └── categories.json          # Categorías
│   │   └── config/
│   │       └── dependencies.ts          # Inyección de dependencias
│   │
│   ├── presentation/                # 🟣 Capa de Presentación (React)
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.tsx           # Menú de navegación
│   │   │   │   ├── Footer.tsx           # Pie de página
│   │   │   │   └── Layout.tsx           # Layout principal
│   │   │   ├── products/
│   │   │   │   ├── ProductCard.tsx      # Tarjeta de producto
│   │   │   │   ├── ProductGrid.tsx      # Grid de productos
│   │   │   │   ├── ProductModal.tsx     # Modal de detalles
│   │   │   │   └── ProductFilters.tsx   # Filtros de búsqueda
│   │   │   ├── quote/
│   │   │   │   ├── QuoteCart.tsx        # Carrito de cotización
│   │   │   │   ├── QuoteItem.tsx        # Item del carrito
│   │   │   │   └── QuoteSummary.tsx     # Resumen y botón WhatsApp
│   │   │   └── common/
│   │   │       ├── Button.tsx
│   │   │       ├── Badge.tsx
│   │   │       └── Modal.tsx
│   │   ├── pages/
│   │   │   ├── HomePage.tsx             # Página de inicio
│   │   │   ├── ProductsPage.tsx         # Catálogo de productos
│   │   │   ├── QuotePage.tsx            # Carrito de cotización
│   │   │   └── ContactPage.tsx          # Página de contacto
│   │   ├── hooks/
│   │   │   ├── useProducts.ts           # Hook para productos
│   │   │   ├── useQuote.ts              # Hook para carrito
│   │   │   └── useCategories.ts         # Hook para categorías
│   │   ├── context/
│   │   │   └── QuoteContext.tsx         # Contexto del carrito
│   │   └── styles/
│   │       ├── index.css                # Estilos globales
│   │       ├── variables.css            # Variables CSS
│   │       └── components/              # Estilos por componente
│   │
│   ├── App.tsx                      # Componente raíz
│   ├── main.tsx                     # Punto de entrada
│   └── routes.tsx                   # Configuración de rutas
│
├── assets/
│   └── images/                      # Imágenes de productos
│
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 📱 Páginas y Funcionalidades

### 1. **Página de Inicio (Landing Page)**
- Header con logo y menú de navegación
- Hero section con mensaje principal y CTA
- Sección de categorías destacadas
- Productos destacados/ofertas
- Testimonios o información de la empresa
- Footer con información de contacto

### 2. **Catálogo de Productos**
- Grid de productos con tarjetas
- Filtros por categoría, precio, disponibilidad
- Buscador de productos
- Ordenamiento (precio, nombre, popularidad)
- Paginación o scroll infinito
- Botón "Agregar a cotización" en cada producto

### 3. **Carrito de Cotización**
- Lista de productos seleccionados
- Cantidad por producto
- Subtotal estimado (referencial)
- Opción de eliminar productos
- Notas adicionales del cliente
- **Botón principal: "Solicitar Cotización por WhatsApp"**

### 4. **Página de Contacto**
- Información de la empresa
- Formulario de contacto alternativo
- Mapa de ubicación
- Redes sociales

---

## 🔗 Integración con WhatsApp

### Flujo del Usuario:
1. El cliente navega por el catálogo
2. Selecciona productos para cotizar
3. Revisa el carrito de cotización
4. Opcionalmente añade notas o comentarios
5. Hace clic en "Solicitar Cotización por WhatsApp"
6. Se abre WhatsApp con mensaje pre-formateado:

```
¡Hola! 👋 Me interesa cotizar los siguientes productos:

📦 *Producto 1*
   - Cantidad: 2
   - Ref: #SKU001

📦 *Producto 2*
   - Cantidad: 1
   - Ref: #SKU002

💬 *Notas adicionales:*
[Comentarios del cliente]

¡Espero su cotización! Gracias.
```

### Implementación Técnica (TypeScript):
```typescript
// src/infrastructure/services/WhatsAppService.ts
import { QuoteItem } from '../../domain/entities/QuoteItem';

export class WhatsAppService {
    private static readonly PHONE_NUMBER = '51XXXXXXXXX'; // Número del vendedor

    static generateQuoteMessage(items: QuoteItem[], notes?: string): string {
        let message = '¡Hola! 👋 Me interesa cotizar los siguientes productos:\n\n';
        
        items.forEach(item => {
            message += `📦 *${item.product.name}*\n`;
            message += `   - Cantidad: ${item.quantity}\n`;
            message += `   - Ref: #${item.product.sku}\n\n`;
        });

        if (notes) {
            message += `💬 *Notas adicionales:*\n${notes}\n\n`;
        }

        message += '¡Espero su cotización! Gracias.';
        return encodeURIComponent(message);
    }

    static openWhatsApp(items: QuoteItem[], notes?: string): void {
        const message = this.generateQuoteMessage(items, notes);
        const url = `https://wa.me/${this.PHONE_NUMBER}?text=${message}`;
        window.open(url, '_blank');
    }
}
```

---

## 🎨 Diseño UI/UX

### Paleta de Colores:
| Color | Uso | Código |
|-------|-----|--------|
| Primario | Botones, enlaces | `#2563EB` |
| Secundario | Acentos | `#10B981` |
| WhatsApp | Botón WhatsApp | `#25D366` |
| Fondo | Background | `#F8FAFC` |
| Texto | Contenido | `#1E293B` |

### Tipografía:
- **Títulos**: Inter (Bold)
- **Cuerpo**: Inter (Regular)
- **Botones**: Inter (Semi-bold)

### Componentes UI:
- Tarjetas con sombras suaves
- Animaciones de hover
- Transiciones fluidas
- Diseño responsivo (Mobile First)
- Iconos de línea (Lucide Icons)

---

## 📦 Modelo de Datos

### Entidades TypeScript:

```typescript
// src/domain/entities/Product.ts
export interface Product {
    id: string;
    sku: string;
    name: string;
    description: string;
    categoryId: string;
    price: Money;
    images: string[];
    specifications: Specification[];
    stock: Stock;
    featured: boolean;
    createdAt: string;
}

// src/domain/entities/Category.ts
export interface Category {
    id: string;
    name: string;
    description?: string;
    image?: string;
}

// src/domain/entities/QuoteItem.ts
export interface QuoteItem {
    product: Product;
    quantity: number;
}

// src/domain/valueObjects/Money.ts
export interface Money {
    value: number;
    currency: string;
    showPrice: boolean;  // false = "Consultar precio"
}
```

### Datos Locales (JSON - Demo):

```json
// src/infrastructure/data/products.json
[
    {
        "id": "prod_001",
        "sku": "SKU001",
        "name": "Producto Demo 1",
        "description": "Descripción del producto demo",
        "categoryId": "cat_001",
        "price": { "value": 99.99, "currency": "PEN", "showPrice": true },
        "images": ["/assets/images/product1.jpg"],
        "specifications": [{ "label": "Material", "value": "Acero" }],
        "stock": { "available": true, "quantity": 50 },
        "featured": true,
        "createdAt": "2026-01-21"
    }
]
```

---

## 🛠️ Stack Tecnológico

| Capa | Tecnología |
|------|------------|
| **Framework** | React 18 + TypeScript |
| **Build Tool** | Vite |
| **Routing** | React Router DOM |
| **Estilos** | CSS Custom Properties, Flexbox, Grid |
| **Iconos** | Lucide React |
| **Fuentes** | Google Fonts (Inter) |
| **Estado Global** | React Context + useReducer |
| **Almacenamiento** | LocalStorage (carrito) |
| **Datos** | JSON local (productos) - Repositorios preparados para BD |
| **Comunicación** | WhatsApp Web API |

---

## 🔄 Patrón Repository (Preparado para BD Futura)

> [!IMPORTANT]
> La capa de infraestructura implementa el **patrón Repository** que abstrae el acceso a datos. Para la demo se usa JSON local, pero es fácil cambiar a una API/BD real.

### Interfaz del Repositorio (Dominio):
```typescript
// src/domain/repositories/IProductRepository.ts
import { Product } from '../entities/Product';

export interface IProductRepository {
    getAll(): Promise<Product[]>;
    getById(id: string): Promise<Product | null>;
    getByCategory(categoryId: string): Promise<Product[]>;
    search(query: string): Promise<Product[]>;
    getFeatured(): Promise<Product[]>;
}
```

### Implementación LOCAL (Demo Actual):
```typescript
// src/infrastructure/repositories/LocalProductRepository.ts
import { IProductRepository } from '../../domain/repositories/IProductRepository';
import { Product } from '../../domain/entities/Product';
import productsData from '../data/products.json';

export class LocalProductRepository implements IProductRepository {
    private products: Product[] = productsData as Product[];

    async getAll(): Promise<Product[]> {
        return this.products;
    }

    async getById(id: string): Promise<Product | null> {
        return this.products.find(p => p.id === id) || null;
    }

    async getByCategory(categoryId: string): Promise<Product[]> {
        return this.products.filter(p => p.categoryId === categoryId);
    }

    async search(query: string): Promise<Product[]> {
        const q = query.toLowerCase();
        return this.products.filter(p => 
            p.name.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q)
        );
    }

    async getFeatured(): Promise<Product[]> {
        return this.products.filter(p => p.featured);
    }
}
```

### Implementación API (Para Producción Futura):
```typescript
// src/infrastructure/repositories/ApiProductRepository.ts
import { IProductRepository } from '../../domain/repositories/IProductRepository';
import { Product } from '../../domain/entities/Product';

export class ApiProductRepository implements IProductRepository {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    async getAll(): Promise<Product[]> {
        const response = await fetch(`${this.baseUrl}/products`);
        return response.json();
    }

    // ... demás métodos conectando a la API real
}
```

### Inyección de Dependencias:
```typescript
// src/infrastructure/config/dependencies.ts
import { IProductRepository } from '../../domain/repositories/IProductRepository';
import { LocalProductRepository } from '../repositories/LocalProductRepository';
// import { ApiProductRepository } from '../repositories/ApiProductRepository';

// 🔧 CAMBIAR AQUÍ para usar BD real en producción
export const productRepository: IProductRepository = new LocalProductRepository();
// export const productRepository: IProductRepository = new ApiProductRepository('https://api.example.com');
```

---

## 📋 Menú de Navegación

```
┌─────────────────────────────────────────────────────────────┐
│  🏠 LOGO          Inicio | Productos | Cotización | Contacto │
└─────────────────────────────────────────────────────────────┘
```

- **Inicio**: Página de presentación
- **Productos**: Catálogo completo con filtros
- **Cotización**: Carrito de productos seleccionados (badge con cantidad)
- **Contacto**: Información y formulario

---

## ✅ Funcionalidades Clave

### Must Have (MVP):
- [x] Página de inicio atractiva
- [x] Catálogo de productos con filtros
- [x] Agregar/quitar productos del carrito de cotización
- [x] Envío de cotización por WhatsApp
- [x] Diseño responsivo
- [x] Persistencia del carrito (LocalStorage)

### Nice to Have:
- [ ] Búsqueda de productos
- [ ] Comparador de productos
- [ ] Galería de imágenes por producto
- [ ] Historial de cotizaciones
- [ ] Modo oscuro
- [ ] PWA (Progressive Web App)

---

## 🚀 Plan de Desarrollo

| Fase | Descripción | Duración Estimada |
|------|-------------|-------------------|
| 1 | Estructura y arquitectura base | 1 día |
| 2 | Capa de Dominio y Aplicación | 1 día |
| 3 | UI: Landing Page y Navegación | 1 día |
| 4 | UI: Catálogo de Productos | 1 día |
| 5 | UI: Carrito de Cotización | 1 día |
| 6 | Integración WhatsApp | 0.5 días |
| 7 | Responsive y pulido | 0.5 días |
| 8 | Testing y documentación | 1 día |

**Total estimado: 7 días**

---

## 📱 Vista Previa del Flujo

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│              │     │              │     │              │     │              │
│   INICIO     │────▶│  PRODUCTOS   │────▶│  COTIZACIÓN  │────▶│  WHATSAPP    │
│              │     │              │     │              │     │              │
│  (Landing)   │     │  (Catálogo)  │     │  (Carrito)   │     │  (Mensaje)   │
│              │     │              │     │              │     │              │
└──────────────┘     └──────────────┘     └──────────────┘     └──────────────┘
      │                    │                    │
      │                    ▼                    │
      │              ┌──────────┐               │
      │              │ Agregar  │               │
      └─────────────▶│    +     │◀──────────────┘
                     └──────────┘
```

---

## 📞 Configuración WhatsApp

Para configurar el número de contacto de WhatsApp:

1. Editar `src/infrastructure/services/WhatsAppService.ts`
2. Cambiar `PHONE_NUMBER` por el número del vendedor (formato internacional sin +)
3. Ejemplo: `'51987654321'` (Perú)

---

## 🔧 Migración a Base de Datos (Futuro)

Cuando se requiera conectar a una base de datos real:

1. Crear nuevo repositorio (ej: `ApiProductRepository.ts`)
2. Implementar la interfaz `IProductRepository`
3. Cambiar la instancia en `dependencies.ts`
4. ✅ ¡Listo! El resto de la aplicación no cambia

---

## 🎯 Próximos Pasos

1. **Aprobar** esta propuesta
2. **Definir** productos iniciales (JSON)
3. **Configurar** número de WhatsApp
4. **Iniciar** desarrollo según el plan

---

> **Nota**: Este proyecto está diseñado para ser una solución liviana y efectiva para pequeños negocios que deseen ofrecer cotizaciones de productos sin necesidad de un sistema de e-commerce completo.
