"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import Link from "next/link"

import { usePathname } from "next/navigation"

export function SheetSide() {
    const pathname = usePathname()

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost"><Menu /></Button>
            </SheetTrigger>
            <SheetContent className="w-[280px]" side='left'>
                <div className="space-y-4 ">
                    <div className="py-2">
                        <h2 className="mb-2  text-lg font-semibold tracking-tight">
                            ค้นหา
                        </h2>
                        <div className="space-y-1">
                            <SheetClose asChild >
                                <Link href="/homepage/searchBom" className="w-full">
                                    <Button
                                        variant={`${pathname === '/homepage/searchBom' ? 'secondary' : 'ghost'}`}
                                        className="w-full justify-start "
                                    >
                                        ค้นหาแบบโครงสร้าง                                                                {/*  searchBom */}
                                    </Button>
                                </Link>
                            </SheetClose>
                            <SheetClose asChild >
                                <Link href="/homepage/searchItem" className="flex items-center w-full">
                                    <Button
                                        variant={`${pathname === '/homepage/searchItem' ? 'secondary' : 'ghost'}`}
                                        className="w-full justify-start "//docx
                                    >
                                        ค้นหาไอเท็ม
                                    </Button>
                                </Link>
                            </SheetClose>
                            <SheetClose asChild >
                                <Link href="/homepage/docx" className="w-full">
                                    <Button
                                        variant={`${pathname === '/homepage/docx' ? 'secondary' : (pathname === '/homepage/docx/ECO' ? 'secondary' : 'ghost')}`}
                                        className="w-full justify-start"//docx
                                    >
                                        เอกสาร
                                    </Button>
                                </Link>
                            </SheetClose>
                        </div>
                    </div>
                    <div className="py-2">
                        <h2 className="mb-2  text-lg font-semibold tracking-tight">
                            ลงทะเบียนไอเท็ม
                        </h2>
                        <div className="space-y-1">
                            <SheetClose asChild >
                                <Link href="/homepage/createBomExcel" className="w-full">
                                    <Button
                                        variant={`${pathname === '/homepage/createBomExcel' ? 'secondary' : 'ghost'}`}
                                        className="w-full justify-start"
                                    >
                                        เพิ่มโมเดลใหม่ excel
                                    </Button>
                                </Link>
                            </SheetClose>
                            <SheetClose asChild >
                                <Link href="/homepage/createBomForm" className="w-full">
                                    <Button
                                        variant={`${pathname === '/homepage/createBomForm' ? 'secondary' : 'ghost'}`}
                                        className="w-full justify-start"
                                    >
                                        เพิ่มไอเท็ม
                                    </Button>
                                </Link>
                            </SheetClose>
                            {/* <Link href="/homepage/relationBomFrom">
                            <Button
                                variant={`${pathname === '/homepage/relationBomFrom' ? 'secondary' : 'ghost'}`}
                                className="w-full justify-start"
                            >
                                <TbCirclesRelation size={24} color="000" className="mr-2 h-4 w-4" />
                                ผูกไอเท็ม
                            </Button>
                        </Link> */}
                            <SheetClose asChild >
                                <Link href="/homepage/reviseModel" className="w-full">
                                    <Button
                                        variant={`${pathname === '/homepage/reviseModel' ? 'secondary' : 'ghost'}`}
                                        className="w-full justify-start"
                                    >
                                        แก้ไขโมเดล
                                    </Button>
                                </Link>
                            </SheetClose>
                            <SheetClose asChild >
                            <Link href="/homepage/send_documents" className="w-full">
                                <Button
                                    variant={`${pathname === '/homepage/send_documents' ? 'secondary' : 'ghost'}`}
                                    className="w-full justify-start"
                                >
                                    ส่งผลทดสอบ
                                </Button>
                            </Link>
                            </SheetClose>
                            <SheetClose>

                           
                            <Link href="/homepage/pack_STD">
                            <Button
                                variant={`${pathname === '/homepage/pack_STD' ? 'secondary' : 'ghost'}`}
                                className="w-full justify-start"
                            >
                                pack_setBox
                            </Button>
                        </Link> </SheetClose>
                        </div>
                    </div>
                </div>
            </SheetContent>
        </Sheet>

    )
}
