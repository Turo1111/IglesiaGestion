# MVP-SISTEMA DIVINO: SISTEMA DE GESTIÓN ECLESIÁSTICO

[![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Proprietary-red)]()

> **Sistema de Gestión Interno para la Basílica Menor Nuestra Señora de la Merced**

---

## 📖 Introducción

El MVP del Sistema Divino implementa la gestión núcleo del registro sacramental y la emisión verificable de certificados: autenticación e inicio de sesión; ABM de usuarios, roles y permisos con control de acceso basado en roles; ABM de fieles para su identificación única; y ABM de sacramentos para alta/edición/baja y vinculación con el fiel. La emisión/descarga de certificados genera un hash por sacramento registrado y lo ancla en blockchain para verificación pública (QR/enlace), asegurando trazabilidad y no repudio. El objetivo es cubrir de punta a punta el flujo auditable desde el registro del sacramento hasta la verificación del certificado, estableciendo una base segura y escalable para futuras extensiones.

---

## 📋 Tabla de Contenidos

1. [Características Principales](#-características-principales)
2. [Stack Tecnológico](#-stack-tecnológico)
3. [Estructura del Proyecto](#-estructura-del-proyecto)
4. [Módulos del Sistema](#-módulos-del-sistema)
5. [Sistema de Datos](#-sistema-de-datos)
6. [Autenticación y Autorización](#-autenticación-y-autorización)
7. [Instalación y Configuración](#-instalación-y-configuración)
8. [Scripts Disponibles](#-scripts-disponibles)
9. [Flujo de Trabajo](#-flujo-de-trabajo)
10. [Documentación Adicional](#-documentación-adicional)
11. [Roadmap](#-roadmap)

---

## ✨ Características Principales

### 🔐 Autenticación y Control de Acceso
- Sistema de login con autenticación basada en roles
- 4 roles predefinidos: Administrador, Sacerdote, Secretaria, Consultor
- 22 permisos granulares organizados en 6 categorías
- Protección de rutas con HOC (Higher-Order Component)
- Persistencia de sesión en LocalStorage

### 👥 Gestión de Fieles
- Registro completo de fieles de la parroquia
- Validación de DNI peruano (8 dígitos)
- Trazabilidad de sacramentos por fiel
- Búsqueda avanzada por nombre, DNI o domicilio

### 📜 Gestión de Sacramentos
- 7 tipos de sacramentos disponibles
- Generación automática de hash blockchain (SHA-256)
- Generación automática de código QR único
- Vinculación directa con fieles
- Estado de certificado (emitido/pendiente)

### 📄 Emisión de Certificados
- Búsqueda de fiel para emisión
- Visualización de sacramentos disponibles por fiel
- Emisión bajo demanda con actualización automática
- Descarga de certificados ya emitidos
- Registro de fecha de emisión

### ⛓️ Integración Blockchain
- Hash único por sacramento registrado
- Verificación de autenticidad mediante hash
- Simulación de red blockchain privada
- Trazabilidad completa del registro
- Preparado para smart contracts reales

### 👨‍💼 Gestión de Usuarios y Roles
- ABM completo de usuarios del sistema
- ABM de roles con permisos personalizables
- Asignación de permisos por categorías
- Control de usuarios activos/inactivos
- Contadores automáticos de usuarios por rol

### 📊 Dashboard Inteligente
- Estadísticas en tiempo real
- Métricas dinámicas calculadas del contexto global
- Visualización de sacramentos recientes
- Acciones rápidas a módulos principales
- Estado del sistema en tiempo real

---

## 🛠️ Stack Tecnológico

### Frontend Framework
```json
{
  "next": "^15.2.4",
  "react": "^19",
  "react-dom": "^19"
}
```
**Next.js 15** con **React 19** - Framework React con SSR, routing automático y optimizaciones de rendimiento.

### Lenguaje
```json
{
  "typescript": "^5"
}
```
**TypeScript** - Superset de JavaScript con tipado estático para mayor seguridad y mantenibilidad.

### Estilos y UI
```json
{
  "tailwindcss": "^4.0.0",
  "tailwindcss-animate": "^1.0.7",
  "class-variance-authority": "^0.7.1",
  "clsx": "^2.1.1",
  "tailwind-merge": "^2.6.0"
}
```
- **Tailwind CSS 4** - Framework CSS utility-first
- **CVA** - Gestión de variantes de componentes
- **clsx** - Utilidad para nombres de clase condicionales

### Componentes UI
```json
{
  "@radix-ui/react-*": "^1.x"
}
```
**Radix UI** - Primitivos de UI accesibles y sin estilos:
- Dialog, Dropdown Menu, Label, Select
- Checkbox, Toast, Tabs, Scroll Area
- Slot, Toast Provider

### Iconos
```json
{
  "lucide-react": "^0.468.0"
}
```
**Lucide Icons** - Biblioteca de iconos moderna y consistente.

### Formularios y Validación
```json
{
  "formik": "^2.x",
  "yup": "^1.x"
}
```
- **Formik** - Manejo de formularios con estado y validación
- **Yup** - Schema validation para formularios

### Utilidades
```json
{
  "date-fns": "^4.1.0",
  "geist": "^1.3.1"
}
```
- **date-fns** - Manipulación y formateo de fechas
- **Geist** - Familia de fuentes de Vercel

### Analytics y Monitoreo
```json
{
  "@vercel/analytics": "^1.4.1"
}
```
**Vercel Analytics** - Análisis de rendimiento y métricas del sitio.

---

## 📁 Estructura del Proyecto

```
iglesiaGestion/
│
├── app/                          # Next.js App Router
│   ├── dashboard/               # Dashboard principal
│   │   └── page.tsx            # Página del dashboard con módulos
│   ├── login/                   # Autenticación
│   │   └── page.tsx            # Página de login
│   ├── layout.tsx              # Layout raíz con providers
│   ├── page.tsx                # Página principal (redirige a login)
│   └── globals.css             # Estilos globales
│
├── components/                  # Componentes React
│   ├── ui/                     # Componentes de shadcn/ui
│   │   ├── button.tsx          # Componente Button
│   │   ├── card.tsx            # Componente Card
│   │   ├── dialog.tsx          # Componente Dialog/Modal
│   │   ├── input.tsx           # Componente Input
│   │   ├── label.tsx           # Componente Label
│   │   ├── select.tsx          # Componente Select
│   │   ├── table.tsx           # Componente Table
│   │   ├── tabs.tsx            # Componente Tabs
│   │   ├── toast.tsx           # Sistema de notificaciones
│   │   ├── badge.tsx           # Componente Badge
│   │   ├── checkbox.tsx        # Componente Checkbox
│   │   ├── textarea.tsx        # Componente Textarea
│   │   ├── dropdown-menu.tsx   # Dropdown Menu
│   │   ├── scroll-area.tsx     # Scroll Area
│   │   └── ...                 # Otros componentes UI
│   │
│   ├── dashboard-overview.tsx  # Vista general del dashboard
│   ├── header.tsx              # Cabecera con usuario y notificaciones
│   ├── sidebar.tsx             # Barra lateral de navegación
│   ├── protected-route.tsx     # HOC para protección de rutas
│   ├── loading-screen.tsx      # Pantalla de carga global
│   ├── notifications-dropdown.tsx  # Sistema de notificaciones
│   │
│   ├── users-module.tsx        # Módulo de gestión de usuarios
│   ├── user-form-dialog.tsx    # Formulario de creación de usuarios
│   │
│   ├── roles-module.tsx        # Módulo de gestión de roles
│   ├── role-form-dialog.tsx    # Formulario de creación de roles
│   │
│   ├── fiel-module.tsx         # Módulo de gestión de fieles
│   ├── fiel-form-dialog.tsx    # Formulario de registro de fieles
│   │
│   ├── sacramentos-module.tsx  # Módulo de gestión de sacramentos
│   ├── sacramento-form-dialog.tsx  # Formulario de registro de sacramentos
│   │
│   ├── emision-certificados-module.tsx  # Módulo de emisión de certificados
│   └── blockchain-module.tsx   # Módulo de blockchain y verificación
│
├── contexts/                    # Contextos de React
│   ├── auth-context.tsx        # Contexto de autenticación global
│   └── data-context.tsx        # Contexto de datos compartidos (MVP)
│
├── hooks/                       # Custom Hooks
│   ├── use-auth.ts             # Hook de autenticación
│   ├── use-toast.ts            # Hook de notificaciones
│   └── use-mobile.tsx          # Hook para detección de móvil
│
├── lib/                         # Utilidades y helpers
│   └── utils.ts                # Funciones auxiliares (cn, etc.)
│
├── public/                      # Archivos estáticos
│   ├── placeholder-logo.svg    # Logo de la aplicación
│   └── placeholder-user.jpg    # Avatar por defecto
│
├── docs/                        # Documentación (si existe)
│
├── .next/                       # Build de Next.js (generado)
├── node_modules/               # Dependencias (generado)
│
├── .gitignore                  # Archivos ignorados por Git
├── components.json             # Configuración de shadcn/ui
├── next.config.mjs             # Configuración de Next.js
├── package.json                # Dependencias y scripts
├── postcss.config.mjs          # Configuración de PostCSS
├── tailwind.config.ts          # Configuración de Tailwind CSS
├── tsconfig.json               # Configuración de TypeScript
└── README.md                   # Este archivo
```

---

## 🎯 Módulos del Sistema

### 1. 🏠 Dashboard Overview

**Archivo:** `components/dashboard-overview.tsx`

**Descripción:**  
Vista principal del sistema que muestra métricas en tiempo real y acceso rápido a funcionalidades.

**Funcionalidades:**
- ✅ Estadísticas dinámicas (fieles, sacramentos, certificados, usuarios)
- ✅ Sacramentos recientes con información del fiel
- ✅ Acciones rápidas a todos los módulos
- ✅ Estado del sistema en tiempo real
- ✅ Resumen visual del MVP

**Métricas Mostradas:**
```typescript
- Total Fieles
- Sacramentos Registrados (con certificados emitidos)
- Registros Blockchain (100% con hash)
- Certificados Pendientes
- Usuarios del Sistema (activos/inactivos)
- Roles Configurados
- Tasa de Emisión (%)
```

**Datos Utilizados:**
```typescript
const { fieles, sacramentos, users, roles } = useData()
```

---

### 2. 👥 Módulo de Usuarios

**Archivos:**
- `components/users-module.tsx` - Gestión de usuarios
- `components/user-form-dialog.tsx` - Formulario de creación

**Descripción:**  
Administración completa del personal autorizado del sistema con control de acceso basado en roles.

**Funcionalidades:**
- ✅ Lista de usuarios con información de rol
- ✅ Búsqueda por nombre, email o rol
- ✅ Creación de usuarios con validaciones
- ✅ Asignación de roles desde lista dinámica
- ✅ Activación/desactivación de usuarios
- ✅ Visualización de permisos heredados del rol

**Validaciones del Formulario:**
```typescript
- Nombre: 3-100 caracteres, solo letras y espacios
- Email: Formato válido (RFC 5322)
- Rol: Debe existir en el sistema
- Contraseña: Mínimo 8 caracteres, 1 mayúscula, 1 minúscula, 1 número
- Confirmar Contraseña: Debe coincidir
```

**Estadísticas:**
```typescript
- Total Usuarios
- Usuarios Activos
- Roles Disponibles
- Usuarios Inactivos
```

---

### 3. 🛡️ Módulo de Roles

**Archivos:**
- `components/roles-module.tsx` - Gestión de roles
- `components/role-form-dialog.tsx` - Formulario de creación

**Descripción:**  
Configuración de roles y permisos granulares del sistema con 22 permisos en 6 categorías.

**Funcionalidades:**
- ✅ Lista de roles con permisos asignados
- ✅ Contador automático de usuarios por rol
- ✅ Creación de roles personalizados
- ✅ Selección de permisos por categorías
- ✅ Visualización de permisos (primeros 3 + contador)
- ✅ Protección contra eliminación de roles en uso

**Permisos del MVP (22 permisos):**

| Categoría | Permisos (4 cada una) |
|-----------|----------------------|
| **Usuarios** | `users_read`, `users_create`, `users_update`, `users_delete` |
| **Roles** | `roles_read`, `roles_create`, `roles_update`, `roles_delete` |
| **Fieles** | `fiel_read`, `fiel_create`, `fiel_update`, `fiel_delete` |
| **Sacramentos** | `sacramentos_read`, `sacramentos_create`, `sacramentos_update`, `sacramentos_delete` |
| **Certificados** | `certificados_read`, `certificados_emit`, `certificados_download` |
| **Blockchain** | `blockchain_register`, `blockchain_verify` |

**Características del Formulario:**
```typescript
- Agrupación por categorías
- Botón "Seleccionar todos" por categoría
- Contador de permisos seleccionados
- Validación: mínimo 1 permiso
```

---

### 4. 🙏 Módulo de Fieles

**Archivos:**
- `components/fiel-module.tsx` - Gestión de fieles
- `components/fiel-form-dialog.tsx` - Formulario de registro

**Descripción:**  
Registro y administración de los fieles de la parroquia con identificación única por DNI.

**Funcionalidades:**
- ✅ Lista completa de fieles
- ✅ Búsqueda por nombre, DNI o domicilio
- ✅ Registro con validaciones estrictas
- ✅ Contador de sacramentos por fiel
- ✅ Estadísticas de fieles con/sin sacramentos

**Validaciones del Formulario:**
```typescript
nombreCompleto:
  - Requerido
  - 3-100 caracteres
  - Solo letras y espacios
  - Regex: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/

DNI:
  - Requerido
  - Exactamente 8 dígitos
  - Solo números
  - Regex: /^[0-9]{8}$/

fechaNacimiento:
  - Requerido
  - No puede ser futura
  - Debe ser al menos 1 día en el pasado

domicilio:
  - Requerido
  - 5-200 caracteres
```

**Interfaz de Datos:**
```typescript
interface Fiel {
  idFiel: number
  nombreCompleto: string
  fechaNacimiento: string
  DNI: string
  domicilio: string
  createdAt: string
}
```

**Estadísticas:**
```typescript
- Total Fieles
- Con Sacramentos
- Sin Sacramentos
```

---

### 5. ✝️ Módulo de Sacramentos

**Archivos:**
- `components/sacramentos-module.tsx` - Gestión de sacramentos
- `components/sacramento-form-dialog.tsx` - Formulario de registro

**Descripción:**  
Registro de sacramentos con generación automática de hash blockchain y código QR único.

**Funcionalidades:**
- ✅ Lista de sacramentos con información del fiel
- ✅ Búsqueda por tipo, fiel, DNI, hash o QR
- ✅ Registro vinculado a fiel existente
- ✅ Generación automática de hash blockchain
- ✅ Generación automática de código QR
- ✅ Estado de certificado (emitido/pendiente)

**Tipos de Sacramento:**
```typescript
const TIPOS_SACRAMENTO = [
  "Bautismo",           // 💧
  "Primera Comunión",   // 🍞
  "Confirmación",       // 🕊️
  "Matrimonio",         // 💒
  "Penitencia",         // ✝️
  "Unción de Enfermos", // 🙏
  "Orden Sacerdotal"    // 📿
]
```

**Generación Automática:**
```typescript
// Hash Blockchain (64 caracteres hexadecimales)
hashblockchain: "0x7f9a2b8c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a"

// Código QR (formato: QR-[tipo]-[año]-[número])
codigoQR: "QR-BAU-2024-001"
```

**Interfaz de Datos:**
```typescript
interface Sacramento {
  idSacramento: number
  tipo: string
  fechaCelebracion: string
  hashblockchain: string
  codigoQR: string
  idFiel: number                      // Relación con Fiel
  idUsuarioPanelAdministrativo: number
  idParroquia: number
  certificadoEmitido: boolean
  fechaEmision?: string
  createdAt: string
}
```

**Estadísticas:**
```typescript
- Total Sacramentos
- Con Certificado
- Sin Certificado
- Tipo Más Frecuente
```

---

### 6. 📄 Módulo de Emisión de Certificados

**Archivo:** `components/emision-certificados-module.tsx`

**Descripción:**  
Búsqueda de fieles y emisión/descarga de certificados por sacramento registrado.

**Funcionalidades:**
- ✅ Lista completa de fieles
- ✅ Búsqueda por nombre o DNI
- ✅ Modal con sacramentos del fiel seleccionado
- ✅ Emisión de certificados por sacramento
- ✅ Descarga de certificados ya emitidos
- ✅ Actualización automática del sacramento
- ✅ Registro de fecha de emisión

**Flujo de Emisión:**
```
1. Buscar fiel en la lista
2. Click en "Ver Sacramentos"
3. Modal muestra sacramentos del fiel
4. Para cada sacramento:
   - Si NO emitido: Botón "Emitir Certificado"
   - Si YA emitido: Botón "Descargar Certificado"
5. Al emitir:
   - Crea registro en certificados
   - Actualiza sacramento.certificadoEmitido = true
   - Registra fechaEmision
   - Notificación de éxito
```

**Información Mostrada por Sacramento:**
```typescript
- Tipo con emoji
- Fecha de celebración
- Código QR
- Hash blockchain
- Estado (emitido/no emitido)
- Fecha de emisión (si aplica)
```

**Interfaz de Datos:**
```typescript
interface Certificado {
  idCertificado: number
  idSacramento: number    // Relación con Sacramento
  tipoUsuario: string
  idUsuario: number
  fechaEmision: string
}
```

**Estadísticas:**
```typescript
- Total Fieles
- Sacramentos Registrados
- Certificados Emitidos
- Pendientes de Emisión
```

---

### 7. ⛓️ Módulo de Blockchain

**Archivo:** `components/blockchain-module.tsx`

**Descripción:**  
Registro y verificación de sacramentos en blockchain con trazabilidad completa.

**Funcionalidades:**
- ✅ Verificación de hash blockchain
- ✅ Lista de todos los registros blockchain
- ✅ Búsqueda avanzada (tipo, fiel, DNI, hash, QR)
- ✅ Información completa del sacramento y fiel
- ✅ Estado de la red blockchain
- ✅ Copiado de hash al portapapeles

**Pestañas del Módulo:**

**1. Verificar Hash:**
```typescript
- Input de hash blockchain
- Búsqueda en sacramentos reales
- Resultado detallado:
  * Información del Sacramento
  * Datos del Fiel
  * Estado Blockchain
  * Estado del Certificado
```

**2. Registros Blockchain:**
```typescript
- Tabla con todos los sacramentos
- Búsqueda multi-criterio
- Información por registro:
  * ID, Tipo, Fiel (nombre y DNI)
  * Código QR
  * Hash blockchain (completo)
  * Número de bloque
  * Estado (Confirmado/Pendiente)
  * Confirmaciones
  * Botón de verificación rápida
```

**3. Estado de Red:**
```typescript
- Estado de conexión
- Último bloque registrado
- Sacramentos totales en blockchain
- Tiempo de bloque (~15 segundos)
- Gas Price (20 Gwei)
- Nodos activos (3/3)
- Configuración de red:
  * Chain ID: 1337
  * RPC Endpoint
  * Contract Address
```

**Simulación de Blockchain:**
```typescript
// Estados basados en ID de sacramento
getBlockchainStatus(id) → "Confirmado" | "Pendiente"
getConfirmations(id) → 3 a 40 confirmaciones
getBlockNumber(id) → Número de bloque secuencial
```

**Estadísticas:**
```typescript
- Registros Totales
- Confirmados
- Pendientes
- Último Bloque
```

---

## 💾 Sistema de Datos

### Contexto Global (DataContext)

**Archivo:** `contexts/data-context.tsx`

**Descripción:**  
Sistema de estado global compartido que permite la comunicación en tiempo real entre todos los módulos.

**Características:**
- ✅ Un solo estado global (Single Source of Truth)
- ✅ Actualización automática en todos los módulos
- ✅ Relaciones automáticas entre entidades
- ✅ Sincronización bidireccional de contadores
- ✅ Preparado para backend con estructura API-ready

**Entidades Gestionadas:**

```typescript
// 5 Fieles con datos completos
interface Fiel { idFiel, nombreCompleto, fechaNacimiento, DNI, domicilio, createdAt }

// 9 Sacramentos con relaciones
interface Sacramento { idSacramento, tipo, fechaCelebracion, hashblockchain, codigoQR, 
                      idFiel, certificadoEmitido, fechaEmision, createdAt }

// 4 Roles con permisos
interface Role { idRol, descripcion, permissions[], userCount, createdAt }

// 5 Usuarios con roles
interface User { idUsuario, nombre, email, passwordHash, idRol, activo, createdAt }

// Certificados vinculados a sacramentos
interface Certificado { idCertificado, idSacramento, tipoUsuario, idUsuario, fechaEmision }
```

**Funciones CRUD:**

```typescript
// Fieles
addFiel(fielData): Fiel
updateFiel(id, fielData): void
deleteFiel(id): void

// Sacramentos
addSacramento(sacramentoData): Sacramento
updateSacramento(id, sacramentoData): void
deleteSacramento(id): void
getSacramentosByFiel(idFiel): Sacramento[]

// Certificados
addCertificado(certificadoData): Certificado
// Automáticamente actualiza sacramento.certificadoEmitido = true

// Roles
addRole(roleData): Role
updateRole(id, roleData): void
deleteRole(id): void
// Automáticamente actualiza userCount

// Usuarios
addUser(userData): User
updateUser(id, userData): void
deleteUser(id): void
// Automáticamente actualiza role.userCount
```

**Uso en Componentes:**

```typescript
import { useData } from "@/contexts/data-context"

function MiComponente() {
  const { fieles, sacramentos, addFiel, getSacramentosByFiel } = useData()
  
  // Todos los datos en tiempo real
  // Cambios se propagan automáticamente
}
```

**Sincronización Automática:**

```typescript
// Al crear usuario
addUser() → Incrementa role.userCount

// Al emitir certificado
addCertificado() → sacramento.certificadoEmitido = true
                 → sacramento.fechaEmision = fecha actual

// Al cambiar rol de usuario
updateUser({idRol: newRol}) → Decrementa oldRole.userCount
                            → Incrementa newRole.userCount
```

---

## 🔐 Autenticación y Autorización

### Sistema de Autenticación

**Archivo:** `contexts/auth-context.tsx`

**Descripción:**  
Contexto global de autenticación con gestión de sesión y roles.

**Funcionalidades:**
- ✅ Login/Logout
- ✅ Persistencia de sesión (LocalStorage)
- ✅ Información del usuario actual
- ✅ Roles y permisos
- ✅ Redirección automática

**Usuarios Demo:**

```typescript
// Administrador (acceso total)
Email: admin@basilica.org
Password: Admin123
Permisos: TODOS (22 permisos)

// Sacerdote (acceso amplio)
Email: sacerdote@basilica.org
Password: Sacerdote123
Permisos: 9 permisos (sacramentos, certificados, blockchain)

// Secretaria (acceso medio)
Email: secretaria@basilica.org
Password: Secretaria123
Permisos: 7 permisos (fieles, certificados)

// Consultor (solo lectura)
Email: consultor@basilica.org
Password: Consultor123
Permisos: 4 permisos (lectura de fieles, sacramentos, certificados, blockchain)
```

**Uso:**

```typescript
import { useAuth } from "@/contexts/auth-context"

function MiComponente() {
  const { user, login, logout } = useAuth()
  
  // user.name, user.role, user.permissions, user.parish
}
```

### Protección de Rutas

**Archivo:** `components/protected-route.tsx`

**Descripción:**  
Higher-Order Component que protege rutas y redirige usuarios no autenticados.

**Comportamiento:**
```typescript
if (!user && !isLoading) {
  → Redirige a /login
}

if (isLoading) {
  → Muestra <LoadingScreen />
}

if (user) {
  → Renderiza children (Dashboard)
}
```

**Uso:**

```typescript
<ProtectedRoute>
  <Dashboard />
</ProtectedRoute>
```

---

## 🚀 Instalación y Configuración

### Requisitos Previos

```bash
Node.js >= 18.x
npm >= 9.x o pnpm >= 8.x
```

### Instalación

```bash
# 1. Clonar el repositorio
git clone [URL_DEL_REPOSITORIO]
cd iglesiaGestion

# 2. Instalar dependencias
npm install
# o
pnpm install

# 3. Iniciar servidor de desarrollo
npm run dev
# o
pnpm dev
```

### Configuración

El proyecto está configurado para funcionar sin variables de entorno adicionales. Los datos son gestionados localmente mediante el `DataContext`.

**Archivos de Configuración:**

```typescript
// next.config.mjs - Configuración de Next.js
// tailwind.config.ts - Configuración de Tailwind CSS
// tsconfig.json - Configuración de TypeScript
// components.json - Configuración de shadcn/ui
```

### Acceso al Sistema

```
URL: http://localhost:3000
Redirige automáticamente a: http://localhost:3000/login

Credenciales de prueba:
  admin@basilica.org / Admin123
```

---

## 📜 Scripts Disponibles

```bash
# Desarrollo
npm run dev           # Inicia servidor de desarrollo en http://localhost:3000
pnpm dev             # Alternativa con pnpm

# Producción
npm run build        # Construye la aplicación para producción
npm run start        # Inicia servidor de producción

# Linting
npm run lint         # Ejecuta ESLint para verificar código

# TypeScript
tsc --noEmit        # Verifica tipos sin compilar
```

---

## 🔄 Flujo de Trabajo

### Flujo Completo: Registro de Bautismo y Emisión de Certificado

```
┌─────────────────────────────────────────────────────────────┐
│  PASO 1: REGISTRAR FIEL                                     │
└─────────────────────────────────────────────────────────────┘
Usuario: Módulo Fieles → "Registrar Fiel"
Datos:
  ✓ Nombre: "Juan Pérez Gómez"
  ✓ DNI: "12345678"
  ✓ Fecha Nacimiento: "1990-05-15"
  ✓ Domicilio: "Av. Principal 123, Lima"
Resultado: Fiel creado → Disponible en TODOS los módulos

                    ↓

┌─────────────────────────────────────────────────────────────┐
│  PASO 2: REGISTRAR SACRAMENTO                               │
└─────────────────────────────────────────────────────────────┘
Usuario: Módulo Sacramentos → "Registrar Sacramento"
Datos:
  ✓ Tipo: "Bautismo"
  ✓ Fiel: "Juan Pérez Gómez (DNI: 12345678)" ← Aparece en lista
  ✓ Fecha: "2024-10-16"
Generación Automática:
  → Hash: "0x9f8e7d6c..."
  → Código QR: "QR-BAU-2024-010"
Resultado: Sacramento registrado en blockchain

                    ↓

┌─────────────────────────────────────────────────────────────┐
│  PASO 3: VERIFICAR EN BLOCKCHAIN                            │
└─────────────────────────────────────────────────────────────┘
Usuario: Módulo Blockchain → "Registros Blockchain"
Búsqueda: "Juan Pérez"
Resultado:
  ✓ Sacramento de Bautismo visible
  ✓ Hash completo mostrado
  ✓ Estado: "Pendiente" (3 confirmaciones)
  ✓ Código QR visible

                    ↓

┌─────────────────────────────────────────────────────────────┐
│  PASO 4: EMITIR CERTIFICADO                                 │
└─────────────────────────────────────────────────────────────┘
Usuario: Módulo Emisión Certificados
Búsqueda: "Juan Pérez" o "12345678"
Acción: "Ver Sacramentos" → Modal con Bautismo
Estado: "No Emitido" (badge naranja)
Acción: "Emitir Certificado"
Proceso Automático:
  → Crea registro en certificados
  → sacramento.certificadoEmitido = true
  → sacramento.fechaEmision = "2024-10-16"
  → Botón cambia a "Descargar Certificado"
Resultado: Certificado emitido y disponible

                    ↓

┌─────────────────────────────────────────────────────────────┐
│  PASO 5: VERIFICACIÓN EN TODOS LOS MÓDULOS                  │
└─────────────────────────────────────────────────────────────┘
✓ Módulo Sacramentos: Badge "Emitido" (verde)
✓ Módulo Blockchain: Hash verificable
✓ Dashboard: Certificados pendientes decrementó
✓ Dashboard: Sacramento en "Recientes"

FLUJO COMPLETADO ✅
```

---

## 📚 Documentación Adicional

### Documentos del Proyecto

Si existe carpeta `docs/`, puede contener:

```
docs/
├── README.md                      # Índice de documentación
├── AUTENTICACION.md              # Sistema de autenticación
├── DATOS-COMPARTIDOS-MVP.md      # Sistema de datos global
├── MVP-SISTEMA-IGLESIA.md        # Funcionalidades del MVP
├── INICIO_RAPIDO.md              # Guía rápida
└── README-*.md                   # Docs de componentes específicos
```

### Recursos Útiles

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Shadcn/ui Documentation](https://ui.shadcn.com)
- [Formik Documentation](https://formik.org/docs)
- [Yup Documentation](https://github.com/jquense/yup)

---

## 🗺️ Roadmap

### Fase 1: Backend Integration (Próximo)

```typescript
✅ MVP actual con datos locales
⬜ Implementar API REST
⬜ Integrar React Query
⬜ Manejo de estados de carga
⬜ Error handling global
⬜ Retry logic
```

### Fase 2: Blockchain Real

```typescript
⬜ Smart contract en Solidity
⬜ Despliegue en red de prueba
⬜ Integración con Web3.js/Ethers.js
⬜ Firma de transacciones
⬜ Verificación on-chain
⬜ Explorador de blockchain
```

### Fase 3: Generación de PDFs

```typescript
⬜ Templates de certificados
⬜ Generación de PDF con jsPDF
⬜ Código QR en PDF
⬜ Firma digital
⬜ Watermark de blockchain
```

### Fase 4: Portal Público

```typescript
⬜ Sitio público de verificación
⬜ Escaneo de código QR
⬜ Verificación de hash
⬜ UI de resultado
⬜ Compartir en redes sociales
```

### Fase 5: Auditoría

```typescript
⬜ Sistema de logs
⬜ Registro de acciones CRUD
⬜ Visualización de auditoría
⬜ Filtros y búsqueda
⬜ Exportación de logs
```

---

## 🤝 Contribución

Este es un proyecto privado para la **Basílica Menor Nuestra Señora de la Merced**.

Para consultas o sugerencias, contactar al equipo de desarrollo.

---

## 📄 Licencia

**Propietario:** Basílica Menor Nuestra Señora de la Merced  
**Desarrollado por:** NEXORA Development Team  
**Versión:** 1.0.0 - MVP  
**Fecha:** Octubre 2024  

© 2024 Todos los derechos reservados.

---

## 🙏 Agradecimientos

Desarrollado con ❤️ para la **Basílica Menor Nuestra Señora de la Merced**

**Stack Powered by:**
- [Next.js](https://nextjs.org) - The React Framework
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS Framework
- [Shadcn/ui](https://ui.shadcn.com) - Re-usable Components
- [Formik](https://formik.org) - Form Management
- [Vercel](https://vercel.com) - Deployment Platform

---

**Para más información, consulte la documentación en la carpeta `docs/` (si existe).**

*Última actualización: Octubre 16, 2024*

