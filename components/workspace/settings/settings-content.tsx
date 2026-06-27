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
import { teamMembers } from "@/lib/workspace/data/projects"
import { cn } from "@/lib/utils"
import {
  User, Building2, Bell, Shield, Users, Key, CreditCard, Palette, Plug, AlertTriangle,
} from "lucide-react"

const sections = [
  { id: "profile", label: "Profile", icon: User },
  { id: "company", label: "Company", icon: Building2 },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "members", label: "Members", icon: Users },
  { id: "api-keys", label: "API Keys", icon: Key },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "integrations", label: "Integrations", icon: Plug },
  { id: "danger", label: "Danger Zone", icon: AlertTriangle },
]

export function SettingsContent() {
  const [activeSection, setActiveSection] = useState("profile")
  const [emailNotifs, setEmailNotifs] = useState(true)
  const [pushNotifs, setPushNotifs] = useState(false)
  const [twoFactor, setTwoFactor] = useState(false)

  return (
    <div className="pb-20">
      <PageHeader
        eyebrow="Workspace"
        title="Settings"
        description="Manage your profile, company, notifications, and workspace preferences."
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="border-primary/16 bg-surface lg:col-span-1 h-fit">
          <CardContent className="p-2">
            {sections.map((section) => (
              <button
                key={section.id}
                type="button"
                onClick={() => setActiveSection(section.id)}
                className={cn(
                  "w-full flex items-center gap-3 p-3 rounded-2xl text-left transition-colors mb-1 text-xs font-semibold tracking-wide uppercase",
                  activeSection === section.id
                    ? "bg-secondary text-primary"
                    : "text-muted hover:bg-secondary/30 hover:text-foreground",
                  section.id === "danger" && activeSection === section.id && "text-red-600 dark:text-red-400"
                )}
              >
                <section.icon className="w-4 h-4" />
                {section.label}
              </button>
            ))}
          </CardContent>
        </Card>

        <Card className="border-primary/16 bg-surface lg:col-span-3">
          <CardHeader className="border-b border-primary/10">
            <CardTitle className="text-xs font-bold font-mono tracking-[0.2em] text-muted uppercase">
              {sections.find((s) => s.id === activeSection)?.label}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {activeSection === "profile" && (
              <div className="space-y-4 max-w-md">
                <div className="flex items-center gap-4 mb-6">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>RC</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm">Change Avatar</Button>
                </div>
                <div><Label htmlFor="name">Full Name</Label><Input id="name" defaultValue="Rahul Client" className="mt-2" /></div>
                <div><Label htmlFor="email">Email</Label><Input id="email" defaultValue="rahul@acmecorp.com" className="mt-2" /></div>
                <div><Label htmlFor="role">Role</Label><Input id="role" defaultValue="Client Admin" className="mt-2" disabled /></div>
                <Button size="sm">Save Changes</Button>
              </div>
            )}

            {activeSection === "company" && (
              <div className="space-y-4 max-w-md">
                <div><Label htmlFor="company">Company Name</Label><Input id="company" defaultValue="Acme Corp" className="mt-2" /></div>
                <div><Label htmlFor="website">Website</Label><Input id="website" defaultValue="https://acmecorp.com" className="mt-2" /></div>
                <div><Label htmlFor="industry">Industry</Label><Select id="industry" className="mt-2"><option>Technology</option><option>Finance</option><option>Healthcare</option></Select></div>
                <Button size="sm">Save Changes</Button>
              </div>
            )}

            {activeSection === "notifications" && (
              <div className="space-y-6 max-w-md">
                {[
                  { label: "Email Notifications", desc: "Receive email updates for project activity", checked: emailNotifs, onChange: setEmailNotifs },
                  { label: "Push Notifications", desc: "Browser push notifications for urgent items", checked: pushNotifs, onChange: setPushNotifs },
                  { label: "Meeting Reminders", desc: "Get reminded 15 minutes before meetings", checked: true, onChange: () => {} },
                  { label: "Invoice Alerts", desc: "Notifications when new invoices are issued", checked: true, onChange: () => {} },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between p-4 rounded-2xl border border-primary/10 bg-secondary/30">
                    <div>
                      <div className="text-sm font-semibold">{item.label}</div>
                      <div className="text-xs text-muted">{item.desc}</div>
                    </div>
                    <Switch checked={item.checked} onCheckedChange={item.onChange} />
                  </div>
                ))}
              </div>
            )}

            {activeSection === "security" && (
              <div className="space-y-4 max-w-md">
                <div className="flex items-center justify-between p-4 rounded-2xl border border-primary/10 bg-secondary/30">
                  <div>
                    <div className="text-sm font-semibold">Two-Factor Authentication</div>
                    <div className="text-xs text-muted">Add an extra layer of security</div>
                  </div>
                  <Switch checked={twoFactor} onCheckedChange={setTwoFactor} />
                </div>
                <div><Label htmlFor="current-pw">Current Password</Label><Input id="current-pw" type="password" className="mt-2" /></div>
                <div><Label htmlFor="new-pw">New Password</Label><Input id="new-pw" type="password" className="mt-2" /></div>
                <Button size="sm">Update Password</Button>
              </div>
            )}

            {activeSection === "members" && (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-muted">{teamMembers.length} team members</span>
                  <Button size="sm">Invite Member</Button>
                </div>
                {teamMembers.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-4 rounded-2xl border border-primary/10 bg-secondary/30">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback>{member.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm font-semibold">{member.name}</div>
                        <div className="text-[10px] font-mono text-muted uppercase">{member.role}</div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">Manage</Button>
                  </div>
                ))}
              </div>
            )}

            {activeSection === "api-keys" && (
              <div className="space-y-4 max-w-lg">
                <div className="p-4 rounded-2xl border border-primary/10 bg-secondary/30">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm font-semibold font-mono">td_live_••••••••4f2a</div>
                      <div className="text-[10px] font-mono text-muted">Created May 1, 2025</div>
                    </div>
                    <Button variant="outline" size="sm">Revoke</Button>
                  </div>
                </div>
                <Button size="sm">Generate New Key</Button>
              </div>
            )}

            {activeSection === "billing" && (
              <div className="space-y-4 max-w-md">
                <div className="p-5 rounded-2xl border border-primary/10 bg-secondary/30">
                  <div className="text-xs font-mono uppercase text-muted mb-1">Current Plan</div>
                  <div className="text-lg font-bold">Professional</div>
                  <div className="text-sm text-muted">$12,400/month • Billed per sprint</div>
                </div>
                <div><Label>Payment Method</Label><div className="mt-2 p-4 rounded-2xl border border-primary/10 bg-secondary/30 text-sm">Visa ending in 4242</div></div>
                <Button variant="outline" size="sm">Update Payment Method</Button>
              </div>
            )}

            {activeSection === "appearance" && (
              <div className="space-y-4 max-w-md">
                <div><Label>Theme</Label>
                  <Select className="mt-2"><option value="light">Light</option><option value="dark">Dark</option><option value="system">System</option></Select>
                </div>
                <div><Label>Language</Label>
                  <Select className="mt-2"><option value="en">English</option><option value="es">Spanish</option><option value="fr">French</option></Select>
                </div>
              </div>
            )}

            {activeSection === "integrations" && (
              <div className="space-y-3 max-w-md">
                {[
                  { name: "Google Calendar", connected: true },
                  { name: "Slack", connected: false },
                  { name: "GitHub", connected: true },
                  { name: "Stripe", connected: true },
                ].map((integration) => (
                  <div key={integration.name} className="flex items-center justify-between p-4 rounded-2xl border border-primary/10 bg-secondary/30">
                    <div className="text-sm font-semibold">{integration.name}</div>
                    {integration.connected ? (
                      <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 uppercase">Connected</span>
                    ) : (
                      <Button variant="outline" size="sm">Connect</Button>
                    )}
                  </div>
                ))}
              </div>
            )}

            {activeSection === "danger" && (
              <div className="space-y-4 max-w-md">
                <div className="p-5 rounded-2xl border border-red-500/20 bg-red-500/5">
                  <div className="text-sm font-bold text-red-600 dark:text-red-400 mb-2">Delete Workspace</div>
                  <p className="text-xs text-muted mb-4">Permanently delete this workspace and all associated data. This action cannot be undone.</p>
                  <Button variant="destructive" size="sm">Delete Workspace</Button>
                </div>
                <div className="p-5 rounded-2xl border border-red-500/20 bg-red-500/5">
                  <div className="text-sm font-bold text-red-600 dark:text-red-400 mb-2">Export Data</div>
                  <p className="text-xs text-muted mb-4">Download all your workspace data before leaving.</p>
                  <Button variant="outline" size="sm">Export All Data</Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
