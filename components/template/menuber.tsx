"use client"
import {
    Menubar,
} from "@/components/ui/menubar"
import { Button } from "@/components/ui/button"
import Link from 'next/link';
import { usePathname } from "next/navigation";


export function MenuBer() {
    const pathname = usePathname()

    return (
        <div className="space-between flex items-center">
            <Menubar className="h-13">
                <Link href="/homepage/docx">
                    <Button
                        variant={`${pathname === '/homepage/docx' ? 'secondary' : 'ghost'}`}
                        className="w-auto justify-start"
                    >
                        เอกสารทดสอบ
                    </Button>
                </Link>
                <Link href="/homepage/docx/ECO">
                    <Button
                        variant={`${pathname === '/homepage/docx/ECO' ? 'secondary' : 'ghost'}`}
                        className="w-auto justify-start "
                    >
                        เอกสารECO
                    </Button>
                </Link>
            </Menubar>
        </div>
    )
}

export function MenuBerPack() {
    const pathname = usePathname()

    return (
        <div className="space-between flex items-center">
            <Menubar className="h-13">
                <Link href="/homepage/pack_setBox">
                    <Button
                        variant={`${pathname === '/homepage/pack_setBox' ? 'secondary' : 'ghost'}`}
                        className="w-auto justify-start"
                    >
                        กำหนดขนาดกล่อง
                    </Button>
                </Link>
                <Link href="/homepage/pack_setBox/pack_STD">
                    <Button
                        variant={`${pathname === '/homepage/pack_setBox/pack_STD' ? 'secondary' : 'ghost'}`}
                        className="w-auto justify-start "
                    >
                        กำหนดจำนวนการแพ็ค
                    </Button>
                </Link>
            </Menubar>
        </div>
    )
}