import { Menu } from "@/components/template/menu"
import { MenuBer } from "@/components/template/menuber"
import { Sidebar } from "@/components/template/sideber"
import { DropdownMenuSeparator } from '@/components/ui/dropdown-menu';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <section className="w-full">
      
        <div className="grid grid-cols-12 mb-12">
            <div className="lg:col-span-12 col-span-12">
                <div className='flex justify-center mt-4 ' >
                    <div className='w-11/12' >
                         <MenuBer />
                         <DropdownMenuSeparator className=" bg-slate-300 mt-4"/>
                        {children}
                    </div>
                </div>
            </div>
        </div>


    </section>
}