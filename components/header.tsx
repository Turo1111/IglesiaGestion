"use client"

import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { LogOut, Settings, User, Menu } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { NotificationsDropdown } from "./notifications-dropdown"

interface HeaderProps {
  onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  const { user, logout } = useAuth()

  if (!user) return null

  return (
    <header className="bg-white shadow-sm border-b px-3 sm:px-6 py-3 sm:py-4">
      <div className="flex items-center justify-between gap-2 sm:gap-4">
        {/* Botón hamburguesa (solo móvil) */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden flex-shrink-0"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Abrir menú</span>
        </Button>

        {/* Título */}
        <div className="min-w-0 flex-1">
          <h2 className="text-lg sm:text-2xl font-bold text-gray-900 truncate">
            Sistema de Gestión Interno
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 truncate hidden sm:block">{user.parish}</p>
        </div>

        {/* Acciones */}
        <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
          {/* Notificaciones */}
          <NotificationsDropdown />

          {/* Usuario */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 h-auto p-2 sm:p-2">
                <User className="h-4 w-4 sm:h-5 sm:w-5" />
                <div className="text-left hidden md:block">
                  <div className="font-medium text-sm">{user.name}</div>
                  <div className="text-xs text-gray-500">{user.role}</div>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">{user.role}</p>
                  <p className="text-xs leading-none text-muted-foreground truncate">{user.parish}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Configuración
              </DropdownMenuItem>
              <DropdownMenuItem onClick={logout} className="text-red-600 focus:text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                Cerrar Sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
