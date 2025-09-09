"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Hash, Search, CheckCircle, AlertCircle, Copy, QrCode, Shield, Link, Clock, Database } from "lucide-react"

export function BlockchainModule() {
  const [hashToVerify, setHashToVerify] = useState("")
  const [verificationResult, setVerificationResult] = useState<any>(null)

  const [blockchainRecords] = useState([
    {
      id: 1,
      certificateId: "CERT-2024-001",
      hash: "0x7f9a2b8c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a",
      blockNumber: 15847,
      timestamp: "2024-01-15 09:30:15",
      transactionId: "0xabc123def456789...",
      status: "Confirmado",
      confirmations: 12,
      gasUsed: "21000",
      personName: "María Elena Vásquez",
      certificateType: "Bautismo",
    },
    {
      id: 2,
      certificateId: "CERT-2024-002",
      hash: "0x8c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d",
      blockNumber: 15848,
      timestamp: "2024-01-14 16:45:22",
      transactionId: "0xdef456abc789123...",
      status: "Pendiente",
      confirmations: 3,
      gasUsed: "21000",
      personName: "Carlos Mendoza & Ana García",
      certificateType: "Matrimonio",
    },
    {
      id: 3,
      certificateId: "CERT-2024-003",
      hash: "0x9e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f",
      blockNumber: 15849,
      timestamp: "2024-01-13 14:20:08",
      transactionId: "0x789abc123def456...",
      status: "Confirmado",
      confirmations: 25,
      gasUsed: "21000",
      personName: "José Luis Herrera",
      certificateType: "Confirmación",
    },
    {
      id: 4,
      certificateId: "CERT-2024-004",
      hash: "0xa1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2",
      blockNumber: 15850,
      timestamp: "2024-01-12 11:15:30",
      transactionId: "0x123def456abc789...",
      status: "Confirmado",
      confirmations: 18,
      gasUsed: "21000",
      personName: "Sofía Ramírez Castillo",
      certificateType: "Primera Comunión",
    },
    {
      id: 5,
      certificateId: "CERT-2024-005",
      hash: "0xb2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3",
      blockNumber: 15851,
      timestamp: "2024-01-11 09:30:45",
      transactionId: "0x456abc789def123...",
      status: "Confirmado",
      confirmations: 31,
      gasUsed: "21000",
      personName: "Don Aurelio Mendoza Vega",
      certificateType: "Defunción",
    },
  ])

  const handleVerifyHash = () => {
    const record = blockchainRecords.find((r) => r.hash === hashToVerify)
    if (record) {
      setVerificationResult({
        found: true,
        ...record,
      })
    } else {
      setVerificationResult({
        found: false,
        message: "Hash no encontrado en la blockchain",
      })
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmado":
        return "bg-green-100 text-green-800"
      case "Pendiente":
        return "bg-yellow-100 text-yellow-800"
      case "Fallido":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const blockchainStats = {
    totalRecords: blockchainRecords.length,
    confirmed: blockchainRecords.filter((r) => r.status === "Confirmado").length,
    pending: blockchainRecords.filter((r) => r.status === "Pendiente").length,
    latestBlock: Math.max(...blockchainRecords.map((r) => r.blockNumber)),
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Módulo Blockchain</h1>
          <p className="text-gray-600">Verificación y validación de certificados mediante blockchain</p>
        </div>
      </div>

      {/* Estadísticas blockchain */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Registros Totales</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{blockchainStats.totalRecords}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Confirmados</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{blockchainStats.confirmed}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{blockchainStats.pending}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Último Bloque</CardTitle>
            <Link className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{blockchainStats.latestBlock}</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs del módulo blockchain */}
      <Tabs defaultValue="verify" className="space-y-4">
        <TabsList>
          <TabsTrigger value="verify">Verificar Hash</TabsTrigger>
          <TabsTrigger value="records">Registros Blockchain</TabsTrigger>
          <TabsTrigger value="generate">Generar QR</TabsTrigger>
          <TabsTrigger value="network">Estado de Red</TabsTrigger>
        </TabsList>

        <TabsContent value="verify">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Verificar Hash de Certificado
                </CardTitle>
                <CardDescription>
                  Ingrese el hash del certificado para verificar su autenticidad en la blockchain
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Hash del Certificado</label>
                  <Textarea
                    placeholder="0x7f9a2b8c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a"
                    value={hashToVerify}
                    onChange={(e) => setHashToVerify(e.target.value)}
                    className="font-mono text-sm"
                  />
                </div>
                <Button onClick={handleVerifyHash} className="w-full">
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
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-green-600">
                          <CheckCircle className="h-5 w-5" />
                          <span className="font-medium">Certificado Válido</span>
                        </div>

                        <div className="space-y-2 text-sm">
                          <div className="grid grid-cols-2 gap-2">
                            <span className="font-medium">ID Certificado:</span>
                            <span className="font-mono">{verificationResult.certificateId}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <span className="font-medium">Persona:</span>
                            <span>{verificationResult.personName}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <span className="font-medium">Tipo:</span>
                            <span>{verificationResult.certificateType}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <span className="font-medium">Bloque:</span>
                            <span className="font-mono">{verificationResult.blockNumber}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <span className="font-medium">Confirmaciones:</span>
                            <span>{verificationResult.confirmations}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <span className="font-medium">Estado:</span>
                            <Badge className={getStatusColor(verificationResult.status)}>
                              {verificationResult.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-red-600">
                        <AlertCircle className="h-5 w-5" />
                        <span className="font-medium">{verificationResult.message}</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    <Hash className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Ingrese un hash para verificar</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="records">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Registros en Blockchain
              </CardTitle>
              <CardDescription>Historial completo de certificados registrados en la blockchain</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Certificado</TableHead>
                    <TableHead>Persona</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Hash</TableHead>
                    <TableHead>Bloque</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Confirmaciones</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {blockchainRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-mono text-sm">{record.certificateId}</TableCell>
                      <TableCell>{record.personName}</TableCell>
                      <TableCell>{record.certificateType}</TableCell>
                      <TableCell className="font-mono text-xs max-w-xs">
                        <div className="flex items-center gap-2">
                          <span className="truncate">{record.hash}</span>
                          <Button variant="ghost" size="sm" onClick={() => copyToClipboard(record.hash)}>
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono">{record.blockNumber}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(record.status)}>{record.status}</Badge>
                      </TableCell>
                      <TableCell>{record.confirmations}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <QrCode className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Link className="h-4 w-4" />
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

        <TabsContent value="generate">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <QrCode className="h-5 w-5" />
                Generador de Códigos QR
              </CardTitle>
              <CardDescription>Genere códigos QR para verificación rápida de certificados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Seleccionar Certificado</label>
                    <select className="w-full p-2 border rounded">
                      <option value="">Seleccione un certificado...</option>
                      {blockchainRecords.map((record) => (
                        <option key={record.id} value={record.certificateId}>
                          {record.certificateId} - {record.personName}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">URL de Verificación</label>
                    <Input value="https://basilica.org/verify/" readOnly className="font-mono text-sm" />
                  </div>

                  <Button className="w-full">
                    <QrCode className="mr-2 h-4 w-4" />
                    Generar Código QR
                  </Button>
                </div>

                <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg h-64">
                  <div className="text-center text-gray-500">
                    <QrCode className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p>El código QR aparecerá aquí</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="network">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Link className="h-5 w-5" />
                  Estado de la Red Blockchain
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Estado de Conexión</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-green-600 font-medium">Conectado</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span>Último Bloque</span>
                  <span className="font-mono">{blockchainStats.latestBlock}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span>Tiempo de Bloque</span>
                  <span>~15 segundos</span>
                </div>

                <div className="flex items-center justify-between">
                  <span>Gas Price</span>
                  <span>20 Gwei</span>
                </div>

                <div className="flex items-center justify-between">
                  <span>Nodos Activos</span>
                  <span>3/3</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Configuración de Red</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Red Blockchain</label>
                  <Input value="Basilica Private Network" readOnly />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Chain ID</label>
                  <Input value="1337" readOnly className="font-mono" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">RPC Endpoint</label>
                  <Input value="https://blockchain.basilica.org:8545" readOnly className="font-mono text-sm" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Contract Address</label>
                  <Input value="0x742d35Cc6634C0532925a3b8D4C9db..." readOnly className="font-mono text-sm" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
