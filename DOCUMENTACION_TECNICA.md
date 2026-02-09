# 📄 Documentación Técnica — Sistema de Cotización de Productos

> **Fecha de elaboración:** 9 de febrero de 2026  
> **Basado en:** `PROPUESTA_PROYECTO.md`  
> **Tipo de documento:** Especificación técnica y análisis de factibilidad

---

## 📌 Resumen Ejecutivo

El proyecto consiste en una **Single Page Application (SPA)** para catálogo de productos con flujo de cotización vía WhatsApp. Es una aplicación **100% frontend** que consume datos locales (JSON), sin backend propio, lo que la hace **altamente factible como demo** y desplegable en cualquier hosting de archivos estáticos.

---

## ✅ Análisis de Factibilidad

### Viabilidad Técnica: **ALTA** ✅

| Aspecto | Evaluación | Justificación |
|---------|------------|---------------|
| **Complejidad** | Baja-Media | Es una SPA sin backend, con datos estáticos |
| **Dependencias externas** | Mínimas | Solo WhatsApp Web API (URL scheme, sin API key) |
| **Curva de aprendizaje** | Baja | Stack estándar y bien documentado |
| **Tiempo estimado** | 5-7 días | Realista para un desarrollador con experiencia en React |
| **Riesgo técnico** | Bajo | No hay integraciones complejas ni servicios de terceros |
| **Escalabilidad** | Preparada | El patrón Repository permite migrar a API/BD sin reescribir |

### Consideraciones Importantes

- **No requiere backend**: Los datos se cargan desde archivos JSON empaquetados con la app.
- **No requiere base de datos**: El carrito se persiste en `LocalStorage` del navegador.
- **WhatsApp**: Se usa el esquema de URL `https://wa.me/`, que no requiere API key ni cuenta Business verificada.
- **Imágenes de productos**: Se incluyen como assets estáticos en el bundle.

---

## 🛠️ Stack Tecnológico — Versiones y Justificación

### Framework y Lenguaje

| Tecnología | Versión | Justificación |
|------------|---------|---------------|
| **React** | `18.3.x` | Última versión estable de la rama 18. Soporte para Concurrent Features, Suspense y Automatic Batching |
| **TypeScript** | `5.6.x` | Tipado estático, mejora la mantenibilidad y reduce errores en tiempo de desarrollo |
| **Vite** | `6.x` | Build tool ultrarrápido con HMR instantáneo. Mejor DX que Webpack/CRA |

<!-- 
  ╔══════════════════════════════════════════════════════════════════╗
  ║  ALTERNATIVA FRAMEWORK:                                        ║
  ║                                                                ║
  ║  • React 19.x — Disponible, pero algunas librerías del        ║
  ║    ecosistema aún no tienen soporte completo. Se recomienda    ║
  ║    React 18.3.x por estabilidad.                               ║
  ║                                                                ║
  ║  • Vue 3.5.x + TypeScript — Curva de aprendizaje más          ║
  ║    suave, Composition API madura, excelente para equipos       ║
  ║    pequeños. Build tool: Vite (nativo).                        ║
  ║                                                                ║
  ║  • Svelte 5.x (con Runes) — Compilador sin Virtual DOM,      ║
  ║    bundle ultra-pequeño (~30% menos que React). Ideal si       ║
  ║    se prioriza rendimiento y tamaño del bundle.                ║
  ║                                                                ║
  ║  • Astro 5.x — Si se requiere máximo rendimiento SEO          ║
  ║    y la app es mayormente contenido estático con islas de      ║
  ║    interactividad. Soporta React, Vue o Svelte como islas.    ║
  ║                                                                ║
  ║  • Next.js 15.x — Si en el futuro se necesita SSR/SSG,       ║
  ║    API Routes (backend incluido), o SEO avanzado.              ║
  ║    Añade complejidad innecesaria para una demo SPA.            ║
  ╚══════════════════════════════════════════════════════════════════╝
-->

### Enrutamiento

| Tecnología | Versión | Justificación |
|------------|---------|---------------|
| **React Router DOM** | `7.x` | Estándar de facto para routing en React. Soporte para lazy loading de rutas |

