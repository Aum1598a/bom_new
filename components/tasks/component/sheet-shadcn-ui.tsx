import { Button } from "@/components/ui/button"
import { CreateUrl } from "@/supabase/storage"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export const HoverCardTableItem = (data: any) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="h-8 w-16 bg-green-400 rounded border border-slate-300	">Open</DropdownMenuTrigger>
            <DropdownMenuContent className="px-6">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {data.data_test.map((item: any, index: number) => {
                    return (
                        <div key={index} >
                            <h4 className="text-md font-semibold">id work : {item.id_worktest}</h4>
                            <p className="text-sm">วันที่ส่งผลทดสอบ : {item.date_test}</p>
                            <div className="flex items-center pt-2">
                                <Button onClick={() => CreateUrl(item.docx_test, 'work_test')} className="max-w-[500px] truncate" style={{ background: '#3e7ce0' }}>
                                </Button>
                            </div>
                            <DropdownMenuSeparator />
                        </div>
                    )
                })}
            </DropdownMenuContent>
        </DropdownMenu>

    )
}

