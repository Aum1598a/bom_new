import { Menu } from "@/components/template/menu"
import { Sidebar } from "@/components/template/sideber"
import { ThemeProvider } from "@/components/template/theme-provider"
import { ToastContainer } from "react-toastify"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <ThemeProvider attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange>
        <section className="w-full">
            <Menu />
            <div className="border-t">
                <div className="grid grid-cols-12 mb-12">
                    <Sidebar className="hidden col-span-2 lg:block border-r top-10 h-full" />
                    <div className="lg:col-span-9 lg:col-start-3 col-span-12">
                        {children}
                    </div>
                </div>
                <ToastContainer />
            </div>
        </section>
    </ThemeProvider>
}