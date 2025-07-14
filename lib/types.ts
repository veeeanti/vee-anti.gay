export interface Project {
  id: number
  title: string
  slug: string
  description: string
  category: string
  tags: string[]
  download_url?: string
  github_url?: string
  demo_url?: string
  status: "active" | "beta" | "stable" | "archived"
  created_at: string
  updated_at: string
}

export interface BlogPost {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  tags: string[]
  published: boolean
  created_at: string
  updated_at: string
}

export interface ActivityItem {
  id: string
  type: "blog" | "android" | "software"
  title: string
  action: string
  timestamp: Date
}

export interface Category {
  id: string
  name: string
  description: string
  created_at: string
}