<!-- 
  ╔══════════════════════════════════════════════════════════════════╗
  ║  ALTERNATIVA ROUTING:                                          ║
  ║                                                                ║
  ║  • TanStack Router v1.x — Tipado 100% type-safe,             ║
  ║    búsqueda de params tipada, ideal para apps con muchas       ║
  ║    rutas dinámicas. Más moderno pero menor adopción.           ║
  ║                                                                ║
  ║  • Wouter v3.x — Routing ultraligero (~1.5KB).               ║
  ║    Suficiente para apps pequeñas con pocas rutas.              ║
  ╚══════════════════════════════════════════════════════════════════╝
-->

### Estilos y UI

| Tecnología | Versión | Justificación |
|------------|---------|---------------|
| **CSS Vanilla** | CSS3 | Custom Properties, Flexbox, Grid. Sin dependencia externa |
| **Google Fonts (Inter)** | — | Tipografía moderna, legible y profesional |
| **Lucide React** | `0.470.x` | Iconos SVG ligeros, tree-shakeable, consistentes |

<!-- 
  ╔══════════════════════════════════════════════════════════════════╗
  ║  ALTERNATIVA ESTILOS:                                          ║
  ║                                                                ║
  ║  • Tailwind CSS v4.x — Utility-first, rápido para            ║
  ║    prototipos. Aumenta el tamaño del HTML pero reduce CSS.     ║
  ║    Requiere configuración adicional con Vite.                  ║
  ║                                                                ║
  ║  • CSS Modules (built-in en Vite) — Scoping automático        ║
  ║    de estilos por componente. Sin dependencia extra.            ║
  ║    Buena opción intermedia.                                    ║
  ║                                                                ║
  ║  • Styled Components v6.x — CSS-in-JS, permite estilos       ║
  ║    dinámicos con props. Añade ~12KB al bundle.                 ║
  ║                                                                ║
  ║  • Shadcn/ui — Componentes copiables (no dependencia),        ║
  ║    basados en Radix UI + Tailwind. Alta calidad visual         ║
  ║    pero requiere Tailwind como prerequisito.                   ║
  ║                                                                ║
  ║  ALTERNATIVA ICONOS:                                           ║
  ║                                                                ║
  ║  • React Icons v5.x — Colección masiva (FontAwesome,         ║
  ║    Material, etc.). Más pesada pero más variedad.              ║
  ║                                                                ║
  ║  • Phosphor Icons v2.x — Similar a Lucide, diseño más        ║
  ║    suave/redondeado. Tree-shakeable.                           ║
  ╚══════════════════════════════════════════════════════════════════╝
-->

### Estado y Gestión de Datos

| Tecnología | Versión | Justificación |
|------------|---------|---------------|
| **React Context + useReducer** | Built-in React 18 | Suficiente para el estado del carrito. Sin dependencias extra |
| **LocalStorage** | Web API | Persistencia del carrito entre sesiones |
| **JSON local** | — | Datos de productos embebidos en el bundle |

<!-- 
  ╔══════════════════════════════════════════════════════════════════╗
  ║  ALTERNATIVA ESTADO:                                           ║
  ║                                                                ║
  ║  • Zustand v5.x — Store global minimalista (~1KB).            ║
  ║    Más simple que Context para múltiples stores.               ║
  ║    Recomendado si el estado crece más allá del carrito.        ║
  ║                                                                ║
  ║  • Jotai v2.x — Estado atómico, ideal para estados           ║
  ║    independientes y derivados. API minimalista.                ║
  ║                                                                ║
  ║  • TanStack Query v5.x — Si se migra a una API real,         ║
  ║    maneja cache, refetching, optimistic updates.               ║
  ║    No necesario mientras los datos sean JSON local.            ║
  ║                                                                ║
  ║  • Redux Toolkit v2.x — Demasiado complejo para esta         ║
  ║    escala de proyecto. Solo justificable en apps enterprise.   ║
  ╚══════════════════════════════════════════════════════════════════╝
