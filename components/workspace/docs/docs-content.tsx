"use client"

import { useState, useMemo } from "react"
import { PageHeader, SearchBar } from "@/components/workspace/shared"
import { docCategories } from "@/lib/workspace/data/docs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Rocket, Code, BookOpen, Server, Tag, HelpCircle, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Rocket, Code, BookOpen, Server, Tag, HelpCircle,
}

export function DocsContent() {
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState(docCategories[0].id)
  const [selectedArticle, setSelectedArticle] = useState(docCategories[0].articles[0].id)
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null)

  const category = docCategories.find((c) => c.id === selectedCategory)!
  const article = category.articles.find((a) => a.id === selectedArticle) ?? category.articles[0]

  const searchResults = useMemo(() => {
    if (!search) return null
    const results: { category: string; article: typeof article }[] = []
    docCategories.forEach((cat) => {
      cat.articles.forEach((art) => {
        if (
          art.title.toLowerCase().includes(search.toLowerCase()) ||
          art.content.toLowerCase().includes(search.toLowerCase())
        ) {
          results.push({ category: cat.name, article: art })
        }
      })
    })
    return results
  }, [search])

  const isFaq = selectedCategory === "faq"

  return (
    <div className="pb-20">
      <PageHeader
        eyebrow="Workspace"
        title="Documentation"
        description="Guides, API docs, deployment notes, release notes, and FAQs."
      />

      <SearchBar value={search} onChange={setSearch} placeholder="Search documentation..." className="mb-6 max-w-md" />

      {searchResults && search.length > 0 && (
        <Card className="mb-6 border-primary/16 bg-surface">
          <CardContent className="p-4 divide-y divide-primary/10">
            {searchResults.length === 0 ? (
              <p className="text-sm text-muted py-4 text-center">No results found.</p>
            ) : (
              searchResults.map(({ category: catName, article: art }) => (
                <button
                  key={art.id}
                  type="button"
                  onClick={() => {
                    const cat = docCategories.find((c) => c.articles.some((a) => a.id === art.id))
                    if (cat) {
                      setSelectedCategory(cat.id)
                      setSelectedArticle(art.id)
                      setSearch("")
                    }
                  }}
                  className="w-full text-left py-3 hover:bg-secondary/30 transition-colors rounded-xl px-2"
                >
                  <div className="text-sm font-semibold">{art.title}</div>
                  <div className="text-[10px] font-mono text-muted">{catName}</div>
                </button>
              ))
            )}
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="border-primary/16 bg-surface lg:col-span-1">
          <CardHeader className="border-b border-primary/10">
            <CardTitle className="text-xs font-bold font-mono tracking-[0.2em] text-muted uppercase">Categories</CardTitle>
          </CardHeader>
          <CardContent className="p-2">
            {docCategories.map((cat) => {
              const Icon = iconMap[cat.icon] ?? BookOpen
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(cat.id)
                    setSelectedArticle(cat.articles[0].id)
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 p-3 rounded-2xl text-left transition-colors mb-1",
                    selectedCategory === cat.id
                      ? "bg-secondary text-primary"
                      : "text-muted hover:bg-secondary/30 hover:text-foreground"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-xs font-semibold tracking-wide uppercase">{cat.name}</span>
                </button>
              )
            })}
          </CardContent>
        </Card>

        <div className="lg:col-span-1">
          <Card className="border-primary/16 bg-surface">
            <CardHeader className="border-b border-primary/10">
              <CardTitle className="text-xs font-bold font-mono tracking-[0.2em] text-muted uppercase">Articles</CardTitle>
            </CardHeader>
            <CardContent className="p-2">
              {category.articles.map((art) => (
                <button
                  key={art.id}
                  type="button"
                  onClick={() => setSelectedArticle(art.id)}
                  className={cn(
                    "w-full text-left p-3 rounded-2xl transition-colors mb-1 text-sm",
                    selectedArticle === art.id
                      ? "bg-secondary/50 font-semibold text-foreground"
                      : "text-muted hover:bg-secondary/30"
                  )}
                >
                  {art.title}
                </button>
              ))}
            </CardContent>
          </Card>
        </div>

        <Card className="border-primary/16 bg-surface lg:col-span-2">
          <CardHeader className="border-b border-primary/10">
            <CardTitle className="text-lg font-bold">{article.title}</CardTitle>
            <p className="text-[10px] font-mono text-muted">Updated {article.updatedAt}</p>
          </CardHeader>
          <CardContent className="p-6">
            {isFaq ? (
              <div className="space-y-2">
                {category.articles.map((faq) => (
                  <div key={faq.id} className="border border-primary/10 rounded-2xl overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-secondary/30 transition-colors"
                    >
                      <span className="text-sm font-semibold">{faq.title}</span>
                      <ChevronDown className={cn("w-4 h-4 text-muted transition-transform", expandedFaq === faq.id && "rotate-180")} />
                    </button>
                    {expandedFaq === faq.id && (
                      <div className="px-4 pb-4 text-sm text-muted leading-relaxed">{faq.content}</div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="prose prose-sm max-w-none text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                {article.content.split("\n").map((line, i) => {
                  if (line.startsWith("# ")) return <h1 key={i} className="text-2xl font-bold mt-6 mb-3">{line.slice(2)}</h1>
                  if (line.startsWith("## ")) return <h2 key={i} className="text-lg font-bold mt-4 mb-2">{line.slice(3)}</h2>
                  if (line.startsWith("```")) return null
                  if (line.startsWith("- ")) return <li key={i} className="ml-4 text-muted">{line.slice(2)}</li>
                  if (line.startsWith("**") && line.endsWith("**")) return <p key={i} className="font-bold mt-3">{line.slice(2, -2)}</p>
                  if (line.trim() === "") return <br key={i} />
                  return <p key={i} className="text-muted mb-2">{line}</p>
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
