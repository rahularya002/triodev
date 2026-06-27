"use client"

import { useState } from "react"
import { PageHeader } from "@/components/workspace/shared"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { clientCompany } from "@/lib/client/data"
import { clientUsers } from "@/lib/client/data/users"
import { cn } from "@/lib/utils"
import { Building2, Users, Bell, Shield, Key, Palette } from "lucide-react"

const sections = [
  { id: "company", label: "Company Profile", icon: Building2 },
  { id: "users", label: "Users", icon: Users },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "password", label: "Password", icon: Key },
  { id: "appearance", label: "Appearance", icon: Palette },
]

export default function ClientSettingsPage() {
  const [active, setActive] = useState("company")
  const [emailNotifs, setEmailNotifs] = useState(true)
  const [twoFactor, setTwoFactor] = useState(false)

  return (
    <div className="pb-20">
      <PageHeader eyebrow="Client Portal" title="Settings" description="Manage your company profile, users, and preferences." />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="border-primary/16 bg-surface lg:col-span-1 h-fit">
          <CardContent className="p-2">
            {sections.map((s) => (
              <button key={s.id} type="button" onClick={() => setActive(s.id)}
                className={cn("w-full flex items-center gap-3 p-3 rounded-2xl text-left transition-colors mb-1 text-xs font-semibold tracking-wide uppercase",
                  active === s.id ? "bg-secondary text-primary" : "text-muted hover:bg-secondary/30 hover:text-foreground")}>
                <s.icon className="w-4 h-4" />{s.label}
              </button>
            ))}
          </CardContent>
        </Card>

        <Card className="border-primary/16 bg-surface lg:col-span-3">
          <CardHeader className="border-b border-primary/10">
            <CardTitle className="text-xs font-bold font-mono tracking-[0.2em] text-muted uppercase">
              {sections.find((s) => s.id === active)?.label}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {active === "company" && (
              <div className="space-y-4 max-w-md">
                <div><Label htmlFor="company">Company Name</Label><Input id="company" defaultValue={clientCompany.name} className="mt-2" /></div>
                <div><Label htmlFor="website">Website</Label><Input id="website" defaultValue={clientCompany.website} className="mt-2" /></div>
                <div><Label htmlFor="industry">Industry</Label><Input id="industry" defaultValue={clientCompany.industry} className="mt-2" /></div>
                <div><Label htmlFor="contact">Primary Contact</Label><Input id="contact" defaultValue={clientCompany.contactName} className="mt-2" /></div>
                <Button size="sm">Save Changes</Button>
              </div>
            )}
            {active === "users" && (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted">{clientUsers.length} users</span>
                  <Button size="sm">Invite User</Button>
                </div>
                {clientUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 rounded-2xl border border-primary/10 bg-secondary/30">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        {user.avatar ? <AvatarImage src={user.avatar} /> : null}
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm font-semibold">{user.name}</div>
                        <div className="text-[10px] font-mono text-muted">{user.email} • {user.role}</div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">Manage</Button>
                  </div>
                ))}
              </div>
            )}
            {active === "notifications" && (
              <div className="space-y-4 max-w-md">
                {[
                  { label: "Email Notifications", desc: "Project updates and approval requests", checked: emailNotifs, onChange: setEmailNotifs },
                  { label: "Meeting Reminders", desc: "15 minutes before scheduled meetings", checked: true, onChange: () => {} },
                  { label: "Invoice Alerts", desc: "When new invoices are issued", checked: true, onChange: () => {} },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between p-4 rounded-2xl border border-primary/10 bg-secondary/30">
                    <div><div className="text-sm font-semibold">{item.label}</div><div className="text-xs text-muted">{item.desc}</div></div>
                    <Switch checked={item.checked} onCheckedChange={item.onChange} />
                  </div>
                ))}
              </div>
            )}
            {active === "security" && (
              <div className="max-w-md">
                <div className="flex items-center justify-between p-4 rounded-2xl border border-primary/10 bg-secondary/30">
                  <div><div className="text-sm font-semibold">Two-Factor Authentication</div><div className="text-xs text-muted">Extra security for your account</div></div>
                  <Switch checked={twoFactor} onCheckedChange={setTwoFactor} />
                </div>
              </div>
            )}
            {active === "password" && (
              <div className="space-y-4 max-w-md">
                <div><Label htmlFor="current">Current Password</Label><Input id="current" type="password" className="mt-2" /></div>
                <div><Label htmlFor="new">New Password</Label><Input id="new" type="password" className="mt-2" /></div>
                <div><Label htmlFor="confirm">Confirm Password</Label><Input id="confirm" type="password" className="mt-2" /></div>
                <Button size="sm">Update Password</Button>
              </div>
            )}
            {active === "appearance" && (
              <div className="space-y-4 max-w-md">
                <div><Label>Theme</Label><Select className="mt-2"><option value="light">Light</option><option value="dark">Dark</option><option value="system">System</option></Select></div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