-->

### Herramientas de Desarrollo

| Tecnología | Versión | Uso |
|------------|---------|-----|
| **ESLint** | `9.x` | Linting de código con flat config |
| **Prettier** | `3.x` | Formateo consistente de código |
| **Node.js** | `22.x LTS` | Runtime para desarrollo y build |
| **npm** | `10.x` | Gestor de paquetes (incluido con Node.js) |

<!-- 
  ╔══════════════════════════════════════════════════════════════════╗
  ║  ALTERNATIVA PACKAGE MANAGER:                                  ║
  ║                                                                ║
  ║  • pnpm v9.x — Más rápido que npm, usa enlaces simbólicos.   ║
  ║    Ahorra espacio en disco. Recomendado para monorepos.        ║
  ║                                                                ║
  ║  • Bun v1.x — Runtime + package manager + bundler todo en     ║
  ║    uno. Extremadamente rápido. Aún madurando en Windows.       ║
  ╚══════════════════════════════════════════════════════════════════╝
-->

---

## 📦 Dependencias del Proyecto (package.json)

### Dependencias de Producción

| Paquete | Versión | Peso aprox. | Propósito |
|---------|---------|-------------|-----------|
| `react` | `^18.3.1` | ~40KB gzip | Librería UI principal |
| `react-dom` | `^18.3.1` | ~40KB gzip | Renderizado al DOM |
| `react-router-dom` | `^7.1.0` | ~14KB gzip | Enrutamiento SPA |
| `lucide-react` | `^0.470.0` | Tree-shakeable | Iconos SVG |

### Dependencias de Desarrollo

| Paquete | Versión | Propósito |
|---------|---------|-----------|
| `typescript` | `^5.6.0` | Compilador TypeScript |
| `vite` | `^6.0.0` | Build tool y dev server |
| `@vitejs/plugin-react` | `^4.3.0` | Plugin React para Vite (Fast Refresh) |
| `@types/react` | `^18.3.0` | Tipos TypeScript para React |
| `@types/react-dom` | `^18.3.0` | Tipos TypeScript para ReactDOM |
| `eslint` | `^9.0.0` | Linting |
| `prettier` | `^3.4.0` | Formateo |

> **Bundle estimado total (producción):** ~120-150KB gzipped — Excelente para performance.

---

## 🌐 Opciones de Hosting Gratuito

Al ser una aplicación **100% estática** (SPA sin backend), se puede desplegar en múltiples plataformas gratuitas:

### Hosting Recomendados (Tier 1 — Sin limitaciones prácticas)

| Plataforma | Límites gratis | CI/CD | Dominio personalizado | HTTPS | Observaciones |
|------------|---------------|-------|----------------------|-------|---------------|
| **Vercel** | 100GB bandwidth/mes, builds ilimitados | ✅ Git push auto-deploy | ✅ Gratis | ✅ Auto | **Recomendado #1**. Creadores de Next.js, excelente soporte para Vite/React. Preview por cada PR |
| **Netlify** | 100GB bandwidth/mes, 300 min build/mes | ✅ Git push auto-deploy | ✅ Gratis | ✅ Auto | **Recomendado #2**. Forms, redirects, funciones Edge. Muy robusto |
| **Cloudflare Pages** | Bandwidth ilimitado, 500 builds/mes | ✅ Git push auto-deploy | ✅ Gratis | ✅ Auto | **Recomendado #3**. CDN global de Cloudflare, rendimiento excepcional. Bandwidth sin límite |

<!-- 
  ╔══════════════════════════════════════════════════════════════════╗
  ║  HOSTING ALTERNATIVO (Tier 2 — Funcionales con limitaciones):  ║
  ║                                                                ║
  ║  • GitHub Pages — Gratis, ideal para sitios estáticos.        ║
  ║    Limitación: solo soporta rutas con hash (#) en SPA,         ║
  ║    requiere workaround con 404.html para React Router.         ║
  ║    No tiene CI/CD nativo (requiere GitHub Actions).            ║
  ║                                                                ║
  ║  • Firebase Hosting (Google) — Generoso free tier,            ║
  ║    360MB almacenamiento, 10GB transfer/mes.                    ║
  ║    CDN global. Requiere Firebase CLI para deploy.              ║
  ║    Ventaja si se planea usar Firestore en el futuro.           ║
  ║                                                                ║
  ║  • Surge.sh — Deploy desde CLI con un comando.                ║
  ║    Muy simple pero pocas features avanzadas.                   ║
  ║    Sin CI/CD. Ideal para demos rápidas.                        ║
  ║                                                                ║
  ║  • Render (Static Sites) — 100GB bandwidth/mes.              ║
  ║    Bueno pero builds más lentos que Vercel/Netlify.            ║
  ║    Mejor conocido por backend hosting.                         ║
  ║                                                                ║
  ║  • Railway (con limitaciones) — $5 crédito/mes gratis.        ║
  ║    Más orientado a backends. Usarlo para un SPA es             ║
  ║    sobredimensionado.                                          ║
  ║                                                                ║
  ║  • AWS Amplify Hosting — Free tier 12 meses: 15GB             ║
  ║    almacenamiento, 5GB transfer/mes. CI/CD integrado.          ║
  ║    Configuración más compleja que Vercel/Netlify.              ║
  ╚══════════════════════════════════════════════════════════════════╝
-->

### Proceso de Despliegue Recomendado (Vercel)

1. Subir código a un repositorio en GitHub
2. Conectar el repositorio con Vercel (login con GitHub)
3. Vercel detecta automáticamente Vite + React
4. Cada `git push` genera un deploy automático
5. URL asignada: `https://tu-proyecto.vercel.app`

---

## 🏗️ Arquitectura de la Aplicación

### Patrón: Clean Architecture (adaptada a Frontend)

| Capa | Responsabilidad | Dependencias |
|------|-----------------|--------------|
| **Domain** | Entidades, interfaces de repositorios, value objects | Ninguna (capa pura) |
| **Application** | Casos de uso, DTOs, servicios de aplicación | Solo Domain |
| **Infrastructure** | Implementación de repositorios, servicios externos (WhatsApp), datos JSON | Domain + Application |
| **Presentation** | Componentes React, hooks, contextos, páginas, estilos | Todas las capas superiores |

### Flujo de Dependencia

```
Presentation → Application → Domain
      ↓
Infrastructure (implementa interfaces de Domain)
```

> **Regla clave:** Las capas internas (Domain, Application) **no conocen** las capas externas (Infrastructure, Presentation).

---

## 🔗 Integración WhatsApp — Especificación Técnica

| Aspecto | Detalle |
|---------|---------|
| **Método** | URL scheme `https://wa.me/{número}?text={mensaje}` |
| **API Key** | No requiere |
| **Cuenta Business** | No requiere |
| **Formato número** | Internacional sin `+` (ej: `51987654321`) |
| **Longitud mensaje** | Máximo ~65,536 caracteres (suficiente) |
| **Soporte móvil** | Abre la app WhatsApp nativa |
| **Soporte desktop** | Abre WhatsApp Web o la app de escritorio |
| **Limitación** | No permite enviar imágenes por URL scheme |

---

## 📊 Métricas de Performance Esperadas

| Métrica | Objetivo | Justificación |
|---------|----------|---------------|
| **First Contentful Paint (FCP)** | < 1.5s | Bundle pequeño + CDN |
| **Largest Contentful Paint (LCP)** | < 2.5s | Imágenes optimizadas con lazy loading |
| **Time to Interactive (TTI)** | < 3.0s | Sin hidratación pesada (SPA pura) |
| **Bundle size (gzip)** | < 150KB | Dependencias mínimas y tree-shaking |
| **Lighthouse Score** | > 90 | Buenas prácticas + performance |

---

## 🔮 Ruta de Evolución (Post-Demo)

Si la demo se aprueba para producción, estas serían las fases de evolución:

| Fase | Cambio | Impacto en código |
|------|--------|-------------------|
| **1. API Backend** | Crear API REST para productos | Solo cambiar `LocalProductRepository` → `ApiProductRepository` en `dependencies.ts` |
| **2. Base de Datos** | PostgreSQL / MongoDB para productos | Implementar en el backend. El frontend no cambia |
| **3. Autenticación** | Agregar login para administradores | Nuevo módulo en Presentation + protección de rutas |
| **4. Panel Admin** | CRUD de productos desde la web | Nueva sección protegida con formularios |
| **5. PWA** | Funcionalidad offline, instalable | Agregar Service Worker y manifest.json |
| **6. Analytics** | Google Analytics / Plausible | Script en `index.html` o component wrapper |

<!-- 
  ╔══════════════════════════════════════════════════════════════════╗
  ║  ALTERNATIVA BACKEND (para fase de producción):                ║
  ║                                                                ║
  ║  • Node.js + Express/Fastify — Misma familia de lenguaje     ║
  ║    (TypeScript). Menor fricción para el equipo frontend.       ║
  ║    Deploy: Railway, Render, Fly.io (free tiers).               ║
  ║                                                                ║
  ║  • Supabase (BaaS) — PostgreSQL + Auth + Storage + API        ║
  ║    auto-generada. Free tier generoso. Elimina la necesidad     ║
  ║    de escribir backend manual para CRUD simple.                ║
  ║                                                                ║
  ║  • Firebase (BaaS) — Firestore + Auth + Hosting. Free tier.  ║
  ║    Ideal si se quiere la menor cantidad de código backend.     ║
  ║    Vendor lock-in con Google.                                  ║
  ║                                                                ║
  ║  • Spring Boot (Java) — Si el equipo tiene experiencia        ║
  ║    en Java. Más complejo para una app de este tamaño.          ║
  ║                                                                ║
  ║  • .NET 9 Minimal API — Si el equipo tiene experiencia       ║
  ║    en C#. Buena performance, excelente tooling.                ║
  ╚══════════════════════════════════════════════════════════════════╝
-->

---

## 🧪 Estrategia de Testing (Recomendada)

| Tipo | Herramienta | Versión | Alcance |
|------|-------------|---------|---------|
| **Unitario** | Vitest | `3.x` | Entidades, casos de uso, servicios |
| **Componentes** | React Testing Library | `16.x` | Componentes individuales |
| **E2E** | Playwright | `1.50.x` | Flujo completo: seleccionar → cotizar → WhatsApp |

<!-- 
  ╔══════════════════════════════════════════════════════════════════╗
  ║  ALTERNATIVA TESTING:                                          ║
  ║                                                                ║
  ║  • Cypress v13.x (E2E) — Interfaz visual, más fácil de       ║
  ║    depurar. Más lento que Playwright. Comunidad grande.        ║
  ║                                                                ║
  ║  • Jest v29.x (Unitario) — Estándar clásico, pero Vitest     ║
  ║    es más rápido y compatible con la config de Vite.           ║
  ╚══════════════════════════════════════════════════════════════════╝
-->

---

## 📝 Resumen de Decisiones Técnicas

| Decisión | Elección | Razón principal |
|----------|----------|-----------------|
| Framework UI | React 18 + TypeScript | Ecosistema maduro, gran comunidad, contratación más fácil |
| Build tool | Vite 6 | Velocidad de desarrollo, configuración mínima |
| Estilos | CSS Vanilla + Custom Properties | Cero dependencias, control total, rendimiento óptimo |
| Estado | Context + useReducer | Suficiente para el scope, sin overhead de librerías externas |
| Datos | JSON local + patrón Repository | Demo sin backend, preparado para migración futura |
| Hosting | Vercel / Netlify / Cloudflare Pages | Gratuito, CI/CD automático, HTTPS, dominio personalizado |
| Testing | Vitest + RTL + Playwright | Stack moderno, rápido, compatible con Vite |

---

> **Conclusión:** El proyecto es **100% factible** como demo. El stack propuesto es ligero, moderno y sin costos de infraestructura. La arquitectura Clean Architecture permite una evolución natural hacia producción sin reescribir código existente.
