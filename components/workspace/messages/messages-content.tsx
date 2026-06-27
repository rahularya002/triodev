"use client"

import { useState } from "react"
import { PageHeader, SearchBar } from "@/components/workspace/shared"
import { conversations, getMessagesByConversation } from "@/lib/workspace/data/messages"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Pin, Send, Paperclip, Image as ImageIcon, Code } from "lucide-react"
import { cn } from "@/lib/utils"

export function MessagesContent() {
  const [selectedConv, setSelectedConv] = useState(conversations[0].id)
  const [search, setSearch] = useState("")
  const [message, setMessage] = useState("")
  const [typing] = useState(false)

  const filteredConversations = conversations.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  )

  const messages = getMessagesByConversation(selectedConv)
  const currentConv = conversations.find((c) => c.id === selectedConv)

  return (
    <div className="pb-20">
      <PageHeader
        eyebrow="Workspace"
        title="Messages"
        description="Communicate with your development team in real-time."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-280px)] min-h-[500px]">
        <Card className="border-primary/16 bg-surface lg:col-span-1 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-primary/10">
            <SearchBar value={search} onChange={setSearch} placeholder="Search conversations..." />
          </div>
          <CardContent className="p-0 flex-1 overflow-y-auto custom-scrollbar">
            {filteredConversations.map((conv) => (
              <button
                key={conv.id}
                type="button"
                onClick={() => setSelectedConv(conv.id)}
                className={cn(
                  "w-full flex items-center gap-3 p-4 hover:bg-secondary/30 transition-colors text-left border-b border-primary/5",
                  selectedConv === conv.id && "bg-secondary/50"
                )}
              >
                <div className="relative">
                  <Avatar className="w-10 h-10">
                    {conv.avatar ? <AvatarImage src={conv.avatar} /> : null}
                    <AvatarFallback>{conv.name[0]}</AvatarFallback>
                  </Avatar>
                  {conv.online && (
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-surface" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold truncate flex items-center gap-1">
                      {conv.pinned && <Pin className="w-3 h-3 text-primary shrink-0" />}
                      {conv.name}
                    </span>
                    <span className="text-[10px] font-mono text-muted shrink-0">{conv.lastMessageAt}</span>
                  </div>
                  <p className="text-xs text-muted truncate mt-0.5">{conv.lastMessage}</p>
                </div>
                {conv.unread > 0 && (
                  <span className="bg-primary text-background text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shrink-0">
                    {conv.unread}
                  </span>
                )}
              </button>
            ))}
          </CardContent>
        </Card>

        <Card className="border-primary/16 bg-surface lg:col-span-2 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-primary/10 flex items-center gap-3">
            <Avatar className="w-8 h-8">
              {currentConv?.avatar ? <AvatarImage src={currentConv.avatar} /> : null}
              <AvatarFallback>{currentConv?.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <div className="text-sm font-semibold">{currentConv?.name}</div>
              {currentConv?.online && <div className="text-[10px] text-emerald-600 dark:text-emerald-400">Online</div>}
            </div>
          </div>

          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-background/30">
            {messages.map((msg) => (
              <div key={msg.id} className={cn("flex", msg.senderId === "client" ? "justify-end" : "justify-start")}>
                <div className={cn(
                  "max-w-[75%] rounded-2xl p-3 text-sm",
                  msg.senderId === "client"
                    ? "bg-primary text-background rounded-tr-sm"
                    : "bg-secondary border border-primary/10 text-foreground rounded-tl-sm",
                  msg.pinned && "ring-2 ring-primary/30"
                )}>
                  {msg.pinned && (
                    <div className="flex items-center gap-1 text-[10px] font-mono uppercase mb-1 opacity-70">
                      <Pin className="w-3 h-3" /> Pinned
                    </div>
                  )}
                  {msg.type === "code" ? (
                    <pre className="text-xs font-mono overflow-x-auto whitespace-pre-wrap">{msg.content}</pre>
                  ) : (
                    <p>{msg.content}</p>
                  )}
                  <div className="text-[10px] font-mono mt-1 opacity-60">{msg.createdAt}</div>
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="bg-secondary border border-primary/10 rounded-2xl rounded-tl-sm p-3 flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-muted animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 rounded-full bg-muted animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 rounded-full bg-muted animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
          </CardContent>

          <div className="p-3 border-t border-primary/10">
            <div className="flex items-center gap-2 mb-2">
              <button type="button" className="p-1.5 text-muted hover:text-foreground rounded-full hover:bg-secondary/50"><Paperclip className="w-4 h-4" /></button>
              <button type="button" className="p-1.5 text-muted hover:text-foreground rounded-full hover:bg-secondary/50"><ImageIcon className="w-4 h-4" /></button>
              <button type="button" className="p-1.5 text-muted hover:text-foreground rounded-full hover:bg-secondary/50"><Code className="w-4 h-4" /></button>
            </div>
            <div className="relative">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="pr-12"
              />
              <button type="button" className="absolute right-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-background hover:brightness-110">
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
