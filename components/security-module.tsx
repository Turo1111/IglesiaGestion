"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, Eye, AlertTriangle, CheckCircle, User, Monitor, Key, Activity } from "lucide-react"

export function SecurityModule() {
  const [auditLogs] = useState([
    {
      id: 1,
      timestamp: "2024-01-15 09:30:15",
      user: "Padre Miguel Rodríguez",
      action: "Creación de certificado",
      resource: "CERT-2024-001",
      ip: "192.168.1.100",
      status: "Exitoso",
      details: "Certificado de bautismo creado para María Elena Vásquez",
    },
    {
      id: 2,
      timestamp: "2024-01-15 09:25:42",
      user: "Hermana Carmen López",
      action: "Consulta de certificado",
      resource: "CERT-2023-456",
      ip: "192.168.1.101",
      status: "Exitoso",
      details: "Búsqueda de certificado de matrimonio",
    },
    {
      id: 3,
      timestamp: "2024-01-15 09:20:18",
      user: "Usuario Desconocido",
      action: "Intento de acceso",
      resource: "Sistema",
      ip: "203.45.67.89",
      status: "Fallido",
      details: "Intento de acceso con credenciales incorrectas",
    },
    {
      id: 4,
      timestamp: "2024-01-15 08:45:33",
      user: "Diácono José Martínez",
      action: "Validación blockchain",
      resource: "CERT-2024-002",
      ip: "192.168.1.102",
      status: "Exitoso",
      details: "Hash validado en blockchain",
    },
    {
      id: 5,
      timestamp: "2024-01-15 08:30:07",
      user: "Padre Antonio Silva",
      action: "Modificación de usuario",
      resource: "USER-005",
      ip: "192.168.1.103",
      status: "Exitoso",
      details: "Actualización de permisos de usuario",
    },
  ])

  const [activeSessions] = useState([
    {
      id: 1,
      user: "Padre Miguel Rodríguez",
      ip: "192.168.1.100",
      device: "Windows 10 - Chrome",
      loginTime: "2024-01-15 07:00:00",
      lastActivity: "2024-01-15 09:30:15",
      location: "Oficina Principal",
    },
    {
      id: 2,
      user: "Hermana Carmen López",
      ip: "192.168.1.101",
      device: "Windows 11 - Firefox",
      loginTime: "2024-01-15 08:45:00",
      lastActivity: "2024-01-15 09:25:42",
      location: "Secretaría",
    },
    {
      id: 3,
      user: "Diácono José Martínez",
      ip: "192.168.1.102",
      device: "MacOS - Safari",
      loginTime: "2024-01-15 08:30:00",
      lastActivity: "2024-01-15 08:45:33",
      location: "Oficina Auxiliar",
    },
  ])

  const [securityAlerts] = useState([
    {
      id: 1,
      type: "Acceso Fallido",
      severity: "Alto",
      timestamp: "2024-01-15 09:20:18",
      description: "Múltiples intentos de acceso fallidos desde IP externa",
      ip: "203.45.67.89",
      status: "Activa",
    },
    {
      id: 2,
      type: "Sesión Inusual",
      severity: "Medio",
      timestamp: "2024-01-15 02:15:30",
      description: "Acceso fuera del horario habitual",
      ip: "192.168.1.105",
      status: "Revisada",
    },
    {
      id: 3,
      type: "Cambio de Permisos",
      severity: "Bajo",
      timestamp: "2024-01-14 16:45:22",
      description: "Modificación de permisos de usuario",
      ip: "192.168.1.100",
      status: "Resuelta",
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Exitoso":
        return "bg-green-100 text-green-800"
      case "Fallido":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Alto":
        return "bg-red-100 text-red-800"
      case "Medio":
        return "bg-yellow-100 text-yellow-800"
      case "Bajo":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getAlertStatusColor = (status: string) => {
    switch (status) {
      case "Activa":
        return "bg-red-100 text-red-800"
      case "Revisada":
        return "bg-yellow-100 text-yellow-800"
      case "Resuelta":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const securityStats = {
    totalLogs: auditLogs.length,
    successfulActions: auditLogs.filter((log) => log.status === "Exitoso").length,
    failedAttempts: auditLogs.filter((log) => log.status === "Fallido").length,
    activeSessions: activeSessions.length,
    activeAlerts: securityAlerts.filter((alert) => alert.status === "Activa").length,
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Módulo de Seguridad</h1>
          <p className="text-gray-600">Control de acceso, auditoría y monitoreo del sistema</p>
        </div>
      </div>

      {/* Estadísticas de seguridad */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Registros de Auditoría</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{securityStats.totalLogs}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Acciones Exitosas</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{securityStats.successfulActions}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Intentos Fallidos</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{securityStats.failedAttempts}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sesiones Activas</CardTitle>
            <Monitor className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{securityStats.activeSessions}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alertas Activas</CardTitle>
            <Shield className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{securityStats.activeAlerts}</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs de seguridad */}
      <Tabs defaultValue="audit" className="space-y-4">
        <TabsList>
          <TabsTrigger value="audit">Auditoría</TabsTrigger>
          <TabsTrigger value="sessions">Sesiones Activas</TabsTrigger>
          <TabsTrigger value="alerts">Alertas de Seguridad</TabsTrigger>
          <TabsTrigger value="permissions">Permisos</TabsTrigger>
        </TabsList>

        <TabsContent value="audit">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Registro de Auditoría
              </CardTitle>
              <CardDescription>Historial completo de todas las acciones realizadas en el sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fecha/Hora</TableHead>
                    <TableHead>Usuario</TableHead>
                    <TableHead>Acción</TableHead>
                    <TableHead>Recurso</TableHead>
                    <TableHead>IP</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Detalles</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {auditLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-mono text-sm">{log.timestamp}</TableCell>
                      <TableCell>{log.user}</TableCell>
                      <TableCell>{log.action}</TableCell>
                      <TableCell className="font-mono text-sm">{log.resource}</TableCell>
                      <TableCell className="font-mono text-sm">{log.ip}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(log.status)}>{log.status}</Badge>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">{log.details}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sessions">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Monitor className="h-5 w-5" />
                Sesiones Activas
              </CardTitle>
              <CardDescription>Usuarios actualmente conectados al sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Usuario</TableHead>
                    <TableHead>IP</TableHead>
                    <TableHead>Dispositivo</TableHead>
                    <TableHead>Inicio de Sesión</TableHead>
                    <TableHead>Última Actividad</TableHead>
                    <TableHead>Ubicación</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activeSessions.map((session) => (
                    <TableRow key={session.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          {session.user}
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-sm">{session.ip}</TableCell>
                      <TableCell>{session.device}</TableCell>
                      <TableCell className="font-mono text-sm">{session.loginTime}</TableCell>
                      <TableCell className="font-mono text-sm">{session.lastActivity}</TableCell>
                      <TableCell>{session.location}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" className="text-red-600">
                          Terminar Sesión
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Alertas de Seguridad
              </CardTitle>
              <CardDescription>Eventos de seguridad que requieren atención</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Severidad</TableHead>
                    <TableHead>Fecha/Hora</TableHead>
                    <TableHead>Descripción</TableHead>
                    <TableHead>IP</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {securityAlerts.map((alert) => (
                    <TableRow key={alert.id}>
                      <TableCell>{alert.type}</TableCell>
                      <TableCell>
                        <Badge className={getSeverityColor(alert.severity)}>{alert.severity}</Badge>
                      </TableCell>
                      <TableCell className="font-mono text-sm">{alert.timestamp}</TableCell>
                      <TableCell className="max-w-xs">{alert.description}</TableCell>
                      <TableCell className="font-mono text-sm">{alert.ip}</TableCell>
                      <TableCell>
                        <Badge className={getAlertStatusColor(alert.status)}>{alert.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            Resolver
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="permissions">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                Gestión de Permisos
              </CardTitle>
              <CardDescription>Control de acceso por roles y funcionalidades</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Roles del Sistema</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between p-3 border rounded">
                        <div>
                          <div className="font-medium">Administrador</div>
                          <div className="text-sm text-gray-500">Acceso completo al sistema</div>
                        </div>
                        <Badge className="bg-red-100 text-red-800">Nivel 4</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded">
                        <div>
                          <div className="font-medium">Sacerdote</div>
                          <div className="text-sm text-gray-500">Gestión de certificados y usuarios</div>
                        </div>
                        <Badge className="bg-purple-100 text-purple-800">Nivel 3</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded">
                        <div>
                          <div className="font-medium">Secretaria</div>
                          <div className="text-sm text-gray-500">Gestión de certificados</div>
                        </div>
                        <Badge className="bg-blue-100 text-blue-800">Nivel 2</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded">
                        <div>
                          <div className="font-medium">Asistente</div>
                          <div className="text-sm text-gray-500">Solo consulta de certificados</div>
                        </div>
                        <Badge className="bg-green-100 text-green-800">Nivel 1</Badge>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Matriz de Permisos</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="grid grid-cols-5 gap-2 text-sm font-medium">
                          <div>Módulo</div>
                          <div className="text-center">Admin</div>
                          <div className="text-center">Sacerdote</div>
                          <div className="text-center">Secretaria</div>
                          <div className="text-center">Asistente</div>
                        </div>
                        <div className="grid grid-cols-5 gap-2 text-sm">
                          <div>Usuarios</div>
                          <div className="text-center">
                            <CheckCircle className="h-4 w-4 text-green-500 mx-auto" />
                          </div>
                          <div className="text-center">
                            <CheckCircle className="h-4 w-4 text-green-500 mx-auto" />
                          </div>
                          <div className="text-center">-</div>
                          <div className="text-center">-</div>
                        </div>
                        <div className="grid grid-cols-5 gap-2 text-sm">
                          <div>Certificados</div>
                          <div className="text-center">
                            <CheckCircle className="h-4 w-4 text-green-500 mx-auto" />
                          </div>
                          <div className="text-center">
                            <CheckCircle className="h-4 w-4 text-green-500 mx-auto" />
                          </div>
                          <div className="text-center">
                            <CheckCircle className="h-4 w-4 text-green-500 mx-auto" />
                          </div>
                          <div className="text-center">
                            <Eye className="h-4 w-4 text-blue-500 mx-auto" />
                          </div>
                        </div>
                        <div className="grid grid-cols-5 gap-2 text-sm">
                          <div>Blockchain</div>
                          <div className="text-center">
                            <CheckCircle className="h-4 w-4 text-green-500 mx-auto" />
                          </div>
                          <div className="text-center">
                            <CheckCircle className="h-4 w-4 text-green-500 mx-auto" />
                          </div>
                          <div className="text-center">
                            <Eye className="h-4 w-4 text-blue-500 mx-auto" />
                          </div>
                          <div className="text-center">-</div>
                        </div>
                        <div className="grid grid-cols-5 gap-2 text-sm">
                          <div>Seguridad</div>
                          <div className="text-center">
                            <CheckCircle className="h-4 w-4 text-green-500 mx-auto" />
                          </div>
                          <div className="text-center">-</div>
                          <div className="text-center">-</div>
                          <div className="text-center">-</div>
                        </div>
                        <div className="grid grid-cols-5 gap-2 text-sm">
                          <div>Estadísticas</div>
                          <div className="text-center">
                            <CheckCircle className="h-4 w-4 text-green-500 mx-auto" />
                          </div>
                          <div className="text-center">
                            <CheckCircle className="h-4 w-4 text-green-500 mx-auto" />
                          </div>
                          <div className="text-center">
                            <Eye className="h-4 w-4 text-blue-500 mx-auto" />
                          </div>
                          <div className="text-center">-</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
