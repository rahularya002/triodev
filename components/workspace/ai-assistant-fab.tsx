"use client"

import { useState } from "react"
import { Bot, X, Send, Sparkles } from "lucide-react"

export function AIAssistantFab() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-background shadow-lg hover:scale-105 hover:bg-primary/90 transition-all"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Sparkles className="h-6 w-6" />}
        </button>
      </div>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[380px] rounded-2xl border border-border bg-surface p-0 shadow-2xl overflow-hidden flex flex-col h-[500px]">
          <div className="flex items-center gap-3 border-b border-border bg-secondary/30 p-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-background">
              <Bot className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">Triodev Assistant</h3>
              <p className="text-xs text-muted">Powered by AI</p>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 custom-scrollbar bg-background/30">
            <div className="flex justify-start">
              <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-secondary p-3 text-sm text-foreground border border-border">
                Hi Rahul! I'm your workspace assistant. How can I help you today? You can ask me to:
                <ul className="mt-2 space-y-1 list-disc pl-4 text-xs text-muted">
                  <li>Show pending tasks</li>
                  <li>Summarize project progress</li>
                  <li>Generate a status report</li>
                </ul>
              </div>
            </div>
            
            <div className="flex justify-end">
              <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-primary p-3 text-sm text-background">
                When will authentication be completed?
              </div>
            </div>
            
            <div className="flex justify-start">
              <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-secondary p-3 text-sm text-foreground border border-border">
                The authentication flow is currently 85% complete. The frontend integration is finished, and the backend team is finalizing the SSO implementation. It is on track to be delivered by tomorrow EOD.
              </div>
            </div>
          </div>
          
          <div className="border-t border-border p-3 bg-surface">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Ask anything..." 
                className="w-full rounded-xl border border-border bg-background py-3 pl-4 pr-12 text-sm focus:border-primary focus:outline-none text-foreground placeholder:text-muted"
              />
              <button className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg bg-primary text-background hover:bg-primary/90 transition-colors">
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
