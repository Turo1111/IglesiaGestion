"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, TrendingUp, Download, Users, FileText, DollarSign, PieChart, Activity } from "lucide-react"

export function StatisticsModule() {
  const monthlyStats = [
    { month: "Enero", certificates: 245, baptisms: 89, marriages: 23, confirmations: 67, communions: 45, deaths: 21 },
    { month: "Febrero", certificates: 198, baptisms: 72, marriages: 18, confirmations: 54, communions: 38, deaths: 16 },
    { month: "Marzo", certificates: 267, baptisms: 95, marriages: 28, confirmations: 71, communions: 52, deaths: 21 },
    { month: "Abril", certificates: 223, baptisms: 81, marriages: 25, confirmations: 63, communions: 41, deaths: 13 },
    { month: "Mayo", certificates: 289, baptisms: 103, marriages: 32, confirmations: 78, communions: 58, deaths: 18 },
    { month: "Junio", certificates: 312, baptisms: 112, marriages: 38, confirmations: 85, communions: 62, deaths: 15 },
  ]

  const userActivityStats = [
    { user: "Padre Miguel Rodríguez", certificates: 156, logins: 89, lastActive: "2024-01-15" },
    { user: "Hermana Carmen López", certificates: 134, logins: 76, lastActive: "2024-01-15" },
    { user: "Padre Antonio Silva", certificates: 98, logins: 54, lastActive: "2024-01-15" },
    { user: "Diácono José Martínez", certificates: 67, logins: 43, lastActive: "2024-01-14" },
    { user: "María Elena Vásquez", certificates: 23, logins: 12, lastActive: "2024-01-10" },
  ]

  const donationStats = {
    total: 45780,
    thisMonth: 8950,
    lastMonth: 7650,
    growth: 17.0,
    categories: [
      { name: "Misas", amount: 18500, percentage: 40.4 },
      { name: "Certificados", amount: 12300, percentage: 26.9 },
      { name: "Eventos", amount: 8900, percentage: 19.4 },
      { name: "Donaciones", amount: 6080, percentage: 13.3 },
    ],
  }

  const totalStats = {
    totalCertificates: 2847,
    totalUsers: 8,
    totalDonations: donationStats.total,
    avgCertificatesPerMonth: 237,
    mostActivePriest: "Padre Miguel Rodríguez",
    mostCommonSacrament: "Bautismo",
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Estadísticas e Informes</h1>
          <p className="text-gray-600">Análisis y métricas del sistema de gestión</p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar PDF
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar Excel
          </Button>
        </div>
      </div>

      {/* Resumen general */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Certificados</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStats.totalCertificates.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+12.5% desde el mes pasado</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Promedio Mensual</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStats.avgCertificatesPerMonth}</div>
            <p className="text-xs text-muted-foreground">Certificados por mes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ingresos Totales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalStats.totalDonations.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+{donationStats.growth}% este mes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuarios Activos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">Personal autorizado</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs de estadísticas */}
      <Tabs defaultValue="certificates" className="space-y-4">
        <TabsList>
          <TabsTrigger value="certificates">Certificados</TabsTrigger>
          <TabsTrigger value="users">Actividad de Usuarios</TabsTrigger>
          <TabsTrigger value="donations">Ingresos</TabsTrigger>
          <TabsTrigger value="trends">Tendencias</TabsTrigger>
        </TabsList>

        <TabsContent value="certificates">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Certificados por Mes
                </CardTitle>
                <CardDescription>Evolución mensual de certificados emitidos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyStats.map((stat, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 text-sm font-medium">{stat.month}</div>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${(stat.certificates / 350) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="text-sm font-medium w-12 text-right">{stat.certificates}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Distribución por Sacramento
                </CardTitle>
                <CardDescription>Tipos de certificados más comunes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">Bautismos</span>
                    </div>
                    <div className="text-sm font-medium">38.2%</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Confirmaciones</span>
                    </div>
                    <div className="text-sm font-medium">28.7%</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span className="text-sm">Primeras Comuniones</span>
                    </div>
                    <div className="text-sm font-medium">21.3%</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
                      <span className="text-sm">Matrimonios</span>
                    </div>
                    <div className="text-sm font-medium">8.9%</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                      <span className="text-sm">Defunciones</span>
                    </div>
                    <div className="text-sm font-medium">2.9%</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Actividad del Personal
              </CardTitle>
              <CardDescription>Métricas de uso y productividad por usuario</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userActivityStats.map((user, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium">{user.user}</div>
                        <div className="text-sm text-gray-500">Último acceso: {user.lastActive}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 text-sm">
                      <div className="text-center">
                        <div className="font-bold text-lg">{user.certificates}</div>
                        <div className="text-gray-500">Certificados</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-lg">{user.logins}</div>
                        <div className="text-gray-500">Accesos</div>
                      </div>
                      <Badge variant="outline">
                        {user.certificates > 100 ? "Alto" : user.certificates > 50 ? "Medio" : "Bajo"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="donations">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Resumen de Ingresos
                </CardTitle>
                <CardDescription>Análisis financiero mensual</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div>
                    <div className="text-sm text-gray-600">Total Acumulado</div>
                    <div className="text-2xl font-bold text-green-600">${donationStats.total.toLocaleString()}</div>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 border rounded-lg">
                    <div className="text-sm text-gray-600">Este Mes</div>
                    <div className="text-xl font-bold">${donationStats.thisMonth.toLocaleString()}</div>
                  </div>
                  <div className="text-center p-3 border rounded-lg">
                    <div className="text-sm text-gray-600">Mes Anterior</div>
                    <div className="text-xl font-bold">${donationStats.lastMonth.toLocaleString()}</div>
                  </div>
                </div>

                <div className="flex items-center justify-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-center">
                    <div className="text-sm text-gray-600">Crecimiento</div>
                    <div className="text-xl font-bold text-blue-600">+{donationStats.growth}%</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ingresos por Categoría</CardTitle>
                <CardDescription>Distribución de ingresos por tipo de servicio</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {donationStats.categories.map((category, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{category.name}</span>
                        <span className="text-sm text-gray-500">{category.percentage}%</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${category.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">${category.amount.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Análisis de Tendencias
                </CardTitle>
                <CardDescription>Patrones y proyecciones basadas en datos históricos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Tendencias Positivas</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                        <TrendingUp className="h-5 w-5 text-green-600" />
                        <div>
                          <div className="font-medium">Bautismos</div>
                          <div className="text-sm text-gray-600">+15% en los últimos 3 meses</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                        <TrendingUp className="h-5 w-5 text-green-600" />
                        <div>
                          <div className="font-medium">Confirmaciones</div>
                          <div className="text-sm text-gray-600">+8% comparado al año anterior</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                        <TrendingUp className="h-5 w-5 text-green-600" />
                        <div>
                          <div className="font-medium">Uso del Sistema</div>
                          <div className="text-sm text-gray-600">+25% en eficiencia operativa</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold">Proyecciones</h3>
                    <div className="space-y-3">
                      <div className="p-3 border rounded-lg">
                        <div className="font-medium">Próximo Mes</div>
                        <div className="text-sm text-gray-600">Se esperan ~280 certificados</div>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <div className="font-medium">Fin de Año</div>
                        <div className="text-sm text-gray-600">Proyección: 3,200 certificados totales</div>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <div className="font-medium">Ingresos Anuales</div>
                        <div className="text-sm text-gray-600">Estimado: $52,000</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
