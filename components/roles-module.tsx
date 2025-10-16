"use client"

import { useState } from "react"
import { useData } from "@/contexts/data-context"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, Shield, MoreVertical, Edit, Trash2, Users } from "lucide-react"
import { RoleFormDialog } from "./role-form-dialog"

export function RolesModule() {
    const { roles } = useData()
    const { toast } = useToast()
    const [searchTerm, setSearchTerm] = useState("")

    const filteredRoles = roles.filter((role) =>
        role.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleEdit = (id: number) => {
        toast({
            title: "Función en desarrollo",
            description: "La edición de roles estará disponible próximamente.",
        })
    }

    const handleDelete = (id: number, descripcion: string) => {
        toast({
            title: "Función en desarrollo",
            description: `La eliminación del rol ${descripcion} estará disponible próximamente.`,
            variant: "destructive",
        })
    }

    const totalRoles = roles.length
    const totalPermisos = roles.reduce((sum, role) => sum + role.permissions.length, 0)
    const avgPermisosPerRole = totalRoles > 0 ? Math.round(totalPermisos / totalRoles) : 0

    return (
        <div className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4">
                <div className="min-w-0">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 truncate">Gestión de Roles</h1>
                    <p className="text-sm sm:text-base text-gray-500 truncate">Configure roles y permisos</p>
                </div>
                <RoleFormDialog />
            </div>

            {/* Estadísticas rápidas */}
            <div className="grid gap-3 sm:gap-4 grid-cols-2 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-xs sm:text-sm font-medium">Total Roles</CardTitle>
                        <Shield className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-xl sm:text-2xl font-bold">{totalRoles}</div>
                        <p className="text-xs text-muted-foreground hidden sm:block">Configurados</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-xs sm:text-sm font-medium">Usuarios</CardTitle>
                        <Users className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-xl sm:text-2xl font-bold">
                            {roles.reduce((sum, role) => sum + role.userCount, 0)}
                        </div>
                        <p className="text-xs text-muted-foreground hidden sm:block">Asignados</p>
                    </CardContent>
                </Card>
                <Card className="col-span-2 md:col-span-1">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-xs sm:text-sm font-medium">Promedio</CardTitle>
                        <Shield className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-xl sm:text-2xl font-bold">{avgPermisosPerRole}</div>
                        <p className="text-xs text-muted-foreground hidden sm:block">Permisos/rol</p>
                    </CardContent>
                </Card>
            </div>

            {/* Tabla de Roles */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-base sm:text-lg">Lista de Roles</CardTitle>
                    <CardDescription className="text-xs sm:text-sm">Visualice y gestione los roles</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3 sm:space-y-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Buscar por nombre de rol..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 text-sm"
                            />
                        </div>

                        <div className="overflow-x-auto -mx-3 sm:mx-0">
                            <div className="inline-block min-w-full align-middle px-3 sm:px-0">
                                <div className="rounded-md border">
                                    <Table className="min-w-[640px]">
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>ID</TableHead>
                                                <TableHead>Descripción</TableHead>
                                                <TableHead className="text-center">Usuarios</TableHead>
                                                <TableHead className="text-center">Permisos</TableHead>
                                                <TableHead>Permisos Asignados</TableHead>
                                                <TableHead>Fecha de Creación</TableHead>
                                                <TableHead className="text-right">Acciones</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {filteredRoles.length === 0 ? (
                                                <TableRow>
                                                    <TableCell colSpan={7} className="text-center text-gray-500 py-8">
                                                        No se encontraron roles
                                                    </TableCell>
                                                </TableRow>
                                            ) : (
                                                filteredRoles.map((role) => (
                                                    <TableRow key={role.idRol}>
                                                        <TableCell className="font-medium">{role.idRol}</TableCell>
                                                        <TableCell>
                                                            <div className="flex items-center gap-2">
                                                                <Shield className="h-4 w-4 text-gray-500" />
                                                                <span className="font-medium">{role.descripcion}</span>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className="text-center">
                                                            <Badge variant="outline">{role.userCount}</Badge>
                                                        </TableCell>
                                                        <TableCell className="text-center">
                                                            <Badge
                                                                variant="secondary"
                                                                className="bg-blue-100 text-blue-800 hover:bg-blue-200"
                                                            >
                                                                {role.permissions.length}
                                                            </Badge>
                                                        </TableCell>
                                                        <TableCell>
                                                            <div className="flex flex-wrap gap-1 max-w-md">
                                                                {role.permissions.slice(0, 3).map((permission, idx) => (
                                                                    <Badge key={idx} variant="outline" className="text-xs">
                                                                        {permission}
                                                                    </Badge>
                                                                ))}
                                                                {role.permissions.length > 3 && (
                                                                    <Badge variant="secondary" className="text-xs">
                                                                        +{role.permissions.length - 3} más
                                                                    </Badge>
                                                                )}
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>{role.createdAt}</TableCell>
                                                        <TableCell className="text-right">
                                                            <DropdownMenu>
                                                                <DropdownMenuTrigger asChild>
                                                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                                                        <MoreVertical className="h-4 w-4" />
                                                                    </Button>
                                                                </DropdownMenuTrigger>
                                                                <DropdownMenuContent align="end">
                                                                    <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                                                                    <DropdownMenuSeparator />
                                                                    <DropdownMenuItem onClick={() => handleEdit(role.idRol)}>
                                                                        <Edit className="mr-2 h-4 w-4" />
                                                                        Editar
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuItem
                                                                        onClick={() => handleDelete(role.idRol, role.descripcion)}
                                                                        className="text-red-600 focus:text-red-600"
                                                                        disabled={role.userCount > 0}
                                                                    >
                                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                                        Eliminar
                                                                    </DropdownMenuItem>
                                                                </DropdownMenuContent>
                                                            </DropdownMenu>
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            )}
                                        </TableBody>
                                    </Table>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
