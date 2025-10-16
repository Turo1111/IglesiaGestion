"use client"

import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Loader2 } from "lucide-react"
import { useState } from "react"

// Esquema de validación con Yup
const certificateValidationSchema = Yup.object().shape({
    type: Yup.string()
        .oneOf(
            ["Bautismo", "Primera Comunión", "Confirmación", "Matrimonio", "Defunción"],
            "Debe seleccionar un tipo de sacramento válido"
        )
        .required("El tipo de sacramento es obligatorio"),

    date: Yup.date()
        .max(new Date(), "La fecha no puede ser futura")
        .required("La fecha del sacramento es obligatoria")
        .typeError("Debe ingresar una fecha válida"),

    personName: Yup.string()
        .min(3, "El nombre debe tener al menos 3 caracteres")
        .max(150, "El nombre no puede exceder 150 caracteres")
        .required("El nombre de la persona es obligatorio")
        .matches(
            /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s&]+$/,
            "El nombre solo puede contener letras, espacios y &"
        ),

    parentNames: Yup.string()
        .min(3, "Los nombres deben tener al menos 3 caracteres")
        .max(200, "Los nombres no pueden exceder 200 caracteres")
        .required("Los nombres de padres/testigos son obligatorios")
        .matches(
            /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s,.:&]+$/,
            "Los nombres solo pueden contener letras, espacios y signos de puntuación básicos"
        ),

    priest: Yup.string()
        .required("Debe seleccionar un sacerdote oficiante"),

    bookNumber: Yup.string()
        .required("El número de libro es obligatorio")
        .matches(
            /^Libro\s+\d+$/,
            "El formato debe ser 'Libro' seguido de un número (Ej: Libro 45)"
        ),

    pageNumber: Yup.string()
        .required("El número de página es obligatorio")
        .matches(
            /^Página\s+\d+$/,
            "El formato debe ser 'Página' seguido de un número (Ej: Página 127)"
        ),

    notes: Yup.string()
        .max(500, "Las observaciones no pueden exceder 500 caracteres")
        .optional(),
})

interface CertificateFormValues {
    type: string
    date: string
    personName: string
    parentNames: string
    priest: string
    bookNumber: string
    pageNumber: string
    notes: string
}

interface CertificateFormDialogProps {
    onCertificateCreate: (certificateData: CertificateFormValues) => void
}

