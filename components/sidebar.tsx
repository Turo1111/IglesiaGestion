"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Users, FileText, Shield, Hash, Church, X } from "lucide-react"

interface SidebarProps {
  activeModule: string
  setActiveModule: (module: string) => void
  isMobileOpen: boolean
  setIsMobileOpen: (open: boolean) => void
}

export function Sidebar({ activeModule, setActiveModule, isMobileOpen, setIsMobileOpen }: SidebarProps) {
  // Módulos del MVP
  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      description: "Vista general del sistema",
    },
    {
      id: "users",
      label: "Usuarios",
      icon: Users,
      description: "ABM Usuarios",
    },
    {
      id: "roles",
      label: "Roles",
      icon: Shield,
      description: "ABM Roles y Permisos",
    },
    {
      id: "fieles",
      label: "Fieles",
      icon: Users,
      description: "ABM Fieles",
    },
    {
      id: "sacramentos",
      label: "Sacramentos",
      icon: FileText,
      description: "ABM Sacramentos",
    },
    {
      id: "emision-certificados",
      label: "Certificados",
      icon: FileText,
      description: "Emisión y Descarga",
    },
    {
      id: "blockchain",
      label: "Blockchain",
      icon: Hash,
      description: "Registro y Verificación",
    },
  ]

  const handleModuleClick = (moduleId: string) => {
    setActiveModule(moduleId)
    // Cerrar sidebar en móvil después de seleccionar
    setIsMobileOpen(false)
  }

  // Cerrar sidebar al presionar Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileOpen(false)
      }
    }

    if (isMobileOpen) {
      document.addEventListener("keydown", handleEscape)
      // Prevenir scroll del body cuando el menú está abierto
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [isMobileOpen, setIsMobileOpen])

  return (
    <>
      {/* Overlay para móvil */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-lg flex flex-col transition-transform duration-300 ease-in-out",
          "lg:translate-x-0",
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header del Sidebar */}
        <div className="p-4 sm:p-6 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <Church className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <h1 className="font-bold text-base sm:text-lg truncate">SGI Basílica</h1>
                <p className="text-xs text-gray-500 truncate">Sistema de Gestión</p>
              </div>
            </div>
            {/* Botón cerrar en móvil */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden flex-shrink-0 -mr-2"
              onClick={() => setIsMobileOpen(false)}
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Cerrar menú</span>
            </Button>
          </div>
        </div>

        {/* Navegación */}
        <nav className="flex-1 p-3 sm:p-4 overflow-y-auto">
          <div className="space-y-1 sm:space-y-2">
            {menuItems.map((item) => (
              <Button
                key={item.id}
                variant={activeModule === item.id ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start h-auto p-2.5 sm:p-3 text-left",
                  activeModule === item.id && "bg-blue-600 text-white hover:bg-blue-700"
                )}
                onClick={() => handleModuleClick(item.id)}
              >
                <item.icon className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm sm:text-base truncate">{item.label}</div>
                  <div className="text-xs opacity-70 truncate hidden sm:block">{item.description}</div>
                </div>
              </Button>
            ))}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-3 sm:p-4 border-t">
          <div className="text-xs text-gray-500 text-center overflow-hidden">
            <p className="truncate px-2">Basílica Menor</p>
            <p className="truncate px-2 hidden sm:block">Nuestra Señora de la Merced</p>
            <p className="mt-1 font-medium">v1.0.0</p>
          </div>
        </div>
      </div>
    </>
  )
}
