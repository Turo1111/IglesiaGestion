"use client"

import { createContext, useContext, useState, ReactNode } from "react"

// Interfaces
export interface Fiel {
    idFiel: number
    nombreCompleto: string
    fechaNacimiento: string
    DNI: string
    domicilio: string
    createdAt: string
}

export interface Sacramento {
    idSacramento: number
    tipo: string
    fechaCelebracion: string
    hashblockchain: string
    codigoQR: string
    idFiel: number
    idUsuarioPanelAdministrativo: number
    idParroquia: number
    certificadoEmitido: boolean
    fechaEmision?: string
    createdAt: string
}

export interface Certificado {
    idCertificado: number
    idSacramento: number
    tipoUsuario: string
    idUsuario: number
    fechaEmision: string
}

export interface Role {
    idRol: number
    descripcion: string
    permissions: string[]
    userCount: number
    createdAt: string
}

export interface User {
    idUsuario: number
    nombre: string
    email: string
    passwordHash: string
    idRol: number
    idEmpleado: number
    activo: boolean
    createdAt: string
}

interface DataContextType {
    // Fieles
    fieles: Fiel[]
    addFiel: (fiel: Omit<Fiel, "idFiel" | "createdAt">) => Fiel
    updateFiel: (id: number, fiel: Partial<Fiel>) => void
    deleteFiel: (id: number) => void

    // Sacramentos
    sacramentos: Sacramento[]
    addSacramento: (sacramento: Omit<Sacramento, "idSacramento" | "createdAt">) => Sacramento
    updateSacramento: (id: number, sacramento: Partial<Sacramento>) => void
    deleteSacramento: (id: number) => void
    getSacramentosByFiel: (idFiel: number) => Sacramento[]

    // Certificados
    certificados: Certificado[]
    addCertificado: (certificado: Omit<Certificado, "idCertificado">) => Certificado

    // Roles
    roles: Role[]
    addRole: (role: Omit<Role, "idRol" | "createdAt" | "userCount">) => Role
    updateRole: (id: number, role: Partial<Role>) => void
    deleteRole: (id: number) => void

    // Usuarios
    users: User[]
    addUser: (user: Omit<User, "idUsuario" | "createdAt">) => User
    updateUser: (id: number, user: Partial<User>) => void
    deleteUser: (id: number) => void
}

const DataContext = createContext<DataContextType | undefined>(undefined)

// Datos mock iniciales
const INITIAL_FIELES: Fiel[] = [
    {
        idFiel: 1,
        nombreCompleto: "María Elena Vásquez Torres",
        fechaNacimiento: "1995-03-15",
        DNI: "45678901",
        domicilio: "Av. Principal 123, Lima",
        createdAt: "2024-01-10",
    },
    {
        idFiel: 2,
        nombreCompleto: "Carlos Mendoza García",
        fechaNacimiento: "1990-07-20",
        DNI: "42345678",
        domicilio: "Jr. Los Olivos 456, Lima",
        createdAt: "2024-01-11",
    },
    {
        idFiel: 3,
        nombreCompleto: "José Luis Herrera Campos",
        fechaNacimiento: "2005-11-08",
        DNI: "78901234",
        domicilio: "Calle Las Flores 789, Lima",
        createdAt: "2024-01-12",
    },
    {
        idFiel: 4,
        nombreCompleto: "Ana Patricia Rojas Silva",
        fechaNacimiento: "1988-04-25",
        DNI: "41234567",
        domicilio: "Av. Los Jardines 321, Lima",
        createdAt: "2024-01-13",
    },
    {
        idFiel: 5,
        nombreCompleto: "Roberto Sánchez Morales",
        fechaNacimiento: "2010-09-12",
        DNI: "80123456",
        domicilio: "Jr. San Martín 654, Lima",
        createdAt: "2024-01-14",
    },
]

