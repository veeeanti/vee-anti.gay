
"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react"
import { useEffect, useState } from "react"

interface BlogPost {
  id: number
  title: string
  excerpt: string
  content: string
  tags: string[]
  published: boolean
  created_at: string
  updated_at: string
}

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/blog")
        const data = await res.json()
        setBlogPosts(data)
      } catch (e) {
        setBlogPosts([])
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  return (
    <div className="min-h-screen hl-background">
      <div className="fixed inset-0 circuit-overlay" />
      <div className="fixed inset-0 hex-pattern" />
      <div className="fixed inset-0 scan-lines" />

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="text-orange-400 hover:bg-orange-500/10 mb-4 font-mono">
              <ArrowLeft className="w-4 h-4 mr-2" />
              RETURN_TO_MAIN
            </Button>
          </Link>
          <div className="border-l-4 border-orange-500 pl-6">
            <h1 className="text-4xl font-bold text-white mb-2 font-mono holo-text">BLOG_SYSTEM</h1>
            <p className="text-xl text-orange-300 font-mono">Personal logs and technical documentation</p>
          </div>
        </div>

        {/* Blog Posts */}
        <div className="space-y-6">
          {loading ? (
            <div className="text-orange-400 font-mono">Loading...</div>
          ) : blogPosts.length === 0 ? (
            <div className="text-orange-400 font-mono">No blog posts found.</div>
          ) : (
            blogPosts.map((post) => (
              <Card
                key={post.id}
                className="hud-element hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500 transform hover:scale-[1.02]"
              >
                <CardHeader>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-orange-500/20 text-orange-300 border-orange-500/30 font-mono text-xs glow-border"
                      >
                        <Tag className="w-3 h-3 mr-1" />
                        {tag.toUpperCase()}
                      </Badge>
                    ))}
                  </div>
                  <CardTitle className="text-white text-2xl hover:text-orange-400 transition-colors font-mono">
                    <Link href={`/blog/${post.id}`}>{post.title}</Link>
                  </CardTitle>
                  <CardDescription className="text-gray-300 text-base leading-relaxed">{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-6 text-sm text-orange-400 mb-4 font-mono">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(post.created_at).toLocaleDateString()}
                    </div>
                  </div>
                  <Link href={`/blog/${post.id}`}>
                    <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-black font-mono font-bold shadow-lg shadow-orange-500/30">
                      READ_LOG
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
