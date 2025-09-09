"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, FileText, Hash, BarChart3, Church, AlertCircle, CheckCircle } from "lucide-react"
import { Sidebar } from "../components/sidebar"
import { Header } from "../components/header"
import { UsersModule } from "../components/users-module"
import { CertificatesModule } from "../components/certificates-module"
import { SecurityModule } from "../components/security-module"
import { BlockchainModule } from "../components/blockchain-module"
import { StatisticsModule } from "../components/statistics-module"

export default function Dashboard() {
  const [activeModule, setActiveModule] = useState("dashboard")
  const [currentUser] = useState({
    name: "Padre Miguel Rodríguez",
    role: "Administrador",
    parish: "Basílica Menor Nuestra Señora de la Merced",
  })

  const dashboardStats = {
    totalCertificates: 2847,
    monthlyGrowth: 12.5,
    activeUsers: 8,
    blockchainRecords: 2847,
    pendingValidations: 3,
    recentActivity: 24,
  }

  const recentCertificates = [
    {
      id: "CERT-2024-001",
      type: "Bautismo",
      person: "María Elena Vásquez",
      date: "2024-01-15",
      status: "Validado",
      hash: "0x7f9a2b...",
    },
    {
      id: "CERT-2024-002",
      type: "Matrimonio",
      person: "Carlos Mendoza & Ana García",
      date: "2024-01-14",
      status: "Pendiente",
      hash: "0x8c3d4e...",
    },
    {
      id: "CERT-2024-003",
      type: "Confirmación",
      person: "José Luis Herrera",
      date: "2024-01-13",
      status: "Validado",
      hash: "0x9e5f6a...",
    },
  ]

  const renderModule = () => {
    switch (activeModule) {
      case "users":
        return <UsersModule />
      case "certificates":
        return <CertificatesModule />
      case "security":
        return <SecurityModule />
      case "blockchain":
        return <BlockchainModule />
      case "statistics":
        return <StatisticsModule />
      default:
        return (
          <div className="space-y-6">
            {/* Métricas principales */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Certificados</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardStats.totalCertificates.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">+{dashboardStats.monthlyGrowth}% desde el mes pasado</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Usuarios Activos</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardStats.activeUsers}</div>
                  <p className="text-xs text-muted-foreground">Personal autorizado conectado</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Registros Blockchain</CardTitle>
                  <Hash className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardStats.blockchainRecords.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">100% de certificados validados</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Validaciones Pendientes</CardTitle>
                  <AlertCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardStats.pendingValidations}</div>
                  <p className="text-xs text-muted-foreground">Requieren atención inmediata</p>
                </CardContent>
              </Card>
            </div>

            {/* Actividad reciente */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Certificados Recientes</CardTitle>
                  <CardDescription>Últimos certificados procesados en el sistema</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentCertificates.map((cert) => (
                      <div key={cert.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-1">
                          <p className="text-sm font-medium">{cert.person}</p>
                          <p className="text-xs text-muted-foreground">
                            {cert.type} • {cert.date} • {cert.id}
                          </p>
                          <p className="text-xs text-muted-foreground font-mono">Hash: {cert.hash}</p>
                        </div>
                        <Badge variant={cert.status === "Validado" ? "default" : "secondary"}>
                          {cert.status === "Validado" ? (
                            <CheckCircle className="w-3 h-3 mr-1" />
                          ) : (
                            <AlertCircle className="w-3 h-3 mr-1" />
                          )}
                          {cert.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Acciones Rápidas</CardTitle>
                  <CardDescription>Funciones más utilizadas del sistema</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    className="w-full justify-start bg-transparent"
                    variant="outline"
                    onClick={() => setActiveModule("certificates")}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Nuevo Certificado
                  </Button>
                  <Button
                    className="w-full justify-start bg-transparent"
                    variant="outline"
                    onClick={() => setActiveModule("blockchain")}
                  >
                    <Hash className="mr-2 h-4 w-4" />
                    Verificar Hash
                  </Button>
                  <Button
                    className="w-full justify-start bg-transparent"
                    variant="outline"
                    onClick={() => setActiveModule("statistics")}
                  >
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Ver Estadísticas
                  </Button>
                  <Button
                    className="w-full justify-start bg-transparent"
                    variant="outline"
                    onClick={() => setActiveModule("users")}
                  >
                    <Users className="mr-2 h-4 w-4" />
                    Gestionar Usuarios
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Estado del sistema */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Church className="h-5 w-5" />
                  Estado del Sistema - Basílica Menor Nuestra Señora de la Merced
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Base de Datos: Operativa</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Blockchain: Sincronizada</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Seguridad: Activa</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeModule={activeModule} setActiveModule={setActiveModule} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header currentUser={currentUser} />

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">{renderModule()}</main>
      </div>
    </div>
  )
}
