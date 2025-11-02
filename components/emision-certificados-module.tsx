"use client"

import { useState } from "react"
import { useData } from "@/contexts/data-context"
import { useAuth } from "@/contexts/auth-context"
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
import jsPDF from "jspdf"

export function EmisionCertificadosModule() {
    const { fieles, sacramentos, getSacramentosByFiel, addCertificado } = useData()
    const { user } = useAuth()
    const { toast } = useToast()
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedFiel, setSelectedFiel] = useState<number | null>(null)
    const [dialogOpen, setDialogOpen] = useState(false)

    // Verificar permisos del usuario
    const canEmitCertificate = user?.role === "Administrador" || user?.role === "Secretario"
    const canDownloadCertificate = user?.role === "Administrador" || user?.role === "Secretario"

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
        // Verificar permisos
        if (!canEmitCertificate) {
            toast({
                title: "Acceso denegado",
                description: "No tiene permisos para emitir certificados.",
                variant: "destructive",
            })
            return
        }

        addCertificado({
            idSacramento,
            tipoUsuario: user?.role || "Administrativo",
            idUsuario: parseInt(user?.id || "1"),
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
        // Verificar permisos
        if (!canDownloadCertificate) {
            toast({
                title: "Acceso denegado",
                description: "No tiene permisos para descargar certificados.",
                variant: "destructive",
            })
            return
        }

        try {
            // SIMULACIÓN DE ERROR: Matrimonio de Carlos Mendoza García siempre falla
            if (sacramento.tipo === "Matrimonio" && nombreFiel === "Carlos Mendoza García") {
                throw new Error("ERROR_SIMULADO: Fallo en la generación del PDF para certificado de Matrimonio - ID: QR-MAT-2024-007")
            }

            // Crear documento PDF
            const doc = new jsPDF({
                orientation: "portrait",
                unit: "mm",
                format: "a4",
            })

            const pageWidth = doc.internal.pageSize.getWidth()
            const pageHeight = doc.internal.pageSize.getHeight()

            // Fondo decorativo con bordes
            doc.setDrawColor(139, 69, 19) // Color café/marrón para apariencia eclesiástica
            doc.setLineWidth(2)
            doc.rect(10, 10, pageWidth - 20, pageHeight - 20, "S")

            doc.setLineWidth(0.5)
            doc.rect(15, 15, pageWidth - 30, pageHeight - 30, "S")

            // Decoración superior (cruz)
            doc.setFontSize(40)
            doc.text("✝", pageWidth / 2, 30, { align: "center" })

            // Título principal
            doc.setFontSize(24)
            doc.setFont("times", "bold")
            doc.text("CERTIFICADO ECLESIÁSTICO", pageWidth / 2, 45, { align: "center" })

            // Subtítulo del tipo de sacramento
            doc.setFontSize(18)
            doc.setFont("times", "normal")
            doc.text(`DE ${sacramento.tipo.toUpperCase()}`, pageWidth / 2, 55, { align: "center" })

            // Línea decorativa
            doc.setLineWidth(0.5)
            doc.line(40, 60, pageWidth - 40, 60)

            // Texto introductorio
            doc.setFontSize(12)
            doc.setFont("times", "italic")
            const textoIntro = "La presente certifica que en los registros parroquiales consta que:"
            doc.text(textoIntro, pageWidth / 2, 75, { align: "center" })

            // Nombre del fiel (destacado)
            doc.setFontSize(16)
            doc.setFont("times", "bold")
            doc.text(nombreFiel, pageWidth / 2, 90, { align: "center" })

            // Texto principal del certificado
            doc.setFontSize(12)
            doc.setFont("times", "normal")

            const textoCuerpo = `Ha recibido el Sacramento de ${sacramento.tipo}`
            doc.text(textoCuerpo, pageWidth / 2, 105, { align: "center" })

            // Detalles del sacramento
            doc.setFontSize(11)
            const detalles = [
                `Fecha de Celebración: ${sacramento.fechaCelebracion}`,
                `Fecha de Emisión: ${sacramento.fechaEmision || new Date().toLocaleDateString("es-ES")}`,
            ]

            let yPosition = 125
            detalles.forEach((detalle) => {
                doc.text(detalle, pageWidth / 2, yPosition, { align: "center" })
                yPosition += 10
            })

            // Información de verificación
            doc.setFontSize(9)
            doc.setFont("times", "italic")
            yPosition = 155

            doc.text("Código de Verificación:", 25, yPosition)
            doc.setFont("courier", "normal")
            doc.text(sacramento.codigoQR, 25, yPosition + 6)

            doc.setFont("times", "italic")
            doc.text("Hash Blockchain:", 25, yPosition + 16)
            doc.setFont("courier", "normal")

            // Dividir el hash en múltiples líneas si es muy largo
            const hash = sacramento.hashblockchain
            const hashPart1 = hash.substring(0, 40)
            const hashPart2 = hash.substring(40)
            doc.text(hashPart1, 25, yPosition + 22)
            if (hashPart2) {
                doc.text(hashPart2, 25, yPosition + 27)
            }

            // Sección de firmas
            yPosition = pageHeight - 70
            doc.setLineWidth(0.3)

            // Línea de firma izquierda
            doc.line(30, yPosition, 80, yPosition)
            doc.setFontSize(10)
            doc.setFont("times", "normal")
            doc.text("Párroco", 55, yPosition + 6, { align: "center" })

            // Línea de firma derecha
            doc.line(pageWidth - 80, yPosition, pageWidth - 30, yPosition)
            doc.text("Secretario Parroquial", pageWidth - 55, yPosition + 6, { align: "center" })

            // Sello parroquial (texto simulado)
            doc.setFontSize(8)
            doc.setFont("times", "italic")
            const textoSello = [
                "Este certificado es emitido por",
                "la Parroquia [Nombre de la Parroquia]",
                "y cuenta con validez oficial eclesiástica"
            ]
            yPosition = pageHeight - 45
            textoSello.forEach((linea) => {
                doc.text(linea, pageWidth / 2, yPosition, { align: "center" })
                yPosition += 5
            })

            // Número de certificado
            doc.setFontSize(8)
            doc.setFont("courier", "normal")
            doc.text(`Certificado N° ${sacramento.idSacramento.toString().padStart(6, "0")}`, pageWidth / 2, pageHeight - 20, { align: "center" })

            // Descargar el PDF
            const nombreArchivo = `Certificado_${sacramento.tipo.replace(/ /g, "_")}_${nombreFiel.replace(/ /g, "_")}.pdf`
            doc.save(nombreArchivo)

            toast({
                title: "Certificado descargado exitosamente",
                description: `El certificado de ${sacramento.tipo} para ${nombreFiel} ha sido descargado.`,
            })
        } catch (error) {
            console.error("Error al generar certificado:", error)
            toast({
                title: "Error al descargar certificado",
                description: "Ocurrió un error al generar el certificado. Por favor, intente nuevamente.",
                variant: "destructive",
            })
        }
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
                                                        disabled={!canEmitCertificate}
                                                        title={!canEmitCertificate ? "No tiene permisos para emitir certificados" : ""}
                                                    >
                                                        <FileText className="mr-2 h-4 w-4" />
                                                        Emitir Certificado
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        className="flex-1"
                                                        variant="outline"
                                                        onClick={() => handleDownloadCertificate(sacramento, fielSeleccionado?.nombreCompleto || "")}
                                                        disabled={!canDownloadCertificate}
                                                        title={!canDownloadCertificate ? "No tiene permisos para descargar certificados" : ""}
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
