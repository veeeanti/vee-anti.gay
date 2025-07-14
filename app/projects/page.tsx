import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Download, Github, ExternalLink, Smartphone, Code } from "lucide-react"

// Mock project data
const projects = [
  {
    id: 1,
    title: "Custom ROM Manager",
    description: "A simple tool to manage and flash custom ROMs. Because I got tired of doing it manually every time.",
    category: "android",
    tags: ["Android", "ROM", "Tool"],
    downloadUrl: "#",
    githubUrl: "#",
    status: "Active",
    lastUpdated: "2024-01-10",
  },
  {
    id: 2,
    title: "System Tweaker Pro",
    description: "Advanced system tweaking utility for rooted Android devices. Probably voids your warranty.",
    category: "android",
    tags: ["Android", "Root", "System"],
    downloadUrl: "#",
    githubUrl: "#",
    status: "Beta",
    lastUpdated: "2024-01-05",
  },
  {
    id: 3,
    title: "File Organizer Script",
    description: "Python script that organizes my chaotic downloads folder. Saves me hours of manual sorting.",
    category: "software",
    tags: ["Python", "Automation", "Utility"],
    downloadUrl: "#",
    githubUrl: "#",
    status: "Stable",
    lastUpdated: "2023-12-20",
  },
  {
    id: 4,
    title: "Config Backup Tool",
    description: "Backs up all my important config files across different systems. Because I learned the hard way.",
    category: "software",
    tags: ["Backup", "Config", "Cross-platform"],
    downloadUrl: "#",
    githubUrl: "#",
    status: "Active",
    lastUpdated: "2024-01-08",
  },
]

export default function ProjectsPage() {
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
            <h1 className="text-4xl font-bold text-white mb-2 font-mono holo-text">PROJECT_ARCHIVE</h1>
            <p className="text-xl text-orange-300 font-mono">Software applications and system modifications</p>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex gap-4 mb-8">
          <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-black font-mono font-bold shadow-lg shadow-orange-500/30">
            ALL_PROJECTS
          </Button>
          <Button
            variant="outline"
            className="glow-border text-orange-400 hover:bg-orange-500/20 bg-transparent font-mono transition-all duration-300 hover:scale-105"
          >
            <Smartphone className="w-4 h-4 mr-2" />
            ANDROID
          </Button>
          <Button
            variant="outline"
            className="glow-border text-orange-400 hover:bg-orange-500/20 bg-transparent font-mono transition-all duration-300 hover:scale-105"
          >
            <Code className="w-4 h-4 mr-2" />
            SOFTWARE
          </Button>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="hud-element hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500 transform hover:scale-[1.02]"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-orange-500/30 to-orange-600/30 rounded flex items-center justify-center glow-border">
                      {project.category === "android" ? (
                        <Smartphone className="w-4 h-4 text-orange-400" />
                      ) : (
                        <Code className="w-4 h-4 text-orange-400" />
                      )}
                    </div>
                    <CardTitle className="text-white font-mono">{project.title}</CardTitle>
                  </div>
                  <Badge
                    className={
                      project.status === "Active"
                        ? "bg-green-500/20 text-green-400 border-green-500/30 font-mono glow-border"
                        : project.status === "Beta"
                          ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30 font-mono glow-border"
                          : "bg-gray-500/20 text-gray-400 border-gray-500/30 font-mono glow-border"
                    }
                  >
                    {project.status.toUpperCase()}
                  </Badge>
                </div>
                <CardDescription className="text-gray-300 leading-relaxed">{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
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
                <div className="flex gap-2 mb-4">
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-black font-mono font-bold shadow-lg shadow-orange-500/30"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    DOWNLOAD
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="glow-border text-orange-400 hover:bg-orange-500/20 bg-transparent font-mono"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    SOURCE
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="glow-border text-orange-400 hover:bg-orange-500/20 bg-transparent font-mono"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-sm text-orange-400 font-mono">
                  LAST_UPDATE: {new Date(project.lastUpdated).toLocaleDateString().replace(/\//g, ".")}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
