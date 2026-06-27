"use client"

import { useState } from "react"
import { PageHeader } from "@/components/workspace/shared"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Upload, CheckCircle2, ArrowRight } from "lucide-react"

const featureOptions = [
  "User Authentication",
  "Dashboard & Analytics",
  "Mobile App",
  "Payment Integration",
  "Admin Panel",
  "API Integration",
  "Real-time Notifications",
  "File Management",
]

export default function ClientRequestPage() {
  const [submitted, setSubmitted] = useState(false)
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])

  const toggleFeature = (feature: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(feature) ? prev.filter((f) => f !== feature) : [...prev, feature]
    )
  }

  if (submitted) {
    return (
      <div className="pb-20 flex items-center justify-center min-h-[60vh]">
        <Card className="border-primary/16 bg-surface max-w-lg w-full text-center">
          <CardContent className="p-10">
            <div className="w-16 h-16 rounded-full bg-emerald-500/15 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground mb-2">Request Submitted</h2>
            <p className="text-sm text-muted mb-6 max-w-sm mx-auto">
              Thank you! Our team will review your project request and get back to you within 2 business days with a proposal.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="outline" size="sm" onClick={() => setSubmitted(false)}>
                Submit Another
              </Button>
              <Link href="/client/proposals">
                <Button size="sm" className="gap-2">
                  View Proposals <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="pb-20">
      <PageHeader
        eyebrow="Client Portal"
        title="Request New Project"
        description="Tell us about your next project. Our team will review and prepare a tailored proposal."
      />

      <Card className="border-primary/16 bg-surface max-w-2xl">
        <CardContent className="p-6 md:p-8 space-y-5">
          <div>
            <Label htmlFor="projectName">Project Name</Label>
            <Input id="projectName" placeholder="e.g. Customer Portal v2" className="mt-2" />
          </div>
          <div>
            <Label htmlFor="businessGoal">Business Goal</Label>
            <Input id="businessGoal" placeholder="What business outcome do you want to achieve?" className="mt-2" />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="Describe the project in detail..." className="mt-2" rows={4} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="timeline">Timeline</Label>
              <Select id="timeline" className="mt-2">
                <option value="">Select timeline</option>
                <option value="4-weeks">4 weeks</option>
                <option value="8-weeks">8 weeks</option>
                <option value="12-weeks">12 weeks</option>
                <option value="16-weeks">16+ weeks</option>
              </Select>
            </div>
            <div>
              <Label htmlFor="budget">Budget Range</Label>
              <Select id="budget" className="mt-2">
                <option value="">Select budget</option>
                <option value="5k-10k">$5,000 – $10,000</option>
                <option value="10k-25k">$10,000 – $25,000</option>
                <option value="25k-50k">$25,000 – $50,000</option>
                <option value="50k+">$50,000+</option>
              </Select>
            </div>
          </div>
          <div>
            <Label>Required Features</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {featureOptions.map((feature) => (
                <label key={feature} className="flex items-center gap-2 p-3 rounded-xl border border-primary/10 bg-secondary/30 cursor-pointer hover:border-primary/20 transition-colors">
                  <Checkbox
                    checked={selectedFeatures.includes(feature)}
                    onCheckedChange={() => toggleFeature(feature)}
                  />
                  <span className="text-xs font-semibold">{feature}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <Label htmlFor="referenceLinks">Reference Links</Label>
            <Input id="referenceLinks" placeholder="https://example.com/inspiration" className="mt-2" />
          </div>
          <div className="border-2 border-dashed border-primary/20 rounded-2xl p-6 text-center hover:border-primary/40 transition-colors cursor-pointer">
            <Upload className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-sm font-semibold text-foreground">Drop files or click to upload</p>
            <p className="text-xs text-muted mt-1">Briefs, wireframes, brand assets (max 25MB)</p>
          </div>
          <Button className="w-full gap-2" onClick={() => setSubmitted(true)}>
            Submit Project Request
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
