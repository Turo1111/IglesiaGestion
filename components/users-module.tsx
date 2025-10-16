"use client"

import { useState } from "react"
import { useData } from "@/contexts/data-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Edit, Eye, UserCheck, UserX } from "lucide-react"
import { UserFormDialog } from "./user-form-dialog"
import { useToast } from "@/hooks/use-toast"

export function UsersModule() {
  const { users, updateUser, roles } = useData()
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")

  const filteredUsers = users.filter((user) => {
    const role = roles.find((r) => r.idRol === user.idRol)
    const roleDesc = role?.descripcion || ""

    return (
      user.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      roleDesc.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  const getRoleColor = (roleDesc: string) => {
    switch (roleDesc) {
      case "Administrador":
        return "bg-red-100 text-red-800"
      case "Sacerdote":
        return "bg-purple-100 text-purple-800"
      case "Secretaria":
        return "bg-blue-100 text-blue-800"
      case "Asistente":
      case "Consultor":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (activo: boolean) => {
    return activo ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
  }

  const toggleUserStatus = (userId: number) => {
    const user = users.find((u) => u.idUsuario === userId)
    if (user) {
      updateUser(userId, { activo: !user.activo })
      toast({
        title: user.activo ? "Usuario desactivado" : "Usuario activado",
        description: `${user.nombre} ha sido ${user.activo ? "desactivado" : "activado"}.`,
      })
    }
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4">
        <div className="min-w-0">
          <h1 className="text-2xl sm:text-3xl font-bold truncate">Gestión de Usuarios</h1>
          <p className="text-sm sm:text-base text-gray-600 truncate">Administración del personal autorizado</p>
        </div>

        <UserFormDialog />
      </div>

      {/* Estadísticas de usuarios */}
      <div className="grid gap-3 sm:gap-4 grid-cols-2 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">{users.length}</div>
            <p className="text-xs text-muted-foreground hidden sm:block">Usuarios</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Activos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-green-600">{users.filter((u) => u.activo).length}</div>
            <p className="text-xs text-muted-foreground hidden sm:block">Usuarios</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Roles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">{roles.length}</div>
            <p className="text-xs text-muted-foreground hidden sm:block">Disponibles</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Inactivos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-red-600">{users.filter((u) => !u.activo).length}</div>
            <p className="text-xs text-muted-foreground hidden sm:block">Usuarios</p>
          </CardContent>
        </Card>
      </div>

      {/* Búsqueda y tabla */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base sm:text-lg">Lista de Usuarios</CardTitle>
          <CardDescription className="text-xs sm:text-sm">Gestione los perfiles y permisos del personal</CardDescription>
          <div className="flex items-center space-x-2 mt-4">
            <Search className="h-4 w-4 text-gray-400 flex-shrink-0" />
            <Input
              placeholder="Buscar usuarios..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:max-w-sm text-sm"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto -mx-3 sm:mx-0">
            <div className="inline-block min-w-full align-middle px-3 sm:px-0">
              <Table className="min-w-[640px]">
                <TableHeader>
                  <TableRow>
                    <TableHead>Usuario</TableHead>
                    <TableHead>Rol</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Último Acceso</TableHead>
                    <TableHead>Permisos</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => {
                    const role = roles.find((r) => r.idRol === user.idRol)
                    const roleDesc = role?.descripcion || "Sin rol"
                    const rolePermissions = role?.permissions || []

                    return (
                      <TableRow key={user.idUsuario}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{user.nombre}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getRoleColor(roleDesc)}>{roleDesc}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(user.activo)}>
                            {user.activo ? "Activo" : "Inactivo"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm">{user.createdAt}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {rolePermissions.slice(0, 3).map((permission, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {permission}
                              </Badge>
                            ))}
                            {rolePermissions.length > 3 && (
                              <Badge variant="secondary" className="text-xs">
                                +{rolePermissions.length - 3}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => toggleUserStatus(user.idUsuario)}>
                              {user.activo ? (
                                <UserX className="h-4 w-4 text-red-500" />
                              ) : (
                                <UserCheck className="h-4 w-4 text-green-500" />
                              )}
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
