"use client"

import { useState } from "react"
import { useData } from "@/contexts/data-context"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Hash,
  Search,
  CheckCircle,
  AlertCircle,
  Copy,
  QrCode,
  Shield,
  Link,
  Clock,
  Database,
  FileText,
  User,
} from "lucide-react"

export function BlockchainModule() {
  const { sacramentos, fieles } = useData()
  const { toast } = useToast()
  const [hashToVerify, setHashToVerify] = useState("")
  const [verificationResult, setVerificationResult] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("")

  // Simular estados de blockchain para cada sacramento
  const getBlockchainStatus = (sacramentoId: number) => {
    // Los primeros 3 están confirmados, el resto pendiente
    return sacramentoId <= 3 ? "Confirmado" : sacramentoId <= 6 ? "Confirmado" : "Pendiente"
  }

  const getConfirmations = (sacramentoId: number) => {
    // Confirmaciones aleatorias basadas en el ID
    return sacramentoId <= 3 ? 25 + sacramentoId * 5 : sacramentoId <= 6 ? 12 + sacramentoId * 2 : 3
  }

  const getBlockNumber = (sacramentoId: number) => {
    return 15847 + sacramentoId - 1
  }

  const handleVerifyHash = () => {
    // SIMULACIÓN DE ERROR: Hash específico que simula servicio blockchain no disponible
    if (hashToVerify.trim() === "0xe5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6") {
      setVerificationResult({
        found: false,
        serviceUnavailable: true,
        message: "Servicio de blockchain no disponible",
      })

      toast({
        title: "Servicio no disponible",
        description: "No se pudo conectar con el servicio de blockchain. Por favor, intente nuevamente.",
        variant: "destructive",
      })
      return
    }

    const sacramento = sacramentos.find((s) => s.hashblockchain === hashToVerify.trim())

    if (sacramento) {
      const fiel = fieles.find((f) => f.idFiel === sacramento.idFiel)
      const status = getBlockchainStatus(sacramento.idSacramento)

      setVerificationResult({
        found: true,
        sacramentoId: sacramento.idSacramento,
        hash: sacramento.hashblockchain,
        codigoQR: sacramento.codigoQR,
        tipo: sacramento.tipo,
        fechaCelebracion: sacramento.fechaCelebracion,
        fielNombre: fiel?.nombreCompleto || "Desconocido",
        fielDNI: fiel?.DNI || "N/A",
        blockNumber: getBlockNumber(sacramento.idSacramento),
        confirmations: getConfirmations(sacramento.idSacramento),
        status,
        certificadoEmitido: sacramento.certificadoEmitido,
        fechaEmision: sacramento.fechaEmision,
      })

      toast({
        title: "Hash verificado exitosamente",
        description: `Sacramento de ${sacramento.tipo} encontrado en la blockchain.`,
      })
    } else {
      setVerificationResult({
        found: false,
        message: "Hash no encontrado en la blockchain",
      })

      toast({
        title: "Hash no encontrado",
        description: "El hash ingresado no corresponde a ningún sacramento registrado.",
        variant: "destructive",
      })
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copiado al portapapeles",
      description: "El hash ha sido copiado.",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmado":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      case "Pendiente":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
      case "Fallido":
        return "bg-red-100 text-red-800 hover:bg-red-200"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
    }
  }

  const getTipoIcon = (tipo: string) => {
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

  // Filtrar sacramentos
  const filteredSacramentos = sacramentos.filter((sacramento) => {
    const fiel = fieles.find((f) => f.idFiel === sacramento.idFiel)
    const fielNombre = fiel?.nombreCompleto.toLowerCase() || ""
    const fielDNI = fiel?.DNI || ""

    return (
      sacramento.tipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sacramento.codigoQR.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sacramento.hashblockchain.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fielNombre.includes(searchTerm.toLowerCase()) ||
      fielDNI.includes(searchTerm)
    )
  })

  // Estadísticas
  const totalRecords = sacramentos.length
  const confirmed = sacramentos.filter((s) => getBlockchainStatus(s.idSacramento) === "Confirmado").length
  const pending = totalRecords - confirmed
  const latestBlock = totalRecords > 0 ? getBlockNumber(Math.max(...sacramentos.map((s) => s.idSacramento))) : 0

  const blockchainStats = {
    totalRecords,
    confirmed,
    pending,
    latestBlock,
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4">
        <div className="min-w-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 truncate">Módulo Blockchain</h1>
          <p className="text-sm sm:text-base text-gray-500 truncate">Verificación y validación de sacramentos</p>
        </div>
      </div>

      {/* Estadísticas blockchain */}
      <div className="grid gap-3 sm:gap-4 grid-cols-2 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Total</CardTitle>
            <Database className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">{blockchainStats.totalRecords}</div>
            <p className="text-xs text-muted-foreground hidden sm:block">En blockchain</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Confirmados</CardTitle>
            <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-green-600">{blockchainStats.confirmed}</div>
            <p className="text-xs text-muted-foreground hidden sm:block">+12 confirm.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Pendientes</CardTitle>
            <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-yellow-600">{blockchainStats.pending}</div>
            <p className="text-xs text-muted-foreground hidden sm:block">Esperando</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Último Bloque</CardTitle>
            <Link className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">{blockchainStats.latestBlock}</div>
            <p className="text-xs text-muted-foreground hidden sm:block">Más reciente</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs del módulo blockchain */}
      <Tabs defaultValue="verify" className="space-y-4">
        <TabsList>
          <TabsTrigger value="verify">Verificar Hash</TabsTrigger>
          <TabsTrigger value="records">Registros Blockchain</TabsTrigger>
          <TabsTrigger value="network">Estado de Red</TabsTrigger>
        </TabsList>

        <TabsContent value="verify">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Verificar Hash de Sacramento
                </CardTitle>
                <CardDescription>
                  Ingrese el hash blockchain del sacramento para verificar su autenticidad
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Hash Blockchain</label>
                  <Textarea
                    placeholder="0x7f9a2b8c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a"
                    value={hashToVerify}
                    onChange={(e) => setHashToVerify(e.target.value)}
                    className="font-mono text-xs"
                    rows={3}
                  />
                  <p className="text-xs text-gray-500">
                    El hash se encuentra en el certificado impreso o digital del sacramento
                  </p>
                </div>
                <Button onClick={handleVerifyHash} className="w-full" disabled={!hashToVerify.trim()}>
                  <Hash className="mr-2 h-4 w-4" />
                  Verificar Hash
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Resultado de Verificación
                </CardTitle>
              </CardHeader>
              <CardContent>
                {verificationResult ? (
                  <div className="space-y-4">
                    {verificationResult.found ? (
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-green-600 pb-3 border-b">
                          <CheckCircle className="h-6 w-6" />
                          <span className="font-bold text-lg">Sacramento Válido y Autenticado</span>
                        </div>

                        <div className="space-y-3 text-sm">
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <div className="font-semibold text-gray-700 mb-2">Información del Sacramento</div>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Tipo:</span>
                                <div className="flex items-center gap-2">
                                  <span>{getTipoIcon(verificationResult.tipo)}</span>
                                  <span className="font-medium">{verificationResult.tipo}</span>
                                </div>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Fecha Celebración:</span>
                                <span className="font-medium">{verificationResult.fechaCelebracion}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Código QR:</span>
                                <code className="text-xs bg-white px-2 py-1 rounded border">
                                  {verificationResult.codigoQR}
                                </code>
                              </div>
                            </div>
                          </div>

                          <div className="bg-blue-50 p-3 rounded-lg">
                            <div className="font-semibold text-blue-900 mb-2">Datos del Fiel</div>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-blue-700">Nombre:</span>
                                <span className="font-medium text-blue-900">{verificationResult.fielNombre}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-blue-700">DNI:</span>
                                <span className="font-medium text-blue-900">{verificationResult.fielDNI}</span>
                              </div>
                            </div>
                          </div>

                          <div className="bg-green-50 p-3 rounded-lg">
                            <div className="font-semibold text-green-900 mb-2">Blockchain</div>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-green-700">Bloque:</span>
                                <span className="font-mono text-green-900">{verificationResult.blockNumber}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-green-700">Confirmaciones:</span>
                                <span className="font-bold text-green-900">{verificationResult.confirmations}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-green-700">Estado:</span>
                                <Badge className={getStatusColor(verificationResult.status)}>
                                  {verificationResult.status}
                                </Badge>
                              </div>
                            </div>
                          </div>

                          <div className="bg-purple-50 p-3 rounded-lg">
                            <div className="font-semibold text-purple-900 mb-2">Certificado</div>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-purple-700">Estado:</span>
                                <Badge
                                  variant={verificationResult.certificadoEmitido ? "default" : "secondary"}
                                  className={
                                    verificationResult.certificadoEmitido
                                      ? "bg-green-100 text-green-800"
                                      : "bg-orange-100 text-orange-800"
                                  }
                                >
                                  {verificationResult.certificadoEmitido ? "Emitido" : "No Emitido"}
                                </Badge>
                              </div>
                              {verificationResult.certificadoEmitido && verificationResult.fechaEmision && (
                                <div className="flex justify-between">
                                  <span className="text-purple-700">Fecha Emisión:</span>
                                  <span className="font-medium text-purple-900">
                                    {verificationResult.fechaEmision}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className={`flex items-center gap-2 ${verificationResult.serviceUnavailable ? 'text-orange-600' : 'text-red-600'}`}>
                          <AlertCircle className="h-6 w-6" />
                          <span className="font-bold text-lg">{verificationResult.message}</span>
                        </div>
                        {verificationResult.serviceUnavailable ? (
                          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                            <p className="text-sm text-orange-800 font-semibold mb-2">
                              No se pudo establecer conexión con el servicio de blockchain.
                            </p>
                            <p className="text-sm text-orange-700">
                              El servicio puede estar temporalmente no disponible. Por favor:
                            </p>
                            <ul className="list-disc list-inside text-sm text-orange-700 mt-2 space-y-1">
                              <li>Verifique su conexión a internet</li>
                              <li>Intente nuevamente en unos momentos</li>
                              <li>Si el problema persiste, contacte al administrador del sistema</li>
                            </ul>
                            <div className="mt-4">
                              <Button 
                                variant="outline" 
                                onClick={handleVerifyHash}
                                className="w-full border-orange-300 text-orange-700 hover:bg-orange-100"
                              >
                                Reintentar Verificación
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                            <p className="text-sm text-red-800">
                              El hash ingresado no se encuentra registrado en la blockchain. Verifique que:
                            </p>
                            <ul className="list-disc list-inside text-sm text-red-700 mt-2 space-y-1">
                              <li>El hash esté completo y sin espacios</li>
                              <li>El hash pertenezca a un sacramento de esta parroquia</li>
                              <li>El sacramento haya sido registrado en el sistema</li>
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center text-gray-500 py-12">
                    <Hash className="h-16 w-16 mx-auto mb-4 opacity-30" />
                    <p className="text-lg font-medium">Ingrese un hash para verificar</p>
                    <p className="text-sm mt-2">
                      El resultado de la verificación aparecerá aquí
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="records">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <Database className="h-4 w-4 sm:h-5 sm:w-5" />
                Registros en Blockchain
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Historial completo de sacramentos en blockchain
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
                      <Table className="min-w-[800px]">
                        <TableHeader>
                          <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Tipo</TableHead>
                            <TableHead>Fiel</TableHead>
                            <TableHead>Código QR</TableHead>
                            <TableHead>Hash Blockchain</TableHead>
                            <TableHead>Bloque</TableHead>
                            <TableHead className="text-center">Estado</TableHead>
                            <TableHead className="text-center">Confirm.</TableHead>
                            <TableHead>Acciones</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredSacramentos.length === 0 ? (
                            <TableRow>
                              <TableCell colSpan={9} className="text-center text-gray-500 py-8">
                                {sacramentos.length === 0
                                  ? "No hay sacramentos registrados en blockchain"
                                  : "No se encontraron resultados"}
                              </TableCell>
                            </TableRow>
                          ) : (
                            filteredSacramentos.map((sacramento) => {
                              const fiel = fieles.find((f) => f.idFiel === sacramento.idFiel)
                              const status = getBlockchainStatus(sacramento.idSacramento)
                              const confirmations = getConfirmations(sacramento.idSacramento)
                              const blockNumber = getBlockNumber(sacramento.idSacramento)

                              return (
                                <TableRow key={sacramento.idSacramento}>
                                  <TableCell className="font-medium">{sacramento.idSacramento}</TableCell>
                                  <TableCell>
                                    <div className="flex items-center gap-2">
                                      <span>{getTipoIcon(sacramento.tipo)}</span>
                                      <span>{sacramento.tipo}</span>
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <div>
                                      <div className="font-medium">{fiel?.nombreCompleto || "Desconocido"}</div>
                                      <div className="text-xs text-gray-500">DNI: {fiel?.DNI || "N/A"}</div>
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                                      {sacramento.codigoQR}
                                    </code>
                                  </TableCell>
                                  <TableCell className="font-mono text-xs max-w-xs">
                                    <div className="flex items-center gap-2">
                                      <span className="truncate">{sacramento.hashblockchain}</span>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => copyToClipboard(sacramento.hashblockchain)}
                                        className="h-6 w-6 p-0"
                                      >
                                        <Copy className="h-3 w-3" />
                                      </Button>
                                    </div>
                                  </TableCell>
                                  <TableCell className="font-mono">{blockNumber}</TableCell>
                                  <TableCell className="text-center">
                                    <Badge className={getStatusColor(status)}>{status}</Badge>
                                  </TableCell>
                                  <TableCell className="text-center">
                                    <Badge variant="outline">{confirmations}</Badge>
                                  </TableCell>
                                  <TableCell>
                                    <div className="flex items-center gap-2">
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => {
                                          setHashToVerify(sacramento.hashblockchain)
                                          handleVerifyHash()
                                        }}
                                        title="Verificar en blockchain"
                                      >
                                        <Shield className="h-4 w-4" />
                                      </Button>
                                    </div>
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
        </TabsContent>

        <TabsContent value="network">
          <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Link className="h-5 w-5" />
                  Estado de la Red Blockchain
                </CardTitle>
                <CardDescription>Información en tiempo real de la red blockchain privada</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-gray-700">Estado de Conexión</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-green-600 font-medium">Conectado</span>
                  </div>
                </div>

                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-gray-700">Último Bloque</span>
                  <span className="font-mono font-bold">{blockchainStats.latestBlock}</span>
                </div>

                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-gray-700">Sacramentos Registrados</span>
                  <span className="font-bold">{blockchainStats.totalRecords}</span>
                </div>

                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-gray-700">Tiempo de Bloque</span>
                  <span className="font-medium">~15 segundos</span>
                </div>

                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-gray-700">Gas Price</span>
                  <span className="font-medium">20 Gwei</span>
                </div>

                <div className="flex items-center justify-between py-2">
                  <span className="text-gray-700">Nodos Activos</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="font-medium">3/3</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Configuración de Red</CardTitle>
                <CardDescription>Parámetros de la red blockchain privada</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Red Blockchain</label>
                  <Input value="Basilica Private Network" readOnly className="bg-gray-50" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Chain ID</label>
                  <Input value="1337" readOnly className="font-mono bg-gray-50" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">RPC Endpoint</label>
                  <Input
                    value="https://blockchain.basilica.org:8545"
                    readOnly
                    className="font-mono text-sm bg-gray-50"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Contract Address</label>
                  <div className="flex items-center gap-2">
                    <Input
                      value="0x742d35Cc6634C0532925a3b8D4C9db..."
                      readOnly
                      className="font-mono text-sm bg-gray-50"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard("0x742d35Cc6634C0532925a3b8D4C9db...")}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                  <p className="text-sm text-blue-900">
                    <strong>Nota:</strong> Esta es una red blockchain privada dedicada exclusivamente para la
                    Basílica Menor Nuestra Señora de la Merced.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
