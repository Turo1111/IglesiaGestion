"use client"

import { useData } from "@/contexts/data-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    Users,
    FileText,
    Hash,
    Church,
    AlertCircle,
    CheckCircle,
    Shield,
    UserPlus,
    Calendar,
    TrendingUp,
} from "lucide-react"

interface DashboardOverviewProps {
    setActiveModule: (module: string) => void
}

export function DashboardOverview({ setActiveModule }: DashboardOverviewProps) {
    const { fieles, sacramentos, users, roles } = useData()

    // Calcular estadísticas desde el contexto global
    const totalSacramentos = sacramentos.length
    const totalFieles = fieles.length
    const usuariosActivos = users.filter((u) => u.activo).length
    const certificadosEmitidos = sacramentos.filter((s) => s.certificadoEmitido).length
    const certificadosPendientes = sacramentos.filter((s) => !s.certificadoEmitido).length

    // Calcular crecimiento (simulado por ahora, en producción vendría del backend)
    const monthlyGrowth = Math.round((certificadosEmitidos / totalSacramentos) * 100) || 0

    // Obtener sacramentos recientes (últimos 5)
    const sacramentosRecientes = [...sacramentos]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5)

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

    const getStatusBadge = (certificadoEmitido: boolean) => {
        if (certificadoEmitido) {
            return (
                <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Certificado Emitido
                </Badge>
            )
        }
        return (
            <Badge variant="secondary" className="bg-orange-100 text-orange-800 hover:bg-orange-200">
                <AlertCircle className="w-3 h-3 mr-1" />
                Pendiente de Emisión
            </Badge>
        )
    }

    return (
        <div className="space-y-4 sm:space-y-6">
            {/* Métricas principales */}
            <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-xs sm:text-sm font-medium">Total Fieles</CardTitle>
                        <Users className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-xl sm:text-2xl font-bold">{totalFieles}</div>
                        <p className="text-xs text-muted-foreground hidden sm:block">Registrados en el sistema</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-xs sm:text-sm font-medium">Sacramentos</CardTitle>
                        <FileText className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-xl sm:text-2xl font-bold">{totalSacramentos}</div>
                        <p className="text-xs text-muted-foreground hidden sm:block">
                            <TrendingUp className="inline h-3 w-3 mr-1" />
                            {certificadosEmitidos} emitidos
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-xs sm:text-sm font-medium">Blockchain</CardTitle>
                        <Hash className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-xl sm:text-2xl font-bold">{totalSacramentos}</div>
                        <p className="text-xs text-muted-foreground hidden sm:block">100% con hash</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-xs sm:text-sm font-medium">Pendientes</CardTitle>
                        <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4 text-orange-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-xl sm:text-2xl font-bold text-orange-600">{certificadosPendientes}</div>
                        <p className="text-xs text-muted-foreground hidden sm:block">Por emitir</p>
                    </CardContent>
                </Card>
            </div>

            {/* Estadísticas adicionales */}
            <div className="grid gap-3 sm:gap-4 grid-cols-2 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-xs sm:text-sm font-medium">Usuarios</CardTitle>
                        <UserPlus className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-xl sm:text-2xl font-bold">{users.length}</div>
                        <p className="text-xs text-muted-foreground">
                            {usuariosActivos} activos
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-xs sm:text-sm font-medium">Roles</CardTitle>
                        <Shield className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-xl sm:text-2xl font-bold">{roles.length}</div>
                        <p className="text-xs text-muted-foreground hidden sm:block">Configurados</p>
                    </CardContent>
                </Card>

                <Card className="col-span-2 md:col-span-1">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-xs sm:text-sm font-medium">Tasa Emisión</CardTitle>
                        <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-xl sm:text-2xl font-bold">{monthlyGrowth}%</div>
                        <p className="text-xs text-muted-foreground hidden sm:block">Emitidos del total</p>
                    </CardContent>
                </Card>
            </div>

            {/* Actividad reciente */}
            <div className="grid gap-3 sm:gap-4 grid-cols-1 lg:grid-cols-7">
                <Card className="lg:col-span-4">
                    <CardHeader>
                        <CardTitle className="text-base sm:text-lg">Sacramentos Recientes</CardTitle>
                        <CardDescription className="text-xs sm:text-sm">Últimos sacramentos registrados</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {sacramentosRecientes.length === 0 ? (
                            <div className="text-center text-gray-500 py-8">
                                <FileText className="h-12 w-12 mx-auto mb-4 opacity-30" />
                                <p>No hay sacramentos registrados aún</p>
                                <Button
                                    variant="outline"
                                    className="mt-4"
                                    onClick={() => setActiveModule("sacramentos")}
                                >
                                    <FileText className="mr-2 h-4 w-4" />
                                    Registrar Primer Sacramento
                                </Button>
                            </div>
                        ) : (
                            <div className="space-y-3 sm:space-y-4">
                                {sacramentosRecientes.map((sacramento) => {
                                    const fiel = fieles.find((f) => f.idFiel === sacramento.idFiel)
                                    return (
                                        <div
                                            key={sacramento.idSacramento}
                                            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 p-3 sm:p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                                        >
                                            <div className="space-y-1 flex-1 min-w-0">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-base sm:text-lg flex-shrink-0">{getSacramentoIcon(sacramento.tipo)}</span>
                                                    <p className="text-sm font-medium truncate">{fiel?.nombreCompleto || "Desconocido"}</p>
                                                </div>
                                                <p className="text-xs text-muted-foreground">
                                                    {sacramento.tipo} • {sacramento.fechaCelebracion}
                                                </p>
                                                <p className="text-xs text-muted-foreground font-mono truncate hidden sm:block">
                                                    Hash: {sacramento.hashblockchain.substring(0, 32)}...
                                                </p>
                                            </div>
                                            <div className="flex-shrink-0">{getStatusBadge(sacramento.certificadoEmitido)}</div>
                                        </div>
                                    )
                                })}
                                {sacramentos.length > 5 && (
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                        onClick={() => setActiveModule("sacramentos")}
                                    >
                                        Ver todos los sacramentos ({sacramentos.length})
                                    </Button>
                                )}
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card className="lg:col-span-3">
                    <CardHeader>
                        <CardTitle className="text-base sm:text-lg">Acciones Rápidas</CardTitle>
                        <CardDescription className="text-xs sm:text-sm">Funciones más utilizadas</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2 sm:space-y-3">
                        <Button
                            className="w-full justify-start"
                            variant="outline"
                            onClick={() => setActiveModule("fieles")}
                        >
                            <Users className="mr-2 h-4 w-4" />
                            Registrar Fiel
                        </Button>
                        <Button
                            className="w-full justify-start"
                            variant="outline"
                            onClick={() => setActiveModule("sacramentos")}
                        >
                            <FileText className="mr-2 h-4 w-4" />
                            Registrar Sacramento
                        </Button>
                        <Button
                            className="w-full justify-start"
                            variant="outline"
                            onClick={() => setActiveModule("emision-certificados")}
                        >
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Emitir Certificado
                        </Button>
                        <Button
                            className="w-full justify-start"
                            variant="outline"
                            onClick={() => setActiveModule("blockchain")}
                        >
                            <Hash className="mr-2 h-4 w-4" />
                            Verificar en Blockchain
                        </Button>
                        <Button
                            className="w-full justify-start"
                            variant="outline"
                            onClick={() => setActiveModule("roles")}
                        >
                            <Shield className="mr-2 h-4 w-4" />
                            Gestionar Roles
                        </Button>
                        <Button
                            className="w-full justify-start"
                            variant="outline"
                            onClick={() => setActiveModule("users")}
                        >
                            <UserPlus className="mr-2 h-4 w-4" />
                            Gestionar Usuarios
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* Estado del sistema */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                        <Church className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                        <span className="truncate">Estado del Sistema</span>
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm">Monitoreo en tiempo real</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                        <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                            <div>
                                <p className="text-sm font-medium text-green-900">Sistema de Datos</p>
                                <p className="text-xs text-green-700">Operativo</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                            <div>
                                <p className="text-sm font-medium text-green-900">Blockchain</p>
                                <p className="text-xs text-green-700">Sincronizada • {totalSacramentos} registros</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                            <div>
                                <p className="text-sm font-medium text-green-900">Autenticación</p>
                                <p className="text-xs text-green-700">Activa • {usuariosActivos} usuarios conectados</p>
                            </div>
                        </div>
                    </div>

                    {/* Resumen de datos */}
                    <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t">
                        <h3 className="text-xs sm:text-sm font-semibold mb-3 sm:mb-4 text-gray-700">Resumen del Sistema MVP</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 text-center">
                            <div className="p-2 sm:p-3 bg-blue-50 rounded-lg">
                                <p className="text-lg sm:text-2xl font-bold text-blue-900">{totalFieles}</p>
                                <p className="text-xs text-blue-700">Fieles</p>
                            </div>
                            <div className="p-2 sm:p-3 bg-purple-50 rounded-lg">
                                <p className="text-lg sm:text-2xl font-bold text-purple-900">{totalSacramentos}</p>
                                <p className="text-xs text-purple-700">Sacramentos</p>
                            </div>
                            <div className="p-2 sm:p-3 bg-green-50 rounded-lg">
                                <p className="text-lg sm:text-2xl font-bold text-green-900">{certificadosEmitidos}</p>
                                <p className="text-xs text-green-700">Certificados</p>
                            </div>
                            <div className="p-2 sm:p-3 bg-orange-50 rounded-lg">
                                <p className="text-lg sm:text-2xl font-bold text-orange-900">{users.length}</p>
                                <p className="text-xs text-orange-700">Usuarios</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
