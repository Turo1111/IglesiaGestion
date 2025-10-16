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
import { Checkbox } from "@/components/ui/checkbox"
import { Shield, Loader2 } from "lucide-react"

// Permisos disponibles en el MVP
const MVP_PERMISSIONS = [
    { id: "users_read", label: "Ver Usuarios", category: "Usuarios" },
    { id: "users_create", label: "Crear Usuarios", category: "Usuarios" },
    { id: "users_update", label: "Editar Usuarios", category: "Usuarios" },
    { id: "users_delete", label: "Eliminar Usuarios", category: "Usuarios" },

    { id: "roles_read", label: "Ver Roles", category: "Roles" },
    { id: "roles_create", label: "Crear Roles", category: "Roles" },
    { id: "roles_update", label: "Editar Roles", category: "Roles" },
    { id: "roles_delete", label: "Eliminar Roles", category: "Roles" },

    { id: "fiel_read", label: "Ver Fieles", category: "Fieles" },
    { id: "fiel_create", label: "Registrar Fieles", category: "Fieles" },
    { id: "fiel_update", label: "Editar Fieles", category: "Fieles" },
    { id: "fiel_delete", label: "Eliminar Fieles", category: "Fieles" },

    { id: "sacramentos_read", label: "Ver Sacramentos", category: "Sacramentos" },
    { id: "sacramentos_create", label: "Registrar Sacramentos", category: "Sacramentos" },
    { id: "sacramentos_update", label: "Editar Sacramentos", category: "Sacramentos" },
    { id: "sacramentos_delete", label: "Eliminar Sacramentos", category: "Sacramentos" },

    { id: "certificados_read", label: "Ver Certificados", category: "Certificados" },
    { id: "certificados_emit", label: "Emitir Certificados", category: "Certificados" },
    { id: "certificados_download", label: "Descargar Certificados", category: "Certificados" },

    { id: "blockchain_register", label: "Registrar en Blockchain", category: "Blockchain" },
    { id: "blockchain_verify", label: "Verificar en Blockchain", category: "Blockchain" },
]

const roleValidationSchema = Yup.object({
    descripcion: Yup.string()
        .required("La descripción del rol es obligatoria")
        .min(3, "La descripción debe tener al menos 3 caracteres")
        .max(50, "La descripción no puede exceder 50 caracteres"),

    permissions: Yup.array()
        .of(Yup.string())
        .min(1, "Debe seleccionar al menos un permiso"),
})

export function RoleFormDialog() {
    const { addRole } = useData()
    const { toast } = useToast()
    const [open, setOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const formik = useFormik({
        initialValues: {
            descripcion: "",
            permissions: [] as string[],
        },
        validationSchema: roleValidationSchema,
        onSubmit: async (values, { resetForm }) => {
            setIsSubmitting(true)

            try {
                // Simular delay de red
                await new Promise((resolve) => setTimeout(resolve, 800))

                addRole({
                    descripcion: values.descripcion,
                    permissions: values.permissions,
                })

                toast({
                    title: "Rol creado exitosamente",
                    description: `El rol "${values.descripcion}" ha sido creado con ${values.permissions.length} permisos.`,
                })

                resetForm()
                setOpen(false)
            } catch (error) {
                toast({
                    title: "Error al crear rol",
                    description: "Por favor, intente nuevamente.",
                    variant: "destructive",
                })
            } finally {
                setIsSubmitting(false)
            }
        },
    })

    const handlePermissionToggle = (permissionId: string) => {
        const currentPermissions = formik.values.permissions
        if (currentPermissions.includes(permissionId)) {
            formik.setFieldValue(
                "permissions",
                currentPermissions.filter((p) => p !== permissionId)
            )
        } else {
            formik.setFieldValue("permissions", [...currentPermissions, permissionId])
        }
    }

    const handleSelectAllInCategory = (category: string) => {
        const categoryPermissions = MVP_PERMISSIONS.filter((p) => p.category === category).map((p) => p.id)
        const currentPermissions = formik.values.permissions

        // Si todos están seleccionados, deseleccionar todos de esta categoría
        const allSelected = categoryPermissions.every((p) => currentPermissions.includes(p))

        if (allSelected) {
            formik.setFieldValue(
                "permissions",
                currentPermissions.filter((p) => !categoryPermissions.includes(p))
            )
        } else {
            // Agregar los que faltan
            const newPermissions = [...new Set([...currentPermissions, ...categoryPermissions])]
            formik.setFieldValue("permissions", newPermissions)
        }
    }

    const handleOpenChange = (newOpen: boolean) => {
        if (!newOpen && !isSubmitting) {
            formik.resetForm()
        }
        setOpen(newOpen)
    }

    // Agrupar permisos por categoría
    const permissionsByCategory = MVP_PERMISSIONS.reduce(
        (acc, permission) => {
            if (!acc[permission.category]) {
                acc[permission.category] = []
            }
            acc[permission.category].push(permission)
            return acc
        },
        {} as Record<string, typeof MVP_PERMISSIONS>
    )

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button>
                    <Shield className="mr-2 h-4 w-4" />
                    Crear Rol
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[95vw] sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Crear Nuevo Rol</DialogTitle>
                    <DialogDescription>
                        Defina un rol y asigne los permisos correspondientes del sistema
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={formik.handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="descripcion">
                            Nombre del Rol <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="descripcion"
                            name="descripcion"
                            placeholder="Ej: Secretaria, Diácono, Asistente"
                            value={formik.values.descripcion}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={
                                formik.touched.descripcion && formik.errors.descripcion
                                    ? "border-red-500"
                                    : ""
                            }
                            disabled={isSubmitting}
                        />
                        {formik.touched.descripcion && formik.errors.descripcion && (
                            <p className="text-sm text-red-500">{formik.errors.descripcion}</p>
                        )}
                    </div>

                    <div className="space-y-4">
                        <div>
                            <Label>
                                Permisos <span className="text-red-500">*</span>
                            </Label>
                            <p className="text-sm text-gray-500 mt-1">
                                Seleccione los permisos que tendrá este rol
                            </p>
                            {formik.touched.permissions && formik.errors.permissions && (
                                <p className="text-sm text-red-500 mt-1">{formik.errors.permissions}</p>
                            )}
                        </div>

                        <div className="border rounded-lg divide-y">
                            {Object.entries(permissionsByCategory).map(([category, permissions]) => {
                                const allSelected = permissions.every((p) =>
                                    formik.values.permissions.includes(p.id)
                                )
                                const someSelected = permissions.some((p) =>
                                    formik.values.permissions.includes(p.id)
                                )

                                return (
                                    <div key={category} className="p-4">
                                        <div className="flex items-center justify-between mb-3">
                                            <Label className="text-base font-semibold">{category}</Label>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleSelectAllInCategory(category)}
                                                disabled={isSubmitting}
                                            >
                                                {allSelected ? "Deseleccionar todos" : "Seleccionar todos"}
                                            </Button>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            {permissions.map((permission) => (
                                                <div key={permission.id} className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id={permission.id}
                                                        checked={formik.values.permissions.includes(permission.id)}
                                                        onCheckedChange={() => handlePermissionToggle(permission.id)}
                                                        disabled={isSubmitting}
                                                    />
                                                    <label
                                                        htmlFor={permission.id}
                                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                                                    >
                                                        {permission.label}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        <div className="bg-gray-50 border rounded-md p-3">
                            <p className="text-sm text-gray-700">
                                <strong>Permisos seleccionados:</strong> {formik.values.permissions.length}
                            </p>
                        </div>
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
                                    Creando...
                                </>
                            ) : (
                                "Crear Rol"
                            )}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
