"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Download, Eye, Hash, Calendar, FileText, Users } from "lucide-react"

export function CertificatesModule() {
  const [searchTerm, setSearchTerm] = useState("")
  const [certificates, setCertificates] = useState([
    {
      id: "CERT-2024-001",
      type: "Bautismo",
      personName: "María Elena Vásquez",
      parentNames: "Carlos Vásquez y Ana María Torres",
      date: "2024-01-15",
      issueDate: "2024-01-15",
      status: "Validado",
      hash: "0x7f9a2b8c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a",
      priest: "Padre Miguel Rodríguez",
      parish: "Basílica Menor Nuestra Señora de la Merced",
      bookNumber: "Libro 45",
      pageNumber: "Página 127",
      notes: "Bautismo realizado en ceremonia dominical",
    },
    {
      id: "CERT-2024-002",
      type: "Matrimonio",
      personName: "Carlos Mendoza & Ana García",
      parentNames: "Testigos: José Mendoza, María García",
      date: "2024-01-14",
      issueDate: "2024-01-14",
      status: "Pendiente",
      hash: "0x8c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d",
      priest: "Padre Antonio Silva",
      parish: "Basílica Menor Nuestra Señora de la Merced",
      bookNumber: "Libro 12",
      pageNumber: "Página 89",
      notes: "Matrimonio con dispensa especial",
    },
    {
      id: "CERT-2024-003",
      type: "Confirmación",
      personName: "José Luis Herrera",
      parentNames: "Luis Herrera y Carmen Morales",
      date: "2024-01-13",
      issueDate: "2024-01-13",
      status: "Validado",
      hash: "0x9e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f",
      priest: "Padre Miguel Rodríguez",
      parish: "Basílica Menor Nuestra Señora de la Merced",
      bookNumber: "Libro 23",
      pageNumber: "Página 156",
      notes: "Confirmación en grupo de jóvenes",
    },
    {
      id: "CERT-2024-004",
      type: "Primera Comunión",
      personName: "Sofía Ramírez Castillo",
      parentNames: "Roberto Ramírez y Lucía Castillo",
      date: "2024-01-12",
      issueDate: "2024-01-12",
      status: "Validado",
      hash: "0xa1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2",
      priest: "Diácono José Martínez",
      parish: "Basílica Menor Nuestra Señora de la Merced",
      bookNumber: "Libro 34",
      pageNumber: "Página 78",
      notes: "Primera comunión en ceremonia especial",
    },
    {
      id: "CERT-2024-005",
      type: "Defunción",
      personName: "Don Aurelio Mendoza Vega",
      parentNames: "Cónyuge: Doña Carmen Vega",
      date: "2024-01-11",
      issueDate: "2024-01-11",
      status: "Validado",
      hash: "0xb2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3",
      priest: "Padre Miguel Rodríguez",
      parish: "Basílica Menor Nuestra Señora de la Merced",
      bookNumber: "Libro 67",
      pageNumber: "Página 234",
      notes: "Funeral con honras especiales",
    },
  ])

  const [newCertificate, setNewCertificate] = useState({
    type: "",
    personName: "",
    parentNames: "",
    date: "",
    priest: "",
    bookNumber: "",
    pageNumber: "",
    notes: "",
  })

  const filteredCertificates = certificates.filter(
    (cert) =>
      cert.personName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Bautismo":
        return "bg-blue-100 text-blue-800"
      case "Matrimonio":
        return "bg-pink-100 text-pink-800"
      case "Confirmación":
        return "bg-purple-100 text-purple-800"
      case "Primera Comunión":
        return "bg-green-100 text-green-800"
      case "Defunción":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    return status === "Validado" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
  }

  const generateHash = () => {
    return "0x" + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join("")
  }

  const handleCreateCertificate = () => {
    const certificate = {
      id: `CERT-2024-${String(certificates.length + 1).padStart(3, "0")}`,
      ...newCertificate,
      issueDate: new Date().toISOString().split("T")[0],
      status: "Pendiente",
      hash: generateHash(),
      parish: "Basílica Menor Nuestra Señora de la Merced",
    }
    setCertificates([certificate, ...certificates])
    setNewCertificate({
      type: "",
      personName: "",
      parentNames: "",
      date: "",
      priest: "",
      bookNumber: "",
      pageNumber: "",
      notes: "",
    })
  }

  const certificateStats = {
    total: certificates.length,
    validated: certificates.filter((c) => c.status === "Validado").length,
    pending: certificates.filter((c) => c.status === "Pendiente").length,
    thisMonth: certificates.filter((c) => c.date.includes("2024-01")).length,
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Gestión de Certificados</h1>
          <p className="text-gray-600">Administración de certificados eclesiásticos</p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Certificado
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Crear Nuevo Certificado</DialogTitle>
              <DialogDescription>Registre un nuevo certificado eclesiástico en el sistema.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Tipo de Sacramento</Label>
                  <Select onValueChange={(value) => setNewCertificate({ ...newCertificate, type: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Bautismo">Bautismo</SelectItem>
                      <SelectItem value="Primera Comunión">Primera Comunión</SelectItem>
                      <SelectItem value="Confirmación">Confirmación</SelectItem>
                      <SelectItem value="Matrimonio">Matrimonio</SelectItem>
                      <SelectItem value="Defunción">Defunción</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Fecha del Sacramento</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newCertificate.date}
                    onChange={(e) => setNewCertificate({ ...newCertificate, date: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="personName">Nombre de la Persona</Label>
                <Input
                  id="personName"
                  value={newCertificate.personName}
                  onChange={(e) => setNewCertificate({ ...newCertificate, personName: e.target.value })}
                  placeholder="Nombre completo"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="parentNames">Padres/Testigos</Label>
                <Input
                  id="parentNames"
                  value={newCertificate.parentNames}
                  onChange={(e) => setNewCertificate({ ...newCertificate, parentNames: e.target.value })}
                  placeholder="Nombres de padres o testigos"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="priest">Sacerdote Oficiante</Label>
                  <Select onValueChange={(value) => setNewCertificate({ ...newCertificate, priest: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar sacerdote" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Padre Miguel Rodríguez">Padre Miguel Rodríguez</SelectItem>
                      <SelectItem value="Padre Antonio Silva">Padre Antonio Silva</SelectItem>
                      <SelectItem value="Diácono José Martínez">Diácono José Martínez</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bookNumber">Libro</Label>
                  <Input
                    id="bookNumber"
                    value={newCertificate.bookNumber}
                    onChange={(e) => setNewCertificate({ ...newCertificate, bookNumber: e.target.value })}
                    placeholder="Ej: Libro 45"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pageNumber">Página</Label>
                  <Input
                    id="pageNumber"
                    value={newCertificate.pageNumber}
                    onChange={(e) => setNewCertificate({ ...newCertificate, pageNumber: e.target.value })}
                    placeholder="Ej: Página 127"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Observaciones</Label>
                <Textarea
                  id="notes"
                  value={newCertificate.notes}
                  onChange={(e) => setNewCertificate({ ...newCertificate, notes: e.target.value })}
                  placeholder="Observaciones adicionales..."
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleCreateCertificate}>Crear Certificado</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Estadísticas */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Certificados</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{certificateStats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Validados</CardTitle>
            <Hash className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{certificateStats.validated}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{certificateStats.pending}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Este Mes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{certificateStats.thisMonth}</div>
          </CardContent>
        </Card>
      </div>

      {/* Búsqueda y tabla */}
      <Card>
        <CardHeader>
          <CardTitle>Registro de Certificados</CardTitle>
          <CardDescription>Gestione y consulte todos los certificados eclesiásticos</CardDescription>
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar por nombre, tipo o ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Persona</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Sacerdote</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCertificates.map((cert) => (
                <TableRow key={cert.id}>
                  <TableCell className="font-mono text-sm">{cert.id}</TableCell>
                  <TableCell>
                    <Badge className={getTypeColor(cert.type)}>{cert.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{cert.personName}</div>
                      <div className="text-sm text-gray-500">{cert.parentNames}</div>
                    </div>
                  </TableCell>
                  <TableCell>{cert.date}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(cert.status)}>{cert.status}</Badge>
                  </TableCell>
                  <TableCell className="text-sm">{cert.priest}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Hash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
