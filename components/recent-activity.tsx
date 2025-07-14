"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, FileText, Code, Smartphone } from "lucide-react"

interface ActivityItem {
  id: string
  type: "blog" | "android" | "software"
  title: string
  action: string
  timestamp: Date
}

export function RecentActivity() {
  const [activities, setActivities] = useState<ActivityItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRecentActivity = async () => {
      try {
        const mockActivities: ActivityItem[] = [
          {
            id: "1",
            type: "blog",
            title: "Android ROM Flashing Adventures",
            action: "BLOG_POST_CREATED",
            timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          },
          {
            id: "2",
            type: "android",
            title: "System Tweaker Pro v2.1",
            action: "PROJECT_UPDATED",
            timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
          },
          {
            id: "3",
            type: "software",
            title: "Config Backup Tool",
            action: "PROJECT_RELEASED",
            timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          },
          {
            id: "4",
            type: "blog",
            title: "Why I Love Breaking Things",
            action: "BLOG_POST_CREATED",
            timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
          },
        ]

        setActivities(mockActivities)
        setLoading(false)
      } catch (error) {
        console.error("Failed to fetch recent activity:", error)
        setLoading(false)
      }
    }

    fetchRecentActivity()
  }, [])

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "blog":
        return <FileText className="w-4 h-4 text-orange-400" />
      case "android":
        return <Smartphone className="w-4 h-4 text-orange-400" />
      case "software":
        return <Code className="w-4 h-4 text-orange-400" />
      default:
        return <Activity className="w-4 h-4 text-orange-400" />
    }
  }

  const getActionColor = (action: string) => {
    switch (action) {
      case "BLOG_POST_CREATED":
        return "text-blue-400"
      case "PROJECT_UPDATED":
        return "text-yellow-400"
      case "PROJECT_RELEASED":
        return "text-green-400"
      default:
        return "text-orange-400"
    }
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) return "just now"
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
    return `${Math.floor(diffInSeconds / 86400)}d ago`
  }

  return (
    <Card className="hud-element hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-3 font-mono">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-500/30 to-orange-600/30 rounded flex items-center justify-center glow-border">
            <Activity className="w-4 h-4 text-orange-400" />
          </div>
          RECENT_ACTIVITY
          <div className="ml-auto">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse-orange" />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between animate-pulse">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-gray-700 rounded glow-border" />
                  <div className="w-48 h-4 bg-gray-700 rounded glow-border" />
                </div>
                <div className="w-16 h-4 bg-gray-700 rounded glow-border" />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between group hover:bg-orange-500/10 p-3 rounded transition-all duration-300 glow-border hover:shadow-lg hover:shadow-orange-500/20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-gradient-to-br from-orange-500/30 to-orange-600/30 rounded flex items-center justify-center glow-border">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div>
                    <div className="text-gray-300 font-mono text-sm group-hover:text-white transition-colors">
                      {activity.title}
                    </div>
                    <div className={`text-xs font-mono ${getActionColor(activity.action)}`}>{activity.action}</div>
                  </div>
                </div>
                <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 font-mono text-xs glow-border">
                  {formatTimeAgo(activity.timestamp)}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