const INITIAL_SACRAMENTOS: Sacramento[] = [
    {
        idSacramento: 1,
        tipo: "Bautismo",
        fechaCelebracion: "1995-04-20",
        hashblockchain: "0x7f9a2b8c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a",
        codigoQR: "QR-BAU-2024-001",
        idFiel: 1,
        idUsuarioPanelAdministrativo: 1,
        idParroquia: 1,
        certificadoEmitido: true,
        fechaEmision: "2024-01-15",
        createdAt: "2024-01-10",
    },
    {
        idSacramento: 2,
        tipo: "Primera Comunión",
        fechaCelebracion: "2003-05-10",
        hashblockchain: "0xa1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2",
        codigoQR: "QR-COM-2024-002",
        idFiel: 1,
        idUsuarioPanelAdministrativo: 1,
        idParroquia: 1,
        certificadoEmitido: false,
        createdAt: "2024-01-10",
    },
    {
        idSacramento: 3,
        tipo: "Confirmación",
        fechaCelebracion: "2010-09-15",
        hashblockchain: "0xc3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4",
        codigoQR: "QR-CON-2024-003",
        idFiel: 1,
        idUsuarioPanelAdministrativo: 1,
        idParroquia: 1,
        certificadoEmitido: false,
        createdAt: "2024-01-10",
    },
    {
        idSacramento: 4,
        tipo: "Bautismo",
        fechaCelebracion: "1990-08-15",
        hashblockchain: "0x8c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d",
        codigoQR: "QR-BAU-2024-004",
        idFiel: 2,
        idUsuarioPanelAdministrativo: 2,
        idParroquia: 1,
        certificadoEmitido: true,
        fechaEmision: "2023-05-20",
        createdAt: "2024-01-11",
    },
    {
        idSacramento: 5,
        tipo: "Primera Comunión",
        fechaCelebracion: "1998-06-12",
        hashblockchain: "0xb2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3",
        codigoQR: "QR-COM-2024-005",
        idFiel: 2,
        idUsuarioPanelAdministrativo: 1,
        idParroquia: 1,
        certificadoEmitido: true,
        fechaEmision: "2023-06-01",
        createdAt: "2024-01-11",
    },
    {
        idSacramento: 6,
        tipo: "Confirmación",
        fechaCelebracion: "2005-10-20",
        hashblockchain: "0xd4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5",
        codigoQR: "QR-CON-2024-006",
        idFiel: 2,
        idUsuarioPanelAdministrativo: 1,
        idParroquia: 1,
        certificadoEmitido: true,
        fechaEmision: "2023-07-15",
        createdAt: "2024-01-11",
    },
    {
        idSacramento: 7,
        tipo: "Matrimonio",
        fechaCelebracion: "2024-01-14",
        hashblockchain: "0xe5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6",
        codigoQR: "QR-MAT-2024-007",
        idFiel: 2,
        idUsuarioPanelAdministrativo: 2,
        idParroquia: 1,
        certificadoEmitido: false,
        createdAt: "2024-01-14",
    },
    {
        idSacramento: 8,
        tipo: "Bautismo",
        fechaCelebracion: "2005-12-05",
        hashblockchain: "0x9e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f",
        codigoQR: "QR-BAU-2024-008",
        idFiel: 3,
        idUsuarioPanelAdministrativo: 1,
        idParroquia: 1,
        certificadoEmitido: true,
        fechaEmision: "2024-01-10",
        createdAt: "2024-01-12",
    },
    {
        idSacramento: 9,
        tipo: "Confirmación",
        fechaCelebracion: "2024-01-13",
        hashblockchain: "0xf6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7",
        codigoQR: "QR-CON-2024-009",
        idFiel: 3,
        idUsuarioPanelAdministrativo: 1,
        idParroquia: 1,
        certificadoEmitido: true,
        fechaEmision: "2024-01-13",
        createdAt: "2024-01-13",
    },
]

const MVP_PERMISSIONS = [
    "users_read", "users_create", "users_update", "users_delete",
    "roles_read", "roles_create", "roles_update", "roles_delete",
    "fiel_read", "fiel_create", "fiel_update", "fiel_delete",
    "sacramentos_read", "sacramentos_create", "sacramentos_update", "sacramentos_delete",
    "certificados_read", "certificados_emit", "certificados_download",
    "blockchain_register", "blockchain_verify",
]

