"use client"

import { useState } from "react"
import { useData } from "@/contexts/data-context"
import { useToast } from "@/hooks/use-toast"
import { useFormik } from "formik"
import * as Yup from "yup"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Plus, Loader2 } from "lucide-react"

const TIPOS_SACRAMENTO = [
    "Bautismo",
    "Primera Comunión",
    "Confirmación",
    "Matrimonio",
    "Penitencia",
    "Unción de Enfermos",
    "Orden Sacerdotal",
]

const sacramentoValidationSchema = Yup.object({
    tipo: Yup.string()
        .required("El tipo de sacramento es obligatorio")
        .oneOf(TIPOS_SACRAMENTO, "Tipo de sacramento inválido"),

    idFiel: Yup.number()
        .required("Debe seleccionar un fiel")
        .min(1, "Debe seleccionar un fiel válido"),

    fechaCelebracion: Yup.date()
        .required("La fecha de celebración es obligatoria")
        .max(new Date(), "La fecha de celebración no puede ser futura"),
})

// Función para generar hash de blockchain
const generateBlockchainHash = (): string => {
    const characters = "0123456789abcdef"
    let hash = "0x"
    for (let i = 0; i < 64; i++) {
        hash += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return hash
}

export function SacramentoFormDialog() {
    const { addSacramento, fieles, sacramentos } = useData()
    const { toast } = useToast()
    const [open, setOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const formik = useFormik({
        initialValues: {
            tipo: "",
            idFiel: 0,
            fechaCelebracion: "",
        },
        validationSchema: sacramentoValidationSchema,
        onSubmit: async (values, { resetForm }) => {
            setIsSubmitting(true)

            try {
                // Verificar si ya existe un sacramento con la misma combinación (fiel, tipo)
                const sacramentoDuplicado = sacramentos.find(
                    (s) =>
                        s.idFiel === values.idFiel &&
                        s.tipo === values.tipo
                )

                if (sacramentoDuplicado) {
                    const fielSeleccionado = fieles.find((f) => f.idFiel === values.idFiel)
                    
                    toast({
                        title: "Sacramento duplicado",
                        description: `${fielSeleccionado?.nombreCompleto} ya tiene registrado el sacramento de ${values.tipo}.`,
                        variant: "destructive",
                    })
                    
                    setIsSubmitting(false)
                    return
                }

                // Simular delay de red y procesamiento blockchain
                await new Promise((resolve) => setTimeout(resolve, 1200))

                const hashblockchain = generateBlockchainHash()
                const codigoQR = `QR-${values.tipo.substring(0, 3).toUpperCase()}-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, "0")}`

                addSacramento({
                    tipo: values.tipo,
                    fechaCelebracion: values.fechaCelebracion,
                    hashblockchain,
                    codigoQR,
                    idFiel: values.idFiel,
                    idUsuarioPanelAdministrativo: 1, // Usuario actual
                    idParroquia: 1, // Parroquia actual
                    certificadoEmitido: false,
                })

                const fielSeleccionado = fieles.find((f) => f.idFiel === values.idFiel)

                toast({
                    title: "Sacramento registrado exitosamente",
                    description: `Sacramento de ${values.tipo} para ${fielSeleccionado?.nombreCompleto} ha sido registrado en blockchain.`,
                })

                resetForm()
                setOpen(false)
            } catch (error) {
                toast({
                    title: "Error al registrar sacramento",
                    description: "Por favor, intente nuevamente.",
                    variant: "destructive",
                })
            } finally {
                setIsSubmitting(false)
            }
        },
    })

    const handleOpenChange = (newOpen: boolean) => {
        if (!newOpen && !isSubmitting) {
            formik.resetForm()
        }
        setOpen(newOpen)
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Registrar Sacramento
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[95vw] sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Registrar Nuevo Sacramento</DialogTitle>
                    <DialogDescription>
                        Complete los datos del sacramento y relacione con un fiel
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={formik.handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="tipo">
                                Tipo de Sacramento <span className="text-red-500">*</span>
                            </Label>
                            <Select
                                value={formik.values.tipo}
                                onValueChange={(value) => formik.setFieldValue("tipo", value)}
                                disabled={isSubmitting}
                            >
                                <SelectTrigger
                                    className={
                                        formik.touched.tipo && formik.errors.tipo ? "border-red-500" : ""
                                    }
                                >
                                    <SelectValue placeholder="Seleccione un sacramento" />
                                </SelectTrigger>
                                <SelectContent>
                                    {TIPOS_SACRAMENTO.map((tipo) => (
                                        <SelectItem key={tipo} value={tipo}>
                                            {tipo}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {formik.touched.tipo && formik.errors.tipo && (
                                <p className="text-sm text-red-500">{formik.errors.tipo}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="fechaCelebracion">
                                Fecha de Celebración <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="fechaCelebracion"
                                name="fechaCelebracion"
                                type="date"
                                value={formik.values.fechaCelebracion}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={
                                    formik.touched.fechaCelebracion && formik.errors.fechaCelebracion
                                        ? "border-red-500"
                                        : ""
                                }
                                disabled={isSubmitting}
                                max={new Date().toISOString().split("T")[0]}
                            />
                            {formik.touched.fechaCelebracion && formik.errors.fechaCelebracion && (
                                <p className="text-sm text-red-500">{formik.errors.fechaCelebracion}</p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="idFiel">
                            Fiel <span className="text-red-500">*</span>
                        </Label>
                        <Select
                            value={formik.values.idFiel.toString()}
                            onValueChange={(value) => formik.setFieldValue("idFiel", parseInt(value))}
                            disabled={isSubmitting}
                        >
                            <SelectTrigger
                                className={
                                    formik.touched.idFiel && formik.errors.idFiel ? "border-red-500" : ""
                                }
                            >
                                <SelectValue placeholder="Seleccione un fiel" />
                            </SelectTrigger>
                            <SelectContent>
                                {fieles.length === 0 ? (
                                    <div className="p-2 text-sm text-gray-500 text-center">
                                        No hay fieles registrados
                                    </div>
                                ) : (
                                    fieles.map((fiel) => (
                                        <SelectItem key={fiel.idFiel} value={fiel.idFiel.toString()}>
                                            {fiel.nombreCompleto} (DNI: {fiel.DNI})
                                        </SelectItem>
                                    ))
                                )}
                            </SelectContent>
                        </Select>
                        {formik.touched.idFiel && formik.errors.idFiel && (
                            <p className="text-sm text-red-500">{formik.errors.idFiel}</p>
                        )}
                        <p className="text-xs text-gray-500 mt-1">
                            El sacramento se asociará automáticamente con el fiel seleccionado
                        </p>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                        <p className="text-sm text-blue-800">
                            <strong>Nota:</strong> Al registrar el sacramento, se generará automáticamente un hash en blockchain y un código QR único para garantizar su autenticidad.
                        </p>
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => handleOpenChange(false)}
                            disabled={isSubmitting}
                        >
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={isSubmitting || !formik.isValid}>
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Registrando en Blockchain...
                                </>
                            ) : (
                                "Registrar Sacramento"
                            )}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
