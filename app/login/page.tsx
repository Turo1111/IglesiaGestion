"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Church, Mail, Lock, Loader2, AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const { login, isLoading, isAuthenticated } = useAuth()
    const router = useRouter()

    // Redirigir si ya está autenticado
    useEffect(() => {
        if (isAuthenticated && !isLoading) {
            router.push("/dashboard")
        }
    }, [isAuthenticated, isLoading, router])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        if (!email || !password) {
            setError("Por favor complete todos los campos")
            return
        }

        const result = await login(email, password)

        if (!result.success) {
            setError(result.error || "Error al iniciar sesión")
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
            <div className="w-full max-w-md">
                {/* Logo y título */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
                        <Church className="h-8 w-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">SGI Basílica</h1>
                    <p className="text-gray-600">Sistema de Gestión Interno</p>
                    <p className="text-sm text-gray-500 mt-1">Basílica Menor Nuestra Señora de la Merced</p>
                </div>

                {/* Card de login */}
                <Card className="shadow-xl">
                    <CardHeader>
                        <CardTitle>Iniciar Sesión</CardTitle>
                        <CardDescription>Ingrese sus credenciales para acceder al sistema</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Email */}
                            <div className="space-y-2">
                                <Label htmlFor="email">Correo Electrónico</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="usuario@basilica.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="pl-10"
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="space-y-2">
                                <Label htmlFor="password">Contraseña</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="pl-10"
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>

                            {/* Error message */}
                            {error && (
                                <Alert variant="destructive">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            )}

                            {/* Submit button */}
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Iniciando sesión...
                                    </>
                                ) : (
                                    "Iniciar Sesión"
                                )}
                            </Button>
                        </form>

                        {/* Demo credentials */}
                        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                            <p className="text-xs font-semibold text-blue-900 mb-2">Credenciales de Demo:</p>
                            <div className="space-y-1 text-xs text-blue-700">
                                <p>
                                    <strong>Admin:</strong> admin@basilica.com / admin123
                                </p>
                                <p>
                                    <strong>Secretario:</strong> secretario@basilica.com / secretario123
                                </p>
                                <p>
                                    <strong>Consultor:</strong> consultor@basilica.com / consultor123
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Footer */}
                <p className="text-center text-sm text-gray-500 mt-6">
                    © 2024 SGI Basílica - Todos los derechos reservados
                </p>
            </div>
        </div>
    )
}

