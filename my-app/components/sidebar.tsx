"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Settings, Flag, Mail, LayoutDashboard } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function Sidebar() {
  const pathname = usePathname()

  const routes = [
    {
      name: "Dashboard",
      path: "/",
      icon: LayoutDashboard,
    },
    {
      name: "Review Queue",
      path: "/review",
      icon: Flag,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: Settings,
    },
  ]

  return (
    <div className="w-64 border-r bg-background h-screen flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold flex items-center">
          <Mail className="mr-2 h-6 w-6" />
          Burr
        </h1>
        <p className="text-sm text-muted-foreground">Email Routing System</p>
      </div>
      <div className="flex-1 px-3 py-2">
        <nav className="space-y-1">
          {routes.map((route) => (
            <Link key={route.path} href={route.path}>
              <Button variant="ghost" className={cn("w-full justify-start", pathname === route.path && "bg-muted")}>
                <route.icon className="mr-2 h-4 w-4" />
                {route.name}
              </Button>
            </Link>
          ))}
        </nav>
      </div>
      <div className="p-4 border-t">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
            JD
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium">John Doe</p>
            <p className="text-xs text-muted-foreground">Admin</p>
          </div>
        </div>
      </div>
    </div>
  )
}

