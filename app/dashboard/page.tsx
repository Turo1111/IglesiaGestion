"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { UsersModule } from "@/components/users-module"
import { RolesModule } from "@/components/roles-module"
import { FielModule } from "@/components/fiel-module"
import { SacramentosModule } from "@/components/sacramentos-module"
import { EmisionCertificadosModule } from "@/components/emision-certificados-module"
import { BlockchainModule } from "@/components/blockchain-module"
import { DashboardOverview } from "@/components/dashboard-overview"
import { ProtectedRoute } from "@/components/protected-route"

/* MÓDULOS COMENTADOS - NO INCLUIDOS EN MVP */
// import { CertificatesModule } from "@/components/certificates-module" 
// import { SecurityModule } from "@/components/security-module"
// import { StatisticsModule } from "@/components/statistics-module"

export default function DashboardPage() {
    const [activeModule, setActiveModule] = useState("dashboard")
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const renderModule = () => {
        switch (activeModule) {
            case "users":
                return <UsersModule />
            case "roles":
                return <RolesModule />
            case "fieles":
                return <FielModule />
            case "sacramentos":
                return <SacramentosModule />
            case "emision-certificados":
                return <EmisionCertificadosModule />
            case "blockchain":
                return <BlockchainModule />

            /* CASOS COMENTADOS - NO INCLUIDOS EN MVP */
            // case "certificates":
            //   return <CertificatesModule />
            // case "security":
            //   return <SecurityModule />
            // case "statistics":
            //   return <StatisticsModule />

            default:
                return <DashboardOverview setActiveModule={setActiveModule} />
        }
    }

    return (
        <ProtectedRoute>
            <div className="flex h-screen bg-gray-50 overflow-hidden">
                <Sidebar
                    activeModule={activeModule}
                    setActiveModule={setActiveModule}
                    isMobileOpen={isMobileMenuOpen}
                    setIsMobileOpen={setIsMobileMenuOpen}
                />

                <div className="flex-1 flex flex-col overflow-hidden w-full">
                    <Header onMenuClick={() => setIsMobileMenuOpen(true)} />

                    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-3 sm:p-4 md:p-6">
                        {renderModule()}
                    </main>
                </div>
            </div>
        </ProtectedRoute>
    )
}

