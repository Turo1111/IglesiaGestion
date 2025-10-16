"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { useRouter } from "next/navigation"

interface User {
    id: string
    name: string
    email: string
    role: "Administrador" | "Secretario" | "Consultor"
    parish: string
}

interface AuthContextType {
    user: User | null
    isLoading: boolean
    login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
    logout: () => void
    isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Usuarios de ejemplo para demostración
const DEMO_USERS = [
    {
        id: "1",
        email: "admin@basilica.com",
        password: "admin123",
        name: "Padre Miguel Rodríguez",
        role: "Administrador" as const,
        parish: "Basílica Menor Nuestra Señora de la Merced",
    },
    {
        id: "2",
        email: "secretario@basilica.com",
        password: "secretario123",
        name: "María González",
        role: "Secretario" as const,
        parish: "Basílica Menor Nuestra Señora de la Merced",
    },
    {
        id: "3",
        email: "consultor@basilica.com",
        password: "consultor123",
        name: "Juan Pérez",
        role: "Consultor" as const,
        parish: "Basílica Menor Nuestra Señora de la Merced",
    },
]

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    // Verificar si hay sesión guardada al cargar
    useEffect(() => {
        const savedUser = localStorage.getItem("user")
        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser))
            } catch (error) {
                localStorage.removeItem("user")
            }
        }
        setIsLoading(false)
    }, [])

    const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
        setIsLoading(true)

        // Simular delay de API
        await new Promise((resolve) => setTimeout(resolve, 800))

        // Buscar usuario
        const foundUser = DEMO_USERS.find((u) => u.email === email && u.password === password)

        if (foundUser) {
            const userData: User = {
                id: foundUser.id,
                name: foundUser.name,
                email: foundUser.email,
                role: foundUser.role,
                parish: foundUser.parish,
            }

            setUser(userData)
            localStorage.setItem("user", JSON.stringify(userData))
            setIsLoading(false)
            router.push("/dashboard")
            return { success: true }
        }

        setIsLoading(false)
        return { success: false, error: "Credenciales inválidas" }
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem("user")
        router.push("/login")
    }

    const value: AuthContextType = {
        user,
        isLoading,
        login,
        logout,
        isAuthenticated: !!user,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth debe ser usado dentro de un AuthProvider")
    }
    return context
}

