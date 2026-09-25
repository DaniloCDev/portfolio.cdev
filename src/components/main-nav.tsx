"use client"

import Link from "next/link"
import { Menu, User, Wrench, FolderKanban, Mail, Milestone } from "lucide-react"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface MainNavProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function MainNav({ open, setOpen }: MainNavProps) {
  const t = useTranslations()

  const navItems = [
    { name: t("about"), href: "#about", icon: User },
    { name: t("trajectory"), href: "#trajectory", icon: Milestone },
    { name: t("projects"), href: "#projects", icon: FolderKanban },
    { name: t("skills"), href: "#skills", icon: Wrench },
    { name: t("getTouch"), href: "#contact", icon: Mail },
  ]

  return (
    <>
      <header className="fixed left-0 top-0 z-50 flex h-14 w-full items-center bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">{t("toggleMenu")}</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col w-64">
            <nav className="flex flex-col space-y-4 pt-10">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 text-lg font-medium transition-colors hover:text-primary"
                  onClick={() => setOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </header>
      <header className="fixed left-0 top-0 bottom-0 z-50 hidden h-screen w-64 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:block">
        <div className="container flex h-full flex-col py-4">
          <nav className="flex md:flex-col md:items-start md:gap-6 md:pl-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </header>
    </>
  )
}