"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Save, X, Plus } from "lucide-react"
import type { Project, Category } from "@/lib/types"

interface ProjectFormProps {
  project?: Project
  onSave: (project: Partial<Project>) => void
  onCancel: () => void
}

export function ProjectForm({ project, onSave, onCancel }: ProjectFormProps) {
  const [formData, setFormData] = useState({
    title: project?.title || "",
    description: project?.description || "",
    category: project?.category || "",
    tags: project?.tags || [],
    download_url: project?.download_url || "",
    github_url: project?.github_url || "",
    demo_url: project?.demo_url || "",
    status: project?.status || "active",
  })

  const [categories, setCategories] = useState<Category[]>([])
  const [newTag, setNewTag] = useState("")
  const [newCategory, setNewCategory] = useState("")
  const [showNewCategory, setShowNewCategory] = useState(false)

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories")
      const data = await response.json()
      setCategories(data)
    } catch (error) {
      console.error("Failed to fetch categories:", error)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag.trim()],
      })
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((tag) => tag !== tagToRemove),
    })
  }

  const addCategory = async () => {
    if (newCategory.trim()) {
      try {
        const response = await fetch("/api/categories", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: newCategory.trim(),
            description: `Custom category: ${newCategory.trim()}`,
          }),
        })

        if (response.ok) {
          const category = await response.json()
          setCategories([...categories, category])
          setFormData({ ...formData, category: category.id })
          setNewCategory("")
          setShowNewCategory(false)
        }
      } catch (error) {
        console.error("Failed to create category:", error)
      }
    }
  }

  return (
    <Card className="bg-gray-900/80 border-orange-500/30">
      <CardHeader>
        <CardTitle className="text-white font-mono">{project ? "EDIT_PROJECT" : "CREATE_NEW_PROJECT"}</CardTitle>
        <CardDescription className="text-orange-300 font-mono">
          {project ? "Modify project details" : "Add new project to archive"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title" className="text-orange-400 font-mono">
                PROJECT_NAME
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter project name..."
                className="bg-gray-800 border-orange-500/30 text-white font-mono focus:border-orange-500"
                required
              />
            </div>
            <div>
              <Label htmlFor="status" className="text-orange-400 font-mono">
                PROJECT_STATUS
              </Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger className="bg-gray-800 border-orange-500/30 text-white font-mono focus:border-orange-500">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-orange-500/30">
                  <SelectItem value="active" className="text-white font-mono">
                    ACTIVE
                  </SelectItem>
                  <SelectItem value="beta" className="text-white font-mono">
                    BETA
                  </SelectItem>
                  <SelectItem value="stable" className="text-white font-mono">
                    STABLE
                  </SelectItem>
                  <SelectItem value="archived" className="text-white font-mono">
                    ARCHIVED
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="description" className="text-orange-400 font-mono">
              PROJECT_DESCRIPTION
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe what this project does..."
              className="bg-gray-800 border-orange-500/30 text-white font-mono focus:border-orange-500"
              required
            />
          </div>

          <div>
            <Label htmlFor="category" className="text-orange-400 font-mono">
              PROJECT_CATEGORY
            </Label>
            <div className="flex gap-2">
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger className="bg-gray-800 border-orange-500/30 text-white font-mono focus:border-orange-500">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-orange-500/30">
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id} className="text-white font-mono">
                      {category.name.toUpperCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                type="button"
                variant="outline"
                className="border-orange-500/30 text-orange-400 hover:bg-orange-500/10 bg-transparent font-mono"
                onClick={() => setShowNewCategory(!showNewCategory)}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            {showNewCategory && (
              <div className="flex gap-2 mt-2">
                <Input
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="New category name..."
                  className="bg-gray-800 border-orange-500/30 text-white font-mono focus:border-orange-500"
                />
                <Button
                  type="button"
                  onClick={addCategory}
                  className="bg-green-500/80 hover:bg-green-500 text-black font-mono font-bold"
                >
                  ADD
                </Button>
              </div>
            )}
          </div>

          <div>
            <Label className="text-orange-400 font-mono">PROJECT_TAGS</Label>
            <div className="flex gap-2 mb-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add tag..."
                className="bg-gray-800 border-orange-500/30 text-white font-mono focus:border-orange-500"
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
              />
              <Button
                type="button"
                onClick={addTag}
                className="bg-orange-500 hover:bg-orange-600 text-black font-mono font-bold"
              >
                ADD
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag) => (
                <Badge
                  key={tag}
                  className="bg-orange-500/20 text-orange-300 border-orange-500/30 font-mono cursor-pointer"
                  onClick={() => removeTag(tag)}
                >
                  {tag.toUpperCase()}
                  <X className="w-3 h-3 ml-1" />
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="download-url" className="text-orange-400 font-mono">
                DOWNLOAD_URL
              </Label>
              <Input
                id="download-url"
                value={formData.download_url}
                onChange={(e) => setFormData({ ...formData, download_url: e.target.value })}
                placeholder="https://..."
                className="bg-gray-800 border-orange-500/30 text-white font-mono focus:border-orange-500"
              />
            </div>
            <div>
              <Label htmlFor="github-url" className="text-orange-400 font-mono">
                REPOSITORY_URL
              </Label>
              <Input
                id="github-url"
                value={formData.github_url}
                onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                placeholder="https://github.com/..."
                className="bg-gray-800 border-orange-500/30 text-white font-mono focus:border-orange-500"
              />
            </div>
            <div>
              <Label htmlFor="demo-url" className="text-orange-400 font-mono">
                DEMO_URL
              </Label>
              <Input
                id="demo-url"
                value={formData.demo_url}
                onChange={(e) => setFormData({ ...formData, demo_url: e.target.value })}
                placeholder="https://..."
                className="bg-gray-800 border-orange-500/30 text-white font-mono focus:border-orange-500"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button type="submit" className="bg-green-500/80 hover:bg-green-500 text-black font-mono font-bold">
              <Save className="w-4 h-4 mr-2" />
              {project ? "UPDATE_PROJECT" : "CREATE_PROJECT"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="border-orange-500/30 text-orange-400 hover:bg-orange-500/10 hover:border-orange-500/60 bg-transparent font-mono"
            >
              CANCEL_OPERATION
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
