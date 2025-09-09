"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Users, FileText, Shield, Hash, BarChart3, Church } from "lucide-react"

interface SidebarProps {
  activeModule: string
  setActiveModule: (module: string) => void
}

export function Sidebar({ activeModule, setActiveModule }: SidebarProps) {
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
      description: "Gestión de personal autorizado",
    },
    {
      id: "certificates",
      label: "Certificados",
      icon: FileText,
      description: "Gestión de certificados eclesiásticos",
    },
    {
      id: "security",
      label: "Seguridad",
      icon: Shield,
      description: "Control de acceso y auditoría",
    },
    {
      id: "blockchain",
      label: "Blockchain",
      icon: Hash,
      description: "Verificación y validación",
    },
    {
      id: "statistics",
      label: "Estadísticas",
      icon: BarChart3,
      description: "Informes y métricas",
    },
  ]

  return (
    <div className="w-64 bg-white shadow-lg flex flex-col">
      <div className="p-6 border-b">
        <div className="flex items-center gap-3">
          <Church className="h-8 w-8 text-blue-600" />
          <div>
            <h1 className="font-bold text-lg">SGI Basílica</h1>
            <p className="text-xs text-gray-500">Sistema de Gestión Interno</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {menuItems.map((item) => (
            <Button
              key={item.id}
              variant={activeModule === item.id ? "default" : "ghost"}
              className={cn(
                "w-full justify-start h-auto p-3 text-left",
                activeModule === item.id && "bg-blue-600 text-white hover:bg-blue-700",
              )}
              onClick={() => setActiveModule(item.id)}
            >
              <item.icon className="mr-3 h-5 w-5" />
              <div>
                <div className="font-medium">{item.label}</div>
                <div className="text-xs opacity-70">{item.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </nav>

      <div className="p-4 border-t">
        <div className="text-xs text-gray-500 text-center">
          <p>Basílica Menor</p>
          <p>Nuestra Señora de la Merced</p>
          <p className="mt-1 font-medium">v1.0.0</p>
        </div>
      </div>
    </div>
  )
}
