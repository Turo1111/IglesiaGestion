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
import { Search, UserPlus, MoreVertical, Edit, Trash2, Users, Calendar } from "lucide-react"
import { FielFormDialog } from "./fiel-form-dialog"

export function FielModule() {
    const { fieles, getSacramentosByFiel } = useData()
    const { toast } = useToast()
    const [searchTerm, setSearchTerm] = useState("")

    const filteredFieles = fieles.filter(
        (fiel) =>
            fiel.nombreCompleto.toLowerCase().includes(searchTerm.toLowerCase()) ||
            fiel.DNI.includes(searchTerm) ||
            fiel.domicilio.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleEdit = (id: number) => {
        toast({
            title: "Función en desarrollo",
            description: "La edición de fieles estará disponible próximamente.",
        })
    }

    const handleDelete = (id: number, nombre: string) => {
        toast({
            title: "Función en desarrollo",
            description: `La eliminación del fiel ${nombre} estará disponible próximamente.`,
            variant: "destructive",
        })
    }

    const totalFieles = fieles.length
    const fielesConSacramentos = fieles.filter((f) => getSacramentosByFiel(f.idFiel).length > 0).length
    const fielesSinSacramentos = totalFieles - fielesConSacramentos

    return (
        <div className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4">
                <div className="min-w-0">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 truncate">Gestión de Fieles</h1>
                    <p className="text-sm sm:text-base text-gray-500 truncate">Administre los fieles de la parroquia</p>
                </div>
                <FielFormDialog />
            </div>

            {/* Estadísticas rápidas */}
            <div className="grid gap-3 sm:gap-4 grid-cols-2 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-xs sm:text-sm font-medium">Total Fieles</CardTitle>
                        <Users className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-xl sm:text-2xl font-bold">{totalFieles}</div>
                        <p className="text-xs text-muted-foreground hidden sm:block">Registrados</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-xs sm:text-sm font-medium">Con Sacramentos</CardTitle>
                        <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-xl sm:text-2xl font-bold text-green-600">{fielesConSacramentos}</div>
                        <p className="text-xs text-muted-foreground hidden sm:block">Al menos uno</p>
                    </CardContent>
                </Card>
                <Card className="col-span-2 md:col-span-1">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-xs sm:text-sm font-medium">Sin Sacramentos</CardTitle>
                        <UserPlus className="h-3 w-3 sm:h-4 sm:w-4 text-orange-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-xl sm:text-2xl font-bold text-orange-600">{fielesSinSacramentos}</div>
                        <p className="text-xs text-muted-foreground hidden sm:block">Pendientes</p>
                    </CardContent>
                </Card>
            </div>

            {/* Tabla de Fieles */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-base sm:text-lg">Lista de Fieles</CardTitle>
                    <CardDescription className="text-xs sm:text-sm">Visualice y gestione los fieles registrados</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3 sm:space-y-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Buscar por nombre, DNI..."
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
                                                <TableHead>Nombre Completo</TableHead>
                                                <TableHead>DNI</TableHead>
                                                <TableHead>Fecha de Nacimiento</TableHead>
                                                <TableHead>Domicilio</TableHead>
                                                <TableHead className="text-center">Sacramentos</TableHead>
                                                <TableHead>Fecha de Registro</TableHead>
                                                <TableHead className="text-right">Acciones</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {filteredFieles.length === 0 ? (
                                                <TableRow>
                                                    <TableCell colSpan={8} className="text-center text-gray-500 py-8">
                                                        No se encontraron fieles
                                                    </TableCell>
                                                </TableRow>
                                            ) : (
                                                filteredFieles.map((fiel) => {
                                                    const sacramentosCount = getSacramentosByFiel(fiel.idFiel).length
                                                    return (
                                                        <TableRow key={fiel.idFiel}>
                                                            <TableCell className="font-medium">{fiel.idFiel}</TableCell>
                                                            <TableCell>{fiel.nombreCompleto}</TableCell>
                                                            <TableCell>{fiel.DNI}</TableCell>
                                                            <TableCell>{fiel.fechaNacimiento}</TableCell>
                                                            <TableCell className="max-w-xs truncate">{fiel.domicilio}</TableCell>
                                                            <TableCell className="text-center">
                                                                <Badge
                                                                    variant={sacramentosCount > 0 ? "default" : "secondary"}
                                                                    className={
                                                                        sacramentosCount > 0
                                                                            ? "bg-green-100 text-green-800 hover:bg-green-200"
                                                                            : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                                                                    }
                                                                >
                                                                    {sacramentosCount}
                                                                </Badge>
                                                            </TableCell>
                                                            <TableCell>{fiel.createdAt}</TableCell>
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
                                                                        <DropdownMenuItem onClick={() => handleEdit(fiel.idFiel)}>
                                                                            <Edit className="mr-2 h-4 w-4" />
                                                                            Editar
                                                                        </DropdownMenuItem>
                                                                        <DropdownMenuItem
                                                                            onClick={() => handleDelete(fiel.idFiel, fiel.nombreCompleto)}
                                                                            className="text-red-600 focus:text-red-600"
                                                                        >
                                                                            <Trash2 className="mr-2 h-4 w-4" />
                                                                            Eliminar
                                                                        </DropdownMenuItem>
                                                                    </DropdownMenuContent>
                                                                </DropdownMenu>
                                                            </TableCell>
                                                        </TableRow>
                                                    )
                                                })
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
