"use client"

import Link from "next/link"
import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const navItems = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
]

interface MainNavProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function MainNav({ open, setOpen }: MainNavProps) {
  return (
    <header className="fixed left-0 top-0 bottom-0 z-50 w-64 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 h-screen hidden md:block">
      <div className="container flex h-full flex-col py-4">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-4 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col w-64">
            <nav className="flex flex-col space-y-4 pt-10">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-lg font-medium transition-colors hover:text-primary"
                  onClick={() => setOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
        <nav className="hidden md:flex md:flex-col md:items-start md:gap-6 md:pl-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}