const INITIAL_ROLES: Role[] = [
    {
        idRol: 1,
        descripcion: "Administrador",
        permissions: MVP_PERMISSIONS,
        userCount: 1,
        createdAt: "2024-01-01",
    },
    {
        idRol: 2,
        descripcion: "Sacerdote",
        permissions: [
            "fiel_read", "fiel_create", "fiel_update",
            "sacramentos_read", "sacramentos_create",
            "certificados_read", "certificados_emit", "certificados_download",
            "blockchain_register", "blockchain_verify",
        ],
        userCount: 2,
        createdAt: "2024-01-01",
    },
    {
        idRol: 3,
        descripcion: "Secretaria",
        permissions: [
            "fiel_read", "fiel_create", "fiel_update",
            "sacramentos_read",
            "certificados_read", "certificados_emit", "certificados_download",
        ],
        userCount: 1,
        createdAt: "2024-01-01",
    },
    {
        idRol: 4,
        descripcion: "Consultor",
        permissions: ["fiel_read", "sacramentos_read", "certificados_read", "blockchain_verify"],
        userCount: 1,
        createdAt: "2024-01-01",
    },
]

const INITIAL_USERS: User[] = [
    {
        idUsuario: 1,
        nombre: "Padre Miguel Rodríguez",
        email: "padre.miguel@basilica.org",
        passwordHash: "hashed_password",
        idRol: 1, // Administrador
        idEmpleado: 1,
        activo: true,
        createdAt: "2023-06-15",
    },
    {
        idUsuario: 2,
        nombre: "Padre Antonio Silva",
        email: "padre.antonio@basilica.org",
        passwordHash: "hashed_password",
        idRol: 2, // Sacerdote
        idEmpleado: 2,
        activo: true,
        createdAt: "2023-05-12",
    },
    {
        idUsuario: 3,
        nombre: "Hermana Carmen López",
        email: "hna.carmen@basilica.org",
        passwordHash: "hashed_password",
        idRol: 3, // Secretaria
        idEmpleado: 3,
        activo: true,
        createdAt: "2023-08-20",
    },
    {
        idUsuario: 4,
        nombre: "Diácono José Martínez",
        email: "diacono.jose@basilica.org",
        passwordHash: "hashed_password",
        idRol: 2, // Sacerdote
        idEmpleado: 4,
        activo: true,
        createdAt: "2023-09-10",
    },
    {
        idUsuario: 5,
        nombre: "María Elena Vásquez",
        email: "maria.vasquez@basilica.org",
        passwordHash: "hashed_password",
        idRol: 4, // Consultor
        idEmpleado: 5,
        activo: false,
        createdAt: "2023-07-05",
    },
]

export function DataProvider({ children }: { children: ReactNode }) {
    const [fieles, setFieles] = useState<Fiel[]>(INITIAL_FIELES)
    const [sacramentos, setSacramentos] = useState<Sacramento[]>(INITIAL_SACRAMENTOS)
    const [certificados, setCertificados] = useState<Certificado[]>([])
    const [roles, setRoles] = useState<Role[]>(INITIAL_ROLES)
    const [users, setUsers] = useState<User[]>(INITIAL_USERS)

    // Fieles
    const addFiel = (fielData: Omit<Fiel, "idFiel" | "createdAt">): Fiel => {
        const newFiel: Fiel = {
            ...fielData,
            idFiel: Math.max(...fieles.map((f) => f.idFiel), 0) + 1,
            createdAt: new Date().toISOString().split("T")[0],
        }
        setFieles([...fieles, newFiel])
        return newFiel
    }

    const updateFiel = (id: number, fielData: Partial<Fiel>) => {
        setFieles(fieles.map((f) => (f.idFiel === id ? { ...f, ...fielData } : f)))
    }

    const deleteFiel = (id: number) => {
        setFieles(fieles.filter((f) => f.idFiel !== id))
    }

    // Sacramentos
    const addSacramento = (sacramentoData: Omit<Sacramento, "idSacramento" | "createdAt">): Sacramento => {
        const newSacramento: Sacramento = {
            ...sacramentoData,
            idSacramento: Math.max(...sacramentos.map((s) => s.idSacramento), 0) + 1,
            createdAt: new Date().toISOString().split("T")[0],
        }
        setSacramentos([newSacramento, ...sacramentos])
        return newSacramento
    }

    const updateSacramento = (id: number, sacramentoData: Partial<Sacramento>) => {
        setSacramentos(sacramentos.map((s) => (s.idSacramento === id ? { ...s, ...sacramentoData } : s)))
    }

    const deleteSacramento = (id: number) => {
        setSacramentos(sacramentos.filter((s) => s.idSacramento !== id))
    }

    const getSacramentosByFiel = (idFiel: number): Sacramento[] => {
        return sacramentos.filter((s) => s.idFiel === idFiel)
    }

    // Certificados
    const addCertificado = (certificadoData: Omit<Certificado, "idCertificado">): Certificado => {
        const newCertificado: Certificado = {
            ...certificadoData,
            idCertificado: Math.max(...certificados.map((c) => c.idCertificado), 0) + 1,
        }
        setCertificados([...certificados, newCertificado])

        // Actualizar el sacramento como emitido
        updateSacramento(certificadoData.idSacramento, {
            certificadoEmitido: true,
            fechaEmision: certificadoData.fechaEmision,
        })

        return newCertificado
    }

    // Roles
    const addRole = (roleData: Omit<Role, "idRol" | "createdAt" | "userCount">): Role => {
        const newRole: Role = {
            ...roleData,
            idRol: Math.max(...roles.map((r) => r.idRol), 0) + 1,
            userCount: 0,
            createdAt: new Date().toISOString().split("T")[0],
        }
        setRoles([...roles, newRole])
        return newRole
    }

    const updateRole = (id: number, roleData: Partial<Role>) => {
        setRoles(roles.map((r) => (r.idRol === id ? { ...r, ...roleData } : r)))
    }

    const deleteRole = (id: number) => {
        setRoles(roles.filter((r) => r.idRol !== id))
    }

    // Usuarios
    const addUser = (userData: Omit<User, "idUsuario" | "createdAt">): User => {
        const newUser: User = {
            ...userData,
            idUsuario: Math.max(...users.map((u) => u.idUsuario), 0) + 1,
            createdAt: new Date().toISOString().split("T")[0],
        }
        setUsers([...users, newUser])

        // Actualizar contador de usuarios en el rol
        const role = roles.find((r) => r.idRol === userData.idRol)
        if (role) {
            updateRole(role.idRol, { userCount: role.userCount + 1 })
        }

        return newUser
    }

    const updateUser = (id: number, userData: Partial<User>) => {
        const oldUser = users.find((u) => u.idUsuario === id)
        setUsers(users.map((u) => (u.idUsuario === id ? { ...u, ...userData } : u)))

        // Si cambió el rol, actualizar contadores
        if (userData.idRol && oldUser && oldUser.idRol !== userData.idRol) {
            const oldRole = roles.find((r) => r.idRol === oldUser.idRol)
            const newRole = roles.find((r) => r.idRol === userData.idRol)

            if (oldRole) updateRole(oldRole.idRol, { userCount: oldRole.userCount - 1 })
            if (newRole) updateRole(newRole.idRol, { userCount: newRole.userCount + 1 })
        }
    }

    const deleteUser = (id: number) => {
        const user = users.find((u) => u.idUsuario === id)
        setUsers(users.filter((u) => u.idUsuario !== id))

        // Actualizar contador de usuarios en el rol
        if (user) {
            const role = roles.find((r) => r.idRol === user.idRol)
            if (role) {
                updateRole(role.idRol, { userCount: role.userCount - 1 })
            }
        }
    }

    const value: DataContextType = {
        fieles,
        addFiel,
        updateFiel,
        deleteFiel,
        sacramentos,
        addSacramento,
        updateSacramento,
        deleteSacramento,
        getSacramentosByFiel,
        certificados,
        addCertificado,
        roles,
        addRole,
        updateRole,
        deleteRole,
        users,
        addUser,
        updateUser,
        deleteUser,
    }

    return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export function useData() {
    const context = useContext(DataContext)
    if (context === undefined) {
        throw new Error("useData debe ser usado dentro de un DataProvider")
    }
    return context
}

