"use client"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "../ui/button"
import Link from 'next/link';
import { usePathname } from "next/navigation"


interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
    const pathname = usePathname()
    return (
        <div className={cn("pb-12", className)}>
            <div className="space-y-4 py-4 h-full">
                <div className="px-3 py-2">
                    <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                        ค้นหา
                    </h2>
                    <div className="space-y-1">
                        <Link href="/homepage/searchBom">
                            <Button
                                variant={`${pathname === '/homepage/searchBom' ? 'secondary' : 'ghost'}`}
                                className="w-full justify-start"
                            >
                                ค้นหาแบบโครงสร้าง                                                                {/*  searchBom */}
                            </Button>
                        </Link>
                        <Link href="/homepage/searchItem" className="flex items-center">
                            <Button
                                variant={`${pathname === '/homepage/searchItem' ? 'secondary' : 'ghost'}`}
                                className="w-full justify-start "//docx
                            >
                                ค้นหาไอเท็ม
                            </Button>
                        </Link>
                        <Link href="/homepage/docx">
                            <Button
                                variant={`${pathname === '/homepage/docx' ? 'secondary' : (pathname === '/homepage/docx/ECO' ? 'secondary' : 'ghost')}`}
                                className="w-full justify-start"//docx
                            >
                                เอกสาร
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className="px-3 py-2">
                    <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                        ลงทะเบียนไอเท็ม
                    </h2>
                    <div className="space-y-1">
                        <Link href="/homepage/createBomExcel">
                            <Button
                                variant={`${pathname === '/homepage/createBomExcel' ? 'secondary' : 'ghost'}`}
                                className="w-full justify-start"
                            >
                                เพิ่มโมเดลใหม่ excel
                            </Button>
                        </Link>
                        <Link href="/homepage/createBomForm">
                            <Button
                                variant={`${pathname === '/homepage/createBomForm' ? 'secondary' : 'ghost'}`}
                                className="w-full justify-start"
                            >
                                เพิ่มไอเท็ม
                            </Button>
                        </Link>  
                        {/* <Link href="/homepage/relationBomFrom">
                            <Button
                                variant={`${pathname === '/homepage/relationBomFrom' ? 'secondary' : 'ghost'}`}
                                className="w-full justify-start"
                            >
                                ผูกไอเท็ม
                            </Button>
                        </Link> */}
                        <Link href="/homepage/reviseModel">
                            <Button
                                variant={`${pathname === '/homepage/reviseModel' ? 'secondary' : 'ghost'}`}
                                className="w-full justify-start"
                            >
                                แก้ไขโมเดล
                            </Button>
                        </Link>
                        <Link href="/homepage/send_documents">
                            <Button
                                variant={`${pathname === '/homepage/send_documents' ? 'secondary' : 'ghost'}`}
                                className="w-full justify-start"
                            >
                                ส่งผลทดสอบ
                            </Button>
                        </Link>
                        <Link href="/homepage/pack_STD">
                            <Button
                                variant={`${pathname === '/homepage/pack_STD' ? 'secondary' : 'ghost'}`}
                                className="w-full justify-start"
                            >
                                pack_setBox
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}//send_documents