export function CertificateFormDialog({ onCertificateCreate }: CertificateFormDialogProps) {
    const [isOpen, setIsOpen] = useState(false)

    const initialValues: CertificateFormValues = {
        type: "",
        date: "",
        personName: "",
        parentNames: "",
        priest: "",
        bookNumber: "",
        pageNumber: "",
        notes: "",
    }

    const handleSubmit = (
        values: CertificateFormValues,
        { setSubmitting, resetForm }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void }
    ) => {
        // Simular delay de envío
        setTimeout(() => {
            onCertificateCreate(values)
            setSubmitting(false)
            resetForm()
            setIsOpen(false)
        }, 500)
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Nuevo Certificado
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[650px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Crear Nuevo Certificado</DialogTitle>
                    <DialogDescription>
                        Registre un nuevo certificado eclesiástico en el sistema. Todos los campos marcados con * son obligatorios.
                    </DialogDescription>
                </DialogHeader>

                <Formik
                    initialValues={initialValues}
                    validationSchema={certificateValidationSchema}
                    onSubmit={handleSubmit}
                    validateOnChange={true}
                    validateOnBlur={true}
                >
                    {({ isSubmitting, setFieldValue, values, errors, touched }) => (
                        <Form className="space-y-4">
                            {/* Tipo de Sacramento y Fecha */}
                            <div className="grid grid-cols-2 gap-4">
                                {/* Tipo de Sacramento */}
                                <div className="space-y-2">
                                    <Label htmlFor="type">
                                        Tipo de Sacramento <span className="text-red-500">*</span>
                                    </Label>
                                    <Select value={values.type} onValueChange={(value) => setFieldValue("type", value)}>
                                        <SelectTrigger className={errors.type && touched.type ? "border-red-500" : ""}>
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
                                    <ErrorMessage name="type">{(msg) => <p className="text-sm text-red-500 mt-1">{msg}</p>}</ErrorMessage>
                                </div>

                                {/* Fecha del Sacramento */}
                                <div className="space-y-2">
                                    <Label htmlFor="date">
                                        Fecha del Sacramento <span className="text-red-500">*</span>
                                    </Label>
                                    <Field
                                        as={Input}
                                        id="date"
                                        name="date"
                                        type="date"
                                        className={errors.date && touched.date ? "border-red-500" : ""}
                                    />
                                    <ErrorMessage name="date">{(msg) => <p className="text-sm text-red-500 mt-1">{msg}</p>}</ErrorMessage>
                                </div>
                            </div>

                            {/* Nombre de la Persona */}
                            <div className="space-y-2">
                                <Label htmlFor="personName">
                                    Nombre de la Persona <span className="text-red-500">*</span>
                                </Label>
                                <Field
                                    as={Input}
                                    id="personName"
                                    name="personName"
                                    placeholder="Nombre completo (Ej: María Elena Vásquez o Carlos & Ana García)"
                                    className={errors.personName && touched.personName ? "border-red-500" : ""}
                                />
                                <ErrorMessage name="personName">
                                    {(msg) => <p className="text-sm text-red-500 mt-1">{msg}</p>}
                                </ErrorMessage>
                            </div>

                            {/* Padres/Testigos */}
                            <div className="space-y-2">
                                <Label htmlFor="parentNames">
                                    Padres/Testigos <span className="text-red-500">*</span>
                                </Label>
                                <Field
                                    as={Input}
                                    id="parentNames"
                                    name="parentNames"
                                    placeholder="Nombres de padres o testigos (Ej: Carlos Vásquez y Ana María Torres)"
                                    className={errors.parentNames && touched.parentNames ? "border-red-500" : ""}
                                />
                                <ErrorMessage name="parentNames">
                                    {(msg) => <p className="text-sm text-red-500 mt-1">{msg}</p>}
                                </ErrorMessage>
                            </div>

                            {/* Sacerdote y Libro */}
                            <div className="grid grid-cols-2 gap-4">
                                {/* Sacerdote Oficiante */}
                                <div className="space-y-2">
                                    <Label htmlFor="priest">
                                        Sacerdote Oficiante <span className="text-red-500">*</span>
                                    </Label>
                                    <Select value={values.priest} onValueChange={(value) => setFieldValue("priest", value)}>
                                        <SelectTrigger className={errors.priest && touched.priest ? "border-red-500" : ""}>
                                            <SelectValue placeholder="Seleccionar sacerdote" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Padre Miguel Rodríguez">Padre Miguel Rodríguez</SelectItem>
                                            <SelectItem value="Padre Antonio Silva">Padre Antonio Silva</SelectItem>
                                            <SelectItem value="Diácono José Martínez">Diácono José Martínez</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <ErrorMessage name="priest">
                                        {(msg) => <p className="text-sm text-red-500 mt-1">{msg}</p>}
                                    </ErrorMessage>
                                </div>

                                {/* Número de Libro */}
                                <div className="space-y-2">
                                    <Label htmlFor="bookNumber">
                                        Libro <span className="text-red-500">*</span>
                                    </Label>
                                    <Field
                                        as={Input}
                                        id="bookNumber"
                                        name="bookNumber"
                                        placeholder="Libro 45"
                                        className={errors.bookNumber && touched.bookNumber ? "border-red-500" : ""}
                                    />
                                    <ErrorMessage name="bookNumber">
                                        {(msg) => <p className="text-sm text-red-500 mt-1">{msg}</p>}
                                    </ErrorMessage>
                                    <p className="text-xs text-gray-500">Formato: Libro [número]</p>
                                </div>
                            </div>

                            {/* Número de Página */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="pageNumber">
                                        Página <span className="text-red-500">*</span>
                                    </Label>
                                    <Field
                                        as={Input}
                                        id="pageNumber"
                                        name="pageNumber"
                                        placeholder="Página 127"
                                        className={errors.pageNumber && touched.pageNumber ? "border-red-500" : ""}
                                    />
                                    <ErrorMessage name="pageNumber">
                                        {(msg) => <p className="text-sm text-red-500 mt-1">{msg}</p>}
                                    </ErrorMessage>
                                    <p className="text-xs text-gray-500">Formato: Página [número]</p>
                                </div>
                            </div>

                            {/* Observaciones */}
                            <div className="space-y-2">
                                <Label htmlFor="notes">Observaciones</Label>
                                <Field
                                    as={Textarea}
                                    id="notes"
                                    name="notes"
                                    placeholder="Observaciones adicionales (opcional)..."
                                    className={errors.notes && touched.notes ? "border-red-500" : ""}
                                    rows={3}
                                />
                                <ErrorMessage name="notes">{(msg) => <p className="text-sm text-red-500 mt-1">{msg}</p>}</ErrorMessage>
                                <p className="text-xs text-gray-500">Máximo 500 caracteres</p>
                            </div>

                            <DialogFooter className="gap-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setIsOpen(false)}
                                    disabled={isSubmitting}
                                >
                                    Cancelar
                                </Button>
                                <Button type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Creando...
                                        </>
                                    ) : (
                                        "Crear Certificado"
                                    )}
                                </Button>
                            </DialogFooter>
                        </Form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    )
}

