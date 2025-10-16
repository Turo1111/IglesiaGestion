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
import { Search, Plus, MoreVertical, Edit, Trash2, FileText, Hash, Check, X } from "lucide-react"
import { SacramentoFormDialog } from "./sacramento-form-dialog"

export function SacramentosModule() {
    const { sacramentos, fieles } = useData()
    const { toast } = useToast()
    const [searchTerm, setSearchTerm] = useState("")

    const filteredSacramentos = sacramentos.filter((sacramento) => {
        const fiel = fieles.find((f) => f.idFiel === sacramento.idFiel)
        const fielNombre = fiel?.nombreCompleto.toLowerCase() || ""
        const fielDNI = fiel?.DNI || ""

        return (
            sacramento.tipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            fielNombre.includes(searchTerm.toLowerCase()) ||
            fielDNI.includes(searchTerm) ||
            sacramento.codigoQR.toLowerCase().includes(searchTerm.toLowerCase())
        )
    })

    const handleEdit = (id: number) => {
        toast({
            title: "Función en desarrollo",
            description: "La edición de sacramentos estará disponible próximamente.",
        })
    }

    const handleDelete = (id: number, tipo: string) => {
        toast({
            title: "Función en desarrollo",
            description: `La eliminación del sacramento de ${tipo} estará disponible próximamente.`,
            variant: "destructive",
        })
    }

    const totalSacramentos = sacramentos.length
    const certificadosEmitidos = sacramentos.filter((s) => s.certificadoEmitido).length
    const certificadosPendientes = sacramentos.filter((s) => !s.certificadoEmitido).length

    // Agrupar por tipo
    const sacramentosPorTipo = sacramentos.reduce(
        (acc, sacramento) => {
            acc[sacramento.tipo] = (acc[sacramento.tipo] || 0) + 1
            return acc
        },
        {} as Record<string, number>
    )

    const tipoMasComun = Object.entries(sacramentosPorTipo).sort((a, b) => b[1] - a[1])[0]

    return (
        <div className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4">
                <div className="min-w-0">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 truncate">Gestión de Sacramentos</h1>
                    <p className="text-sm sm:text-base text-gray-500 truncate">Registre los sacramentos de los fieles</p>
                </div>
                <SacramentoFormDialog />
            </div>

            {/* Estadísticas rápidas */}
            <div className="grid gap-3 sm:gap-4 grid-cols-2 md:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-xs sm:text-sm font-medium">Total</CardTitle>
                        <FileText className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-xl sm:text-2xl font-bold">{totalSacramentos}</div>
                        <p className="text-xs text-muted-foreground hidden sm:block">Sacramentos</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-xs sm:text-sm font-medium">Emitidos</CardTitle>
                        <Check className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-xl sm:text-2xl font-bold text-green-600">{certificadosEmitidos}</div>
                        <p className="text-xs text-muted-foreground hidden sm:block">Certificados</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-xs sm:text-sm font-medium">Pendientes</CardTitle>
                        <X className="h-3 w-3 sm:h-4 sm:w-4 text-orange-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-xl sm:text-2xl font-bold text-orange-600">{certificadosPendientes}</div>
                        <p className="text-xs text-muted-foreground hidden sm:block">Por emitir</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-xs sm:text-sm font-medium truncate">Frecuente</CardTitle>
                        <Hash className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-base sm:text-lg font-bold truncate">{tipoMasComun?.[0] || "N/A"}</div>
                        <p className="text-xs text-muted-foreground hidden sm:block">{tipoMasComun?.[1] || 0} registros</p>
                    </CardContent>
                </Card>
            </div>

            {/* Tabla de Sacramentos */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-base sm:text-lg">Lista de Sacramentos</CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                        Visualice y gestione los sacramentos registrados
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3 sm:space-y-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Buscar por tipo, fiel, DNI..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 text-sm"
                            />
                        </div>

                        <div className="overflow-x-auto -mx-3 sm:mx-0">
                            <div className="inline-block min-w-full align-middle px-3 sm:px-0">
                                <div className="rounded-md border">
                                    <Table className="min-w-[700px]">
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>ID</TableHead>
                                                <TableHead>Tipo</TableHead>
                                                <TableHead>Fiel</TableHead>
                                                <TableHead>DNI</TableHead>
                                                <TableHead>Fecha Celebración</TableHead>
                                                <TableHead>Código QR</TableHead>
                                                <TableHead className="text-center">Certificado</TableHead>
                                                <TableHead>Hash Blockchain</TableHead>
                                                <TableHead className="text-right">Acciones</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {filteredSacramentos.length === 0 ? (
                                                <TableRow>
                                                    <TableCell colSpan={9} className="text-center text-gray-500 py-8">
                                                        No se encontraron sacramentos
                                                    </TableCell>
                                                </TableRow>
                                            ) : (
                                                filteredSacramentos.map((sacramento) => {
                                                    const fiel = fieles.find((f) => f.idFiel === sacramento.idFiel)
                                                    return (
                                                        <TableRow key={sacramento.idSacramento}>
                                                            <TableCell className="font-medium">{sacramento.idSacramento}</TableCell>
                                                            <TableCell>
                                                                <Badge variant="outline">{sacramento.tipo}</Badge>
                                                            </TableCell>
                                                            <TableCell>{fiel?.nombreCompleto || "Desconocido"}</TableCell>
                                                            <TableCell>{fiel?.DNI || "N/A"}</TableCell>
                                                            <TableCell>{sacramento.fechaCelebracion}</TableCell>
                                                            <TableCell>
                                                                <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                                                                    {sacramento.codigoQR}
                                                                </code>
                                                            </TableCell>
                                                            <TableCell className="text-center">
                                                                {sacramento.certificadoEmitido ? (
                                                                    <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                                                                        <Check className="mr-1 h-3 w-3" />
                                                                        Emitido
                                                                    </Badge>
                                                                ) : (
                                                                    <Badge
                                                                        variant="secondary"
                                                                        className="bg-orange-100 text-orange-800 hover:bg-orange-200"
                                                                    >
                                                                        <X className="mr-1 h-3 w-3" />
                                                                        Pendiente
                                                                    </Badge>
                                                                )}
                                                            </TableCell>
                                                            <TableCell>
                                                                <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                                                                    {sacramento.hashblockchain.substring(0, 12)}...
                                                                </code>
                                                            </TableCell>
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
                                                                        <DropdownMenuItem onClick={() => handleEdit(sacramento.idSacramento)}>
                                                                            <Edit className="mr-2 h-4 w-4" />
                                                                            Editar
                                                                        </DropdownMenuItem>
                                                                        <DropdownMenuItem
                                                                            onClick={() => handleDelete(sacramento.idSacramento, sacramento.tipo)}
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
