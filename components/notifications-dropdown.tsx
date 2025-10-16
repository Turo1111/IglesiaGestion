"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, CheckCheck, FileText, Hash, Users, AlertCircle, Calendar, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface Notification {
    id: string
    type: "certificate" | "user" | "blockchain" | "system" | "alert"
    title: string
    message: string
    time: string
    isRead: boolean
    icon?: React.ReactNode
}

export function NotificationsDropdown() {
    const [notifications, setNotifications] = useState<Notification[]>([
        {
            id: "1",
            type: "certificate",
            title: "Nuevo Certificado Creado",
            message: "Certificado de Bautismo para María Elena Vásquez ha sido registrado",
            time: "Hace 5 minutos",
            isRead: false,
        },
        {
            id: "2",
            type: "blockchain",
            title: "Validación Blockchain Completada",
            message: "El certificado CERT-2024-003 ha sido validado exitosamente",
            time: "Hace 15 minutos",
            isRead: false,
        },
        {
            id: "3",
            type: "user",
            title: "Nuevo Usuario Registrado",
            message: "Hermana Carmen López ha sido agregada al sistema",
            time: "Hace 1 hora",
            isRead: false,
        },
        {
            id: "4",
            type: "alert",
            title: "Certificados Pendientes",
            message: "Hay 3 certificados esperando validación en blockchain",
            time: "Hace 2 horas",
            isRead: true,
        },
        {
            id: "5",
            type: "system",
            title: "Respaldo Automático Completado",
            message: "El respaldo automático de la base de datos se completó exitosamente",
            time: "Hace 3 horas",
            isRead: true,
        },
        {
            id: "6",
            type: "certificate",
            title: "Certificado Descargado",
            message: "El certificado CERT-2024-001 fue descargado por el usuario",
            time: "Hace 4 horas",
            isRead: true,
        },
    ])

    const unreadCount = notifications.filter((n) => !n.isRead).length

    const getNotificationIcon = (type: Notification["type"]) => {
        switch (type) {
            case "certificate":
                return <FileText className="h-4 w-4 text-blue-500" />
            case "blockchain":
                return <Hash className="h-4 w-4 text-purple-500" />
            case "user":
                return <Users className="h-4 w-4 text-green-500" />
            case "alert":
                return <AlertCircle className="h-4 w-4 text-orange-500" />
            case "system":
                return <Calendar className="h-4 w-4 text-gray-500" />
            default:
                return <Bell className="h-4 w-4" />
        }
    }

    const markAsRead = (id: string) => {
        setNotifications((prev) =>
            prev.map((notification) =>
                notification.id === id ? { ...notification, isRead: true } : notification
            )
        )
    }

    const markAllAsRead = () => {
        setNotifications((prev) => prev.map((notification) => ({ ...notification, isRead: true })))
    }

    const removeNotification = (id: string) => {
        setNotifications((prev) => prev.filter((notification) => notification.id !== id))
    }

    const clearAll = () => {
        setNotifications([])
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                        <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                            {unreadCount}
                        </Badge>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-96">
                <div className="flex items-center justify-between px-2 py-2">
                    <DropdownMenuLabel className="p-0">
                        Notificaciones {unreadCount > 0 && `(${unreadCount} sin leer)`}
                    </DropdownMenuLabel>
                    {notifications.length > 0 && (
                        <div className="flex gap-1">
                            {unreadCount > 0 && (
                                <Button variant="ghost" size="sm" onClick={markAllAsRead} className="h-7 text-xs">
                                    <CheckCheck className="h-3 w-3 mr-1" />
                                    Marcar todas
                                </Button>
                            )}
                            <Button variant="ghost" size="sm" onClick={clearAll} className="h-7 text-xs text-red-600">
                                Limpiar
                            </Button>
                        </div>
                    )}
                </div>
                <DropdownMenuSeparator />

                {notifications.length === 0 ? (
                    <div className="py-12 text-center text-sm text-gray-500">
                        <Bell className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                        <p>No hay notificaciones</p>
                    </div>
                ) : (
                    <ScrollArea className="h-[400px]">
                        <div className="space-y-1 p-1">
                            {notifications.map((notification) => (
                                <div
                                    key={notification.id}
                                    className={cn(
                                        "relative group rounded-lg p-3 cursor-pointer transition-colors",
                                        notification.isRead
                                            ? "bg-white hover:bg-gray-50"
                                            : "bg-blue-50 hover:bg-blue-100 border-l-2 border-blue-500"
                                    )}
                                    onClick={() => !notification.isRead && markAsRead(notification.id)}
                                >
                                    <div className="flex gap-3">
                                        <div className="flex-shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-2">
                                                <p className="text-sm font-medium text-gray-900 truncate">{notification.title}</p>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-5 w-5 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        removeNotification(notification.id)
                                                    }}
                                                >
                                                    <X className="h-3 w-3" />
                                                </Button>
                                            </div>
                                            <p className="text-xs text-gray-600 line-clamp-2 mt-1">{notification.message}</p>
                                            <div className="flex items-center gap-2 mt-2">
                                                <p className="text-xs text-gray-400">{notification.time}</p>
                                                {!notification.isRead && (
                                                    <span className="inline-block h-2 w-2 bg-blue-500 rounded-full"></span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

