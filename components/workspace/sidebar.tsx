"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { 
  LayoutDashboard, 
  FolderKanban, 
  Clock, 
  CheckSquare, 
  Files, 
  Video, 
  Lightbulb, 
  MessageSquare, 
  Receipt, 
  LifeBuoy, 
  BookOpen, 
  Settings,
  Bell,
  Moon,
  Sun,
  ChevronDown,
  ChevronsUpDown
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Logo } from "@/components/agency/Logo"

const navItems = [
  { name: "Overview", href: "/admin", icon: LayoutDashboard },
  { name: "Projects", href: "/admin/projects", icon: FolderKanban },
  { name: "Timeline", href: "/admin/timeline", icon: Clock },
  { name: "Tasks", href: "/admin/tasks", icon: CheckSquare },
  { name: "Files", href: "/admin/files", icon: Files },
  { name: "Meetings", href: "/admin/meetings", icon: Video },
  { name: "Feature Requests", href: "/admin/requests", icon: Lightbulb },
  { name: "Messages", href: "/admin/messages", icon: MessageSquare },
  { name: "Invoices", href: "/admin/invoices", icon: Receipt },
]

const supportItems = [
  { name: "Support", href: "/admin/support", icon: LifeBuoy },
  { name: "Documentation", href: "/admin/docs", icon: BookOpen },
  { name: "Settings", href: "/admin/settings", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const [theme, setTheme] = useState<"light" | "dark">("light")

  // Sync theme state with DOM
  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark")
    setTheme(isDark ? "dark" : "light")
  }, [])

  const toggleTheme = () => {
    const root = document.documentElement
    if (theme === "light") {
      root.classList.add("dark")
      localStorage.setItem("theme", "dark")
      setTheme("dark")
    } else {
      root.classList.remove("dark")
      localStorage.setItem("theme", "light")
      setTheme("light")
    }
  }

  return (
    <aside className="fixed left-6 top-6 bottom-6 w-60 rounded-3xl border border-primary/16 bg-surface shadow-md flex flex-col p-4 transition-all duration-300">
      {/* Workspace Switcher */}
      <div className="flex h-12 items-center justify-between border-b border-primary/10 pb-3">
        <button className="flex w-full items-center justify-between rounded-2xl px-2 py-1.5 hover:bg-secondary/50 transition-colors">
          <div className="flex items-center gap-2.5">
            <Logo className="h-5 w-auto text-primary" />
            <div className="flex flex-col items-start text-left">
              <span className="text-xs font-bold tracking-[0.15em] uppercase text-primary font-mono leading-none">
                Triodev
              </span>
              <span className="text-[10px] text-muted tracking-wider leading-none mt-1">
                Admin
              </span>
            </div>
          </div>
          <ChevronsUpDown className="h-3.5 w-3.5 text-muted" />
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4 px-1 custom-scrollbar">
        <nav className="space-y-0.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-2xl px-3 py-2 text-xs font-semibold tracking-wide uppercase transition-colors",
                  isActive 
                    ? "bg-secondary text-primary" 
                    : "text-muted hover:bg-secondary/30 hover:text-foreground"
                )}
              >
                <item.icon className={cn("h-4 w-4", isActive ? "text-primary" : "text-muted")} />
                {item.name}
              </Link>
            )
          })}
        </nav>

        <div className="mt-6">
          <h4 className="mb-2 px-3 text-[9px] font-bold tracking-[0.2em] text-muted/60 uppercase font-mono">
            PREFERENCES
          </h4>
          <nav className="space-y-0.5">
            {supportItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-2xl px-3 py-2 text-xs font-semibold tracking-wide uppercase transition-colors",
                    isActive 
                      ? "bg-secondary text-primary" 
                      : "text-muted hover:bg-secondary/30 hover:text-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4 text-muted" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-primary/10 pt-3 flex flex-col gap-2">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-2">
            <button className="p-1.5 text-muted hover:text-foreground hover:bg-secondary/50 rounded-full transition-colors">
              <Bell className="h-4 w-4" />
            </button>
            <button 
              onClick={toggleTheme}
              className="p-1.5 text-muted hover:text-foreground hover:bg-secondary/50 rounded-full transition-colors"
            >
              {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </button>
          </div>
        </div>
        
        <button className="flex w-full items-center justify-between rounded-2xl px-2 py-1.5 hover:bg-secondary/50 transition-colors">
          <div className="flex items-center gap-2.5">
            <Avatar className="h-7 w-7">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>RC</AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start text-left">
              <span className="text-xs font-semibold leading-none text-foreground">Rahul Client</span>
              <span className="text-[10px] text-muted mt-1 leading-none">Acme Corp</span>
            </div>
          </div>
          <ChevronDown className="h-3.5 w-3.5 text-muted" />
        </button>
      </div>
    </aside>
  )
}
