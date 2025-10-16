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
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Search, FileText, Download, Check, X, Calendar, Hash } from "lucide-react"

export function EmisionCertificadosModule() {
    const { fieles, sacramentos, getSacramentosByFiel, addCertificado } = useData()
    const { toast } = useToast()
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedFiel, setSelectedFiel] = useState<number | null>(null)
    const [dialogOpen, setDialogOpen] = useState(false)

    const filteredFieles = fieles.filter(
        (fiel) =>
            fiel.nombreCompleto.toLowerCase().includes(searchTerm.toLowerCase()) ||
            fiel.DNI.includes(searchTerm)
    )

    const handleSelectFiel = (idFiel: number) => {
        setSelectedFiel(idFiel)
        setDialogOpen(true)
    }

    const handleEmitCertificate = (idSacramento: number, tipo: string, nombreFiel: string) => {
        addCertificado({
            idSacramento,
            tipoUsuario: "Administrativo",
            idUsuario: 1, // Usuario actual del sistema
            fechaEmision: new Date().toISOString().split("T")[0],
        })

        toast({
            title: "Certificado emitido exitosamente",
            description: `El certificado de ${tipo} para ${nombreFiel} ha sido generado y está listo para descargar.`,
        })

        setDialogOpen(false)
        setSelectedFiel(null)
    }

    const handleDownloadCertificate = (sacramento: any, nombreFiel: string) => {
        toast({
            title: "Descargando certificado",
            description: `El certificado de ${sacramento.tipo} para ${nombreFiel} se está descargando...`,
        })

        // Aquí iría la lógica real de descarga
        console.log("Descargando certificado:", sacramento)
    }

    const fielSeleccionado = selectedFiel ? fieles.find((f) => f.idFiel === selectedFiel) : null
    const sacramentosFiel = selectedFiel ? getSacramentosByFiel(selectedFiel) : []

    const getSacramentoIcon = (tipo: string) => {
        const icons: Record<string, string> = {
            Bautismo: "💧",
            "Primera Comunión": "🍞",
            Confirmación: "🕊️",
            Matrimonio: "💒",
            Penitencia: "✝️",
            "Unción de Enfermos": "🙏",
            "Orden Sacerdotal": "📿",
        }
        return icons[tipo] || "📄"
    }

    const totalFieles = fieles.length
    const totalSacramentos = sacramentos.length
    const certificadosEmitidos = sacramentos.filter((s) => s.certificadoEmitido).length
    const certificadosPendientes = sacramentos.filter((s) => !s.certificadoEmitido).length

    return (
        <div className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4">
                <div className="min-w-0">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 truncate">Emisión de Certificados</h1>
                    <p className="text-sm sm:text-base text-gray-500 truncate">Busque un fiel y seleccione el sacramento</p>
                </div>
            </div>

            {/* Estadísticas rápidas */}
            <div className="grid gap-3 sm:gap-4 grid-cols-2 md:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-xs sm:text-sm font-medium">Fieles</CardTitle>
                        <FileText className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-xl sm:text-2xl font-bold">{totalFieles}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-xs sm:text-sm font-medium">Sacramentos</CardTitle>
                        <Hash className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-xl sm:text-2xl font-bold">{totalSacramentos}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-xs sm:text-sm font-medium">Emitidos</CardTitle>
                        <Check className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-xl sm:text-2xl font-bold text-green-600">{certificadosEmitidos}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-xs sm:text-sm font-medium">Pendientes</CardTitle>
                        <X className="h-3 w-3 sm:h-4 sm:w-4 text-orange-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-xl sm:text-2xl font-bold text-orange-600">{certificadosPendientes}</div>
                    </CardContent>
                </Card>
            </div>

            {/* Búsqueda y Tabla de Fieles */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-base sm:text-lg">Lista de Fieles</CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                        Seleccione un fiel para ver sus sacramentos
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3 sm:space-y-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Buscar por nombre o DNI..."
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
                                                <TableHead>Nombre Completo</TableHead>
                                                <TableHead>DNI</TableHead>
                                                <TableHead>Fecha de Nacimiento</TableHead>
                                                <TableHead>Domicilio</TableHead>
                                                <TableHead className="text-center">Sacramentos</TableHead>
                                                <TableHead className="text-right">Acción</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {filteredFieles.length === 0 ? (
                                                <TableRow>
                                                    <TableCell colSpan={6} className="text-center text-gray-500 py-8">
                                                        No se encontraron fieles con ese criterio de búsqueda
                                                    </TableCell>
                                                </TableRow>
                                            ) : (
                                                filteredFieles.map((fiel) => {
                                                    const sacramentosFiel = getSacramentosByFiel(fiel.idFiel)
                                                    return (
                                                        <TableRow key={fiel.idFiel}>
                                                            <TableCell className="font-medium">{fiel.nombreCompleto}</TableCell>
                                                            <TableCell>{fiel.DNI}</TableCell>
                                                            <TableCell>{fiel.fechaNacimiento}</TableCell>
                                                            <TableCell className="max-w-xs truncate">{fiel.domicilio}</TableCell>
                                                            <TableCell className="text-center">
                                                                <Badge variant="outline">{sacramentosFiel.length}</Badge>
                                                            </TableCell>
                                                            <TableCell className="text-right">
                                                                <Button
                                                                    size="sm"
                                                                    onClick={() => handleSelectFiel(fiel.idFiel)}
                                                                    disabled={sacramentosFiel.length === 0}
                                                                >
                                                                    <FileText className="mr-2 h-4 w-4" />
                                                                    Ver Sacramentos
                                                                </Button>
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

            {/* Modal de Sacramentos del Fiel */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="max-w-[95vw] sm:max-w-3xl max-h-[85vh] sm:max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Sacramentos de {fielSeleccionado?.nombreCompleto}</DialogTitle>
                        <DialogDescription>
                            DNI: {fielSeleccionado?.DNI} | Fecha de Nacimiento: {fielSeleccionado?.fechaNacimiento}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 mt-4">
                        {sacramentosFiel.length === 0 ? (
                            <div className="text-center py-8 text-gray-500">
                                Este fiel no tiene sacramentos registrados aún.
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-4">
                                {sacramentosFiel.map((sacramento) => (
                                    <Card key={sacramento.idSacramento} className="border-2">
                                        <CardHeader className="pb-3">
                                            <div className="flex items-start justify-between">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-3xl">{getSacramentoIcon(sacramento.tipo)}</span>
                                                    <div>
                                                        <CardTitle className="text-lg">{sacramento.tipo}</CardTitle>
                                                        <CardDescription className="flex items-center gap-2 mt-1">
                                                            <Calendar className="h-3 w-3" />
                                                            {sacramento.fechaCelebracion}
                                                        </CardDescription>
                                                    </div>
                                                </div>
                                                <Badge
                                                    variant={sacramento.certificadoEmitido ? "default" : "secondary"}
                                                    className={
                                                        sacramento.certificadoEmitido
                                                            ? "bg-green-100 text-green-800 hover:bg-green-200"
                                                            : "bg-orange-100 text-orange-800 hover:bg-orange-200"
                                                    }
                                                >
                                                    {sacramento.certificadoEmitido ? (
                                                        <>
                                                            <Check className="mr-1 h-3 w-3" />
                                                            Emitido
                                                        </>
                                                    ) : (
                                                        <>
                                                            <X className="mr-1 h-3 w-3" />
                                                            No Emitido
                                                        </>
                                                    )}
                                                </Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-2 text-sm">
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Hash Blockchain:</span>
                                                    <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                                                        {sacramento.hashblockchain.substring(0, 20)}...
                                                    </code>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Código QR:</span>
                                                    <span className="font-mono text-xs">{sacramento.codigoQR}</span>
                                                </div>
                                                {sacramento.certificadoEmitido && sacramento.fechaEmision && (
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600">Fecha de Emisión:</span>
                                                        <span>{sacramento.fechaEmision}</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex gap-2 mt-4">
                                                {!sacramento.certificadoEmitido ? (
                                                    <Button
                                                        className="flex-1"
                                                        onClick={() =>
                                                            handleEmitCertificate(
                                                                sacramento.idSacramento,
                                                                sacramento.tipo,
                                                                fielSeleccionado?.nombreCompleto || ""
                                                            )
                                                        }
                                                    >
                                                        <FileText className="mr-2 h-4 w-4" />
                                                        Emitir Certificado
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        className="flex-1"
                                                        variant="outline"
                                                        onClick={() => handleDownloadCertificate(sacramento, fielSeleccionado?.nombreCompleto || "")}
                                                    >
                                                        <Download className="mr-2 h-4 w-4" />
                                                        Descargar Certificado
                                                    </Button>
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
