'use client'
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar"
import Link from 'next/link';
import { SheetSide } from "./SheetSideber";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from 'next/navigation'
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { CheckStatusTest } from '@/components/functions';

import {
  Moon,
  Sun,
  LogOut,
  User,
} from "lucide-react"
import { SignOut } from "@/supabase/loginDataSB";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from '@/app/lib/database.types'

export function Menu() {
  const supabase = createClientComponentClient<Database>()
  const router = useRouter()
  const { setTheme } = useTheme()
  CheckStatusTest()
  const handleonClick = async () => {
    await supabase.auth.signOut()
    router.refresh()

    // let result = await SignOut()
    // console.log(result);
    
    // result === 'success' ? router.push('/') : null
  }
  return (
    // <Menubar className="rounded-none border-b border-none px-2 lg:px-4 fixed z-50 ">
    <Menubar className="supports-backdrop-blur:bg-background/60 sticky top-0 z-50 h-12 w-full bg-background/95 backdrop-blur">
      <MenubarMenu>
        <div className="grid grid-cols-2 w-full items-center">
          <div>
            <div className="block lg:hidden"><SheetSide /> </div>
            <MenubarTrigger className="font-bold hidden lg:block"><Link href="/homepage">หน้าหลัก</Link></MenubarTrigger>
          </div>
          <div className="flex justify-end w-11/12 ">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-person-fill cursor-pointer	" viewBox="0 0 16 16">
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                  </svg>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <Link href="/Auth/profile">
                    <DropdownMenuItem className="cursor-pointer">

                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>

                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuGroup>
                <DropdownMenuItem className="cursor-pointer" onClick={handleonClick}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </MenubarMenu>
    </Menubar>
  )
}
// supports-backdrop-blur:bg-background/60 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur