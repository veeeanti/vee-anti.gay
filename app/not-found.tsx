"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, Home, Search, Zap } from "lucide-react"

export default function NotFound() {
  const [glitchText, setGlitchText] = useState("404")
  const [scanProgress, setScanProgress] = useState(0)

  useEffect(() => {
    // Glitch effect for 404 text
    const glitchInterval = setInterval(() => {
      const glitchChars = ["4", "0", "4", "Ⱥ", "ø", "₄", "０", "４"]
      const randomText = Array.from(
        { length: 3 },
        () => glitchChars[Math.floor(Math.random() * glitchChars.length)],
      ).join("")
      setGlitchText(randomText)

      setTimeout(() => setGlitchText("404"), 100)
    }, 2000)

    // Scanning progress animation
    const scanInterval = setInterval(() => {
      setScanProgress((prev) => (prev >= 100 ? 0 : prev + 2))
    }, 100)

    return () => {
      clearInterval(glitchInterval)
      clearInterval(scanInterval)
    }
  }, [])

  return (
    <div className="min-h-screen hl-background">
      <div className="fixed inset-0 circuit-overlay" />
      <div className="fixed inset-0 hex-pattern" />
      <div className="fixed inset-0 scan-lines" />

      <div className="relative z-10 container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
        <div className="text-center max-w-2xl">
          {/* Glitching 404 */}
          <div className="mb-8">
            <div className="text-9xl font-bold text-red-500 font-mono mb-4 animate-pulse-orange glitch-text">
              {glitchText}
            </div>
            <div className="text-2xl text-orange-400 font-mono mb-2">SYSTEM_ERROR</div>
            <div className="text-lg text-gray-400 font-mono">Resource not found in database</div>
          </div>

          {/* Error Card */}
          <Card className="hud-element mb-8 border-red-500/30">
            <CardHeader>
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500/30 to-red-600/30 rounded flex items-center justify-center glow-border animate-pulse-orange">
                  <AlertTriangle className="w-6 h-6 text-red-400" />
                </div>
                <CardTitle className="text-white font-mono text-xl">ACCESS_VIOLATION</CardTitle>
              </div>
              <CardDescription className="text-gray-300 font-mono text-center">
                The requested resource could not be located in the system archives.
                <br />
                This incident has been logged for security analysis.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Scanning Progress */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-orange-400 font-mono mb-2">
                  <span>SCANNING_SYSTEM...</span>
                  <span>{scanProgress}%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2 glow-border">
                  <div
                    className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full transition-all duration-100 shadow-lg shadow-orange-500/50"
                    style={{ width: `${scanProgress}%` }}
                  />
                </div>
              </div>

              {/* Error Details */}
              <div className="bg-gray-900/50 p-4 rounded font-mono text-sm text-left mb-6 glow-border">
                <div className="text-orange-400 mb-2">ERROR_LOG:</div>
                <div className="text-gray-300 space-y-1">
                  <div>• STATUS: 404_NOT_FOUND</div>
                  <div>• TIMESTAMP: {new Date().toISOString()}</div>
                  <div>• USER_AGENT: AUTHORIZED_PERSONNEL</div>
                  <div>• RECOMMENDATION: RETURN_TO_MAIN_SYSTEM</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/">
                  <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-black font-mono font-bold shadow-lg shadow-orange-500/30 transition-all duration-300">
                    <Home className="w-4 h-4 mr-2" />
                    RETURN_TO_MAIN
                  </Button>
                </Link>
                <Link href="/blog">
                  <Button
                    variant="outline"
                    className="glow-border text-orange-400 hover:bg-orange-500/20 bg-transparent font-mono"
                  >
                    <Search className="w-4 h-4 mr-2" />
                    SEARCH_ARCHIVES
                  </Button>
                </Link>
                <Link href="/projects">
                  <Button
                    variant="outline"
                    className="glow-border text-orange-400 hover:bg-orange-500/20 bg-transparent font-mono"
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    VIEW_PROJECTS
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* System Status */}
          <div className="text-xs text-gray-500 font-mono">
            SYSTEM_STATUS: OPERATIONAL | SECURITY_LEVEL: AUTHORIZED | ERROR_CODE: 0x404
          </div>
        </div>
      </div>
    </div>
  )
}
