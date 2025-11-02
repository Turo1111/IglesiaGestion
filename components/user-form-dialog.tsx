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
import { UserPlus, Loader2 } from "lucide-react"

const userValidationSchema = Yup.object({
    nombre: Yup.string()
        .required("El nombre es obligatorio")
        .min(3, "El nombre debe tener al menos 3 caracteres")
        .max(100, "El nombre no puede exceder 100 caracteres")
        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "El nombre solo puede contener letras y espacios"),

    email: Yup.string()
        .required("El correo electrónico es obligatorio")
        .email("Debe ser un correo electrónico válido")
        .matches(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            "Formato de correo electrónico inválido"
        ),

    idRol: Yup.number()
        .required("Debe seleccionar un rol")
        .min(1, "Debe seleccionar un rol válido"),

    password: Yup.string()
        .required("La contraseña es obligatoria")
        .min(8, "La contraseña debe tener al menos 8 caracteres")
        .max(50, "La contraseña no puede exceder 50 caracteres")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            "La contraseña debe contener al menos una mayúscula, una minúscula y un número"
        ),

    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Las contraseñas deben coincidir")
        .required("Debe confirmar la contraseña"),
})

export function UserFormDialog() {
    const { addUser, roles, users } = useData()
    const { toast } = useToast()
    const [open, setOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const formik = useFormik({
        initialValues: {
            nombre: "",
            email: "",
            idRol: 0,
            password: "",
            confirmPassword: "",
        },
        validationSchema: userValidationSchema,
        onSubmit: async (values, { resetForm }) => {
            setIsSubmitting(true)

            try {
                // Verificar si el email ya existe
                const emailExistente = users.find(
                    (u) => u.email.toLowerCase() === values.email.toLowerCase()
                )

                if (emailExistente) {
                    toast({
                        title: "Email duplicado",
                        description: `El correo electrónico ${values.email} ya está registrado en el sistema.`,
                        variant: "destructive",
                    })
                    setIsSubmitting(false)
                    return
                }

                // Simular delay de red
                await new Promise((resolve) => setTimeout(resolve, 800))

                addUser({
                    nombre: values.nombre,
                    email: values.email,
                    passwordHash: `hashed_${values.password}`, // En producción, esto sería un hash real
                    idRol: values.idRol,
                    idEmpleado: Math.floor(Math.random() * 1000) + 1, // Mock ID de empleado
                    activo: true,
                })

                const roleName = roles.find((r) => r.idRol === values.idRol)?.descripcion

                toast({
                    title: "Usuario creado exitosamente",
                    description: `${values.nombre} ha sido agregado como ${roleName}.`,
                })

                resetForm()
                setOpen(false)
            } catch (error) {
                toast({
                    title: "Error al crear usuario",
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
                <Button className="text-sm sm:text-base">
                    <UserPlus className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden xs:inline">Crear </span>Usuario
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[95vw] sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-lg sm:text-xl">Crear Nuevo Usuario</DialogTitle>
                    <DialogDescription className="text-xs sm:text-sm">
                        Complete los datos del usuario y asigne un rol
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={formik.handleSubmit} className="space-y-3 sm:space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="nombre">
                            Nombre Completo <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="nombre"
                            name="nombre"
                            placeholder="Ej: Padre Miguel Rodríguez"
                            value={formik.values.nombre}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={
                                formik.touched.nombre && formik.errors.nombre ? "border-red-500" : ""
                            }
                            disabled={isSubmitting}
                        />
                        {formik.touched.nombre && formik.errors.nombre && (
                            <p className="text-sm text-red-500">{formik.errors.nombre}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">
                                Correo Electrónico <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="usuario@basilica.org"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={
                                    formik.touched.email && formik.errors.email ? "border-red-500" : ""
                                }
                                disabled={isSubmitting}
                            />
                            {formik.touched.email && formik.errors.email && (
                                <p className="text-sm text-red-500">{formik.errors.email}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="idRol">
                                Rol <span className="text-red-500">*</span>
                            </Label>
                            <Select
                                value={formik.values.idRol.toString()}
                                onValueChange={(value) => formik.setFieldValue("idRol", parseInt(value))}
                                disabled={isSubmitting}
                            >
                                <SelectTrigger
                                    className={
                                        formik.touched.idRol && formik.errors.idRol ? "border-red-500" : ""
                                    }
                                >
                                    <SelectValue placeholder="Seleccione un rol" />
                                </SelectTrigger>
                                <SelectContent>
                                    {roles.length === 0 ? (
                                        <div className="p-2 text-sm text-gray-500 text-center">
                                            No hay roles disponibles
                                        </div>
                                    ) : (
                                        roles.map((role) => (
                                            <SelectItem key={role.idRol} value={role.idRol.toString()}>
                                                {role.descripcion} ({role.permissions.length} permisos)
                                            </SelectItem>
                                        ))
                                    )}
                                </SelectContent>
                            </Select>
                            {formik.touched.idRol && formik.errors.idRol && (
                                <p className="text-sm text-red-500">{formik.errors.idRol}</p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="password">
                                Contraseña <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="••••••••"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={
                                    formik.touched.password && formik.errors.password ? "border-red-500" : ""
                                }
                                disabled={isSubmitting}
                            />
                            {formik.touched.password && formik.errors.password && (
                                <p className="text-sm text-red-500">{formik.errors.password}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">
                                Confirmar Contraseña <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                placeholder="••••••••"
                                value={formik.values.confirmPassword}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={
                                    formik.touched.confirmPassword && formik.errors.confirmPassword
                                        ? "border-red-500"
                                        : ""
                                }
                                disabled={isSubmitting}
                            />
                            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                                <p className="text-sm text-red-500">{formik.errors.confirmPassword}</p>
                            )}
                        </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                        <p className="text-sm text-blue-800">
                            <strong>Nota:</strong> La contraseña debe tener al menos 8 caracteres, incluir una mayúscula, una minúscula y un número.
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
                                    Creando Usuario...
                                </>
                            ) : (
                                "Crear Usuario"
                            )}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
