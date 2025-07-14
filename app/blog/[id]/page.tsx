"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Clock, Tag, FileText } from "lucide-react"


import { useEffect, useState } from "react"

interface BlogPost {
  id: number
  title: string
  content: string
  excerpt: string
  tags: string[]
  published: boolean
  created_at: string
  updated_at: string
}
export default function BlogPostPage({ params }: { params: { id: string } }) {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/blog/${params.id}`)
        if (!res.ok) throw new Error("Not found")
        const data = await res.json()
        setPost(data)
      } catch (e) {
        setPost(null)
      } finally {
        setLoading(false)
      }
    }
    fetchPost()
  }, [params.id])

  if (loading) {
    return <div className="text-orange-400 font-mono p-8">Loading...</div>
  }
  if (!post) {
    return <div className="text-orange-400 font-mono p-8">Blog post not found.</div>
  }

  return (
    <div className="min-h-screen hl-background">
      <div className="fixed inset-0 circuit-overlay" />
      <div className="fixed inset-0 hex-pattern" />
      <div className="fixed inset-0 scan-lines" />

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
        {/* Navigation */}
        <Link href="/blog">
          <Button variant="ghost" className="text-orange-400 hover:bg-orange-500/10 mb-8 font-mono">
            <ArrowLeft className="w-4 h-4 mr-2" />
            RETURN_TO_BLOG
          </Button>
        </Link>

        {/* Article Header */}
        <article className="hud-element rounded-lg overflow-hidden">
          <header className="p-8 border-b border-orange-500/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500/30 to-orange-600/30 rounded flex items-center justify-center glow-border">
                <FileText className="w-4 h-4 text-orange-400" />
              </div>
              <span className="text-orange-400 font-mono text-sm">BLOG_POST_ENTRY</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <Badge
                  key={tag}
                  className="bg-orange-500/20 text-orange-300 border-orange-500/30 font-mono text-xs glow-border"
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {tag.toUpperCase()}
                </Badge>
              ))}
            </div>

            <h1 className="text-4xl font-bold text-white mb-6 leading-tight font-mono holo-text">{post.title}</h1>

            <div className="flex items-center gap-6 text-orange-400 font-mono text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                PUBLISHED:{" "}
                {new Date(post.created_at)
                  .toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })
                  .replace(/\//g, ".")}
              </div>
            </div>
          </header>

          {/* Article Content */}
          <div className="p-8">
            <div className="prose prose-lg prose-invert max-w-none">
              <div className="text-gray-300 leading-relaxed whitespace-pre-line font-mono text-sm">{post.content}</div>
            </div>
          </div>
        </article>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            className="glow-border text-orange-400 hover:bg-orange-500/20 bg-transparent font-mono"
          >
            ← PREVIOUS_LOG
          </Button>
          <Button
            variant="outline"
            className="glow-border text-orange-400 hover:bg-orange-500/20 bg-transparent font-mono"
          >
            NEXT_LOG →
          </Button>
        </div>
      </div>

    </div>
  )
}
