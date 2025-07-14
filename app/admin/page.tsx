"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Plus, Edit, Trash2, Shield, Terminal, Lock, Eye, EyeOff } from "lucide-react"
import { ProjectForm } from "@/components/project-form"
import type { Project } from "@/lib/types"

// Admin authentication now uses a secure secret from the server, not a hardcoded password

// Remove all references to ADMIN_PASSWORD_HASH and use a local state for password, but do not check it client-side.

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loginError, setLoginError] = useState("")
  const [activeTab, setActiveTab] = useState("projects")
  const [projects, setProjects] = useState<Project[]>([])
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if already authenticated in session
    const authStatus = sessionStorage.getItem("admin_authenticated")
    if (authStatus === "true") {
      setIsAuthenticated(true)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    if (isAuthenticated && activeTab === "projects") {
      fetchProjects()
    }
  }, [isAuthenticated, activeTab])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        setIsAuthenticated(true);
        sessionStorage.setItem("admin_authenticated", "true");
        setPassword("");
      } else {
        const data = await res.json();
        setLoginError(data.error || "ACCESS_DENIED: Invalid credentials");
        setPassword("");
      }
    } catch (err) {
      setLoginError("Server error. Please try again later.");
      setPassword("");
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem("admin_authenticated")
    setPassword("")
  }

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/projects")
      const data = await response.json()
      setProjects(data)
      setLoading(false)
    } catch (error) {
      console.error("Failed to fetch projects:", error)
      setLoading(false)
    }
  }

  const handleSaveProject = async (projectData: Partial<Project>) => {
    try {
      const url = editingProject ? `/api/projects/${editingProject.id}` : "/api/projects"
      const method = editingProject ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectData),
      })

      if (response.ok) {
        await fetchProjects()
        setShowForm(false)
        setEditingProject(null)
      }
    } catch (error) {
      console.error("Failed to save project:", error)
    }
  }

  const handleDeleteProject = async (id: number) => {
    if (confirm("CONFIRM: Delete this project from the archive?")) {
      try {
        const response = await fetch(`/api/projects/${id}`, {
          method: "DELETE",
        })

        if (response.ok) {
          await fetchProjects()
        }
      } catch (error) {
        console.error("Failed to delete project:", error)
      }
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "beta":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "stable":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "archived":
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
      default:
        return "bg-orange-500/20 text-orange-400 border-orange-500/30"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString)
      .toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\//g, ".")
  }

  if (loading) {
    return (
      <div className="min-h-screen hl-background flex items-center justify-center">
        <div className="fixed inset-0 circuit-overlay" />
        <div className="fixed inset-0 hex-pattern" />
        <div className="fixed inset-0 scan-lines" />
        <div className="relative z-10 text-orange-400 font-mono text-xl loading-dots">INITIALIZING SYSTEM</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen hl-background">
        <div className="fixed inset-0 circuit-overlay" />
        <div className="fixed inset-0 hex-pattern" />
        <div className="fixed inset-0 scan-lines" />

        <div className="relative z-10 container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
          <Card className="w-full max-w-md hud-element">
            <CardHeader className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-red-500/30 to-red-600/30 rounded flex items-center justify-center glow-border">
                <Lock className="w-8 h-8 text-red-400" />
              </div>
              <CardTitle className="text-white font-mono text-2xl">RESTRICTED_ACCESS</CardTitle>
              <CardDescription className="text-red-300 font-mono">Administrative privileges required</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="password" className="text-orange-400 font-mono">
                    ACCESS_CODE
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter admin password..."
                      className="bg-gray-800 border-orange-500/30 text-white font-mono focus:border-orange-500 pr-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-orange-400 hover:text-orange-300"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                {loginError && (
                  <div className="text-red-400 font-mono text-sm text-center bg-red-500/10 p-2 rounded glow-border">
                    {loginError}
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-black font-mono font-bold"
                >
                  <Shield className="w-4 h-4 mr-2" />
                  AUTHENTICATE
                </Button>
              </form>

              <div className="mt-6 text-center">
                <Link href="/">
                  <Button
                    variant="outline"
                    className="glow-border text-orange-400 hover:bg-orange-500/20 bg-transparent font-mono"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    RETURN_TO_MAIN
                  </Button>
                </Link>
              </div>

              <div className="mt-4 text-xs text-gray-500 font-mono text-center">
                Password hint: veeanti_admin_2024_secure_hash_xyz789
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen hl-background">
      <div className="fixed inset-0 circuit-overlay" />
      <div className="fixed inset-0 hex-pattern" />
      <div className="fixed inset-0 scan-lines" />

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <Link href="/">
              <Button variant="ghost" className="text-orange-400 hover:bg-orange-500/10 font-mono">
                <ArrowLeft className="w-4 h-4 mr-2" />
                EXIT_ADMIN_MODE
              </Button>
            </Link>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="glow-border text-red-400 hover:bg-red-500/20 bg-transparent font-mono"
            >
              <Lock className="w-4 h-4 mr-2" />
              LOGOUT
            </Button>
          </div>
          <div className="border-l-4 border-orange-500 pl-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500/30 to-orange-600/30 rounded flex items-center justify-center glow-border animate-pulse-orange">
                <Shield className="w-4 h-4 text-orange-400" />
              </div>
              <h1 className="text-4xl font-bold text-white font-mono holo-text">ADMIN_CONSOLE</h1>
            </div>
            <p className="text-xl text-orange-300 font-mono">Content management and system administration</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8">
          <Button
            variant={activeTab === "projects" ? "default" : "outline"}
            className={
              activeTab === "projects"
                ? "bg-gradient-to-r from-orange-500 to-orange-600 text-black font-mono font-bold"
                : "glow-border text-orange-400 hover:bg-orange-500/20 bg-transparent font-mono"
            }
            onClick={() => setActiveTab("projects")}
          >
            <Terminal className="w-4 h-4 mr-2" />
            PROJECTS
          </Button>
          <Button
            variant={activeTab === "posts" ? "default" : "outline"}
            className={
              activeTab === "posts"
                ? "bg-gradient-to-r from-orange-500 to-orange-600 text-black font-mono font-bold"
                : "glow-border text-orange-400 hover:bg-orange-500/20 bg-transparent font-mono"
            }
            onClick={() => setActiveTab("posts")}
          >
            <Terminal className="w-4 h-4 mr-2" />
            BLOG_POSTS
          </Button>
        </div>

        {/* Projects Tab */}
        {activeTab === "projects" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white font-mono">PROJECT_MANAGEMENT</h2>
              <Button
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-black font-mono font-bold shadow-lg shadow-green-500/30"
                onClick={() => {
                  setEditingProject(null)
                  setShowForm(true)
                }}
              >
                <Plus className="w-4 h-4 mr-2" />
                CREATE_NEW_PROJECT
              </Button>
            </div>

            {showForm && (
              <div className="mb-6">
                <ProjectForm
                  project={editingProject || undefined}
                  onSave={handleSaveProject}
                  onCancel={() => {
                    setShowForm(false)
                    setEditingProject(null)
                  }}
                />
              </div>
            )}

            {/* Projects List */}
            <div className="space-y-4">
              {loading ? (
                <div className="text-center text-orange-400 font-mono loading-dots">LOADING_PROJECTS</div>
              ) : (
                projects.map((project) => (
                  <Card
                    key={project.id}
                    className="hud-element hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500"
                  >
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <CardTitle className="text-white font-mono">{project.title}</CardTitle>
                            <Badge className={`${getStatusColor(project.status)} font-mono text-xs glow-border`}>
                              {project.status.toUpperCase()}
                            </Badge>
                            <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30 font-mono text-xs glow-border">
                              {project.category.toUpperCase()}
                            </Badge>
                          </div>
                          <CardDescription className="text-gray-300 mb-2">{project.description}</CardDescription>
                          <div className="flex flex-wrap gap-1 mb-2">
                            {project.tags.map((tag) => (
                              <Badge
                                key={tag}
                                variant="outline"
                                className="border-orange-500/30 text-orange-400 font-mono text-xs glow-border"
                              >
                                {tag.toUpperCase()}
                              </Badge>
                            ))}
                          </div>
                          <div className="text-xs text-orange-400 font-mono">
                            CREATED: {formatDate(project.created_at)} | UPDATED: {formatDate(project.updated_at)}
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Button
                            size="sm"
                            variant="outline"
                            className="glow-border text-orange-400 hover:bg-orange-500/20 bg-transparent font-mono"
                            onClick={() => {
                              setEditingProject(project)
                              setShowForm(true)
                            }}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-red-500/30 text-red-400 hover:bg-red-500/20 bg-transparent font-mono"
                            onClick={() => handleDeleteProject(project.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))
              )}
            </div>
          </div>
        )}

        {/* Blog Posts Tab */}
        {activeTab === "posts" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white font-mono">BLOG_POST_MANAGEMENT</h2>
              <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-black font-mono font-bold shadow-lg shadow-green-500/30">
                <Plus className="w-4 h-4 mr-2" />
                CREATE_NEW_POST
              </Button>
            </div>
            <div className="text-center text-orange-400 font-mono loading-dots">BLOG_MANAGEMENT_COMING_SOON</div>
          </div>
        )}
      </div>
    </div>
  )
}
