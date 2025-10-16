import { Loader2, Church } from "lucide-react"

export function LoadingScreen() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
            <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-full mb-6 animate-pulse">
                    <Church className="h-10 w-10 text-white" />
                </div>
                <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-gray-900 mb-2">SGI Basílica</h2>
                <p className="text-gray-600">Cargando sistema...</p>
            </div>
        </div>
    )
}

