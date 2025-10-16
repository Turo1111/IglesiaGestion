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
import { UserPlus, Loader2 } from "lucide-react"

const fielValidationSchema = Yup.object({
    nombreCompleto: Yup.string()
        .required("El nombre completo es obligatorio")
        .min(3, "El nombre debe tener al menos 3 caracteres")
        .max(100, "El nombre no puede exceder 100 caracteres")
        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "El nombre solo puede contener letras y espacios"),

    DNI: Yup.string()
        .required("El DNI es obligatorio")
        .matches(/^[0-9]{8}$/, "El DNI debe tener exactamente 8 dígitos"),

    fechaNacimiento: Yup.date()
        .required("La fecha de nacimiento es obligatoria")
        .max(new Date(), "La fecha de nacimiento no puede ser futura")
        .test("edad-minima", "El fiel debe tener al menos 1 día de nacido", function (value) {
            if (!value) return false
            const hoy = new Date()
            hoy.setHours(0, 0, 0, 0)
            return value < hoy
        }),

    domicilio: Yup.string()
        .required("El domicilio es obligatorio")
        .min(5, "El domicilio debe tener al menos 5 caracteres")
        .max(200, "El domicilio no puede exceder 200 caracteres"),
})

export function FielFormDialog() {
    const { addFiel } = useData()
    const { toast } = useToast()
    const [open, setOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const formik = useFormik({
        initialValues: {
            nombreCompleto: "",
            DNI: "",
            fechaNacimiento: "",
            domicilio: "",
        },
        validationSchema: fielValidationSchema,
        onSubmit: async (values, { resetForm }) => {
            setIsSubmitting(true)

            try {
                // Simular delay de red
                await new Promise((resolve) => setTimeout(resolve, 800))

                addFiel(values)

                toast({
                    title: "Fiel registrado exitosamente",
                    description: `${values.nombreCompleto} ha sido agregado al sistema.`,
                })

                resetForm()
                setOpen(false)
            } catch (error) {
                toast({
                    title: "Error al registrar fiel",
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
                    <UserPlus className="mr-2 h-4 w-4" />
                    Registrar Fiel
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[95vw] sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Registrar Nuevo Fiel</DialogTitle>
                    <DialogDescription>
                        Complete los datos del fiel para registrarlo en el sistema
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={formik.handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="nombreCompleto">
                            Nombre Completo <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="nombreCompleto"
                            name="nombreCompleto"
                            placeholder="Ej: María Elena Vásquez Torres"
                            value={formik.values.nombreCompleto}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={
                                formik.touched.nombreCompleto && formik.errors.nombreCompleto
                                    ? "border-red-500"
                                    : ""
                            }
                            disabled={isSubmitting}
                        />
                        {formik.touched.nombreCompleto && formik.errors.nombreCompleto && (
                            <p className="text-sm text-red-500">{formik.errors.nombreCompleto}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="DNI">
                                DNI <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="DNI"
                                name="DNI"
                                placeholder="12345678"
                                maxLength={8}
                                value={formik.values.DNI}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={
                                    formik.touched.DNI && formik.errors.DNI ? "border-red-500" : ""
                                }
                                disabled={isSubmitting}
                            />
                            {formik.touched.DNI && formik.errors.DNI && (
                                <p className="text-sm text-red-500">{formik.errors.DNI}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="fechaNacimiento">
                                Fecha de Nacimiento <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="fechaNacimiento"
                                name="fechaNacimiento"
                                type="date"
                                value={formik.values.fechaNacimiento}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={
                                    formik.touched.fechaNacimiento && formik.errors.fechaNacimiento
                                        ? "border-red-500"
                                        : ""
                                }
                                disabled={isSubmitting}
                                max={new Date().toISOString().split("T")[0]}
                            />
                            {formik.touched.fechaNacimiento && formik.errors.fechaNacimiento && (
                                <p className="text-sm text-red-500">{formik.errors.fechaNacimiento}</p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="domicilio">
                            Domicilio <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="domicilio"
                            name="domicilio"
                            placeholder="Ej: Av. Principal 123, Lima"
                            value={formik.values.domicilio}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={
                                formik.touched.domicilio && formik.errors.domicilio ? "border-red-500" : ""
                            }
                            disabled={isSubmitting}
                        />
                        {formik.touched.domicilio && formik.errors.domicilio && (
                            <p className="text-sm text-red-500">{formik.errors.domicilio}</p>
                        )}
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
                                    Registrando...
                                </>
                            ) : (
                                "Registrar Fiel"
                            )}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
