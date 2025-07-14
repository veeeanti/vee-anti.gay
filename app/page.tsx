import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Github,
  Twitter,
  Mail,
  Smartphone,
  Code,
  BookOpen,
  Activity,
  Music,
  ExternalLink,
  HardDrive,
  MessageCircle,
  Gamepad2,
} from "lucide-react"
import { RecentActivity } from "@/components/recent-activity"
import Image from "next/image"

export default function HomePage() {
  return (
    <div className="min-h-screen hl-background">
      {/* Circuit board overlay */}
      <div className="fixed inset-0 circuit-overlay" />
      <div className="fixed inset-0 hex-pattern" />

      {/* Scan lines effect */}
      <div className="fixed inset-0 scan-lines" />

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header with enhanced styling */}
        <div className="text-center mb-12">
          <div className="w-32 h-32 mx-auto mb-6 relative">
            <div className="w-full h-full bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 rounded-lg flex items-center justify-center shadow-2xl shadow-orange-500/30 glow-border animate-pulse-orange p-2">
              <div className="w-full h-full bg-black rounded-md flex items-center justify-center relative overflow-hidden">
                <Image
                  src="/images/veeanti-profile.png"
                  alt="veeAnti Profile"
                  width={96}
                  height={96}
                  className="w-full h-full object-cover rounded-md z-10"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent" />
              </div>
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg shadow-orange-500/50">
              <Activity className="w-4 h-4 text-black" />
            </div>
          </div>
          <h1 className="text-6xl font-bold text-white mb-3 tracking-wide holo-text">veeAnti</h1>
          <div className="text-xl text-orange-300 mb-4 font-mono">
            <span className="text-orange-500">[</span>
            <span className="holo-text">Android Dev • Software Engineer • Digital Architect</span>
            <span className="text-orange-500">]</span>
          </div>
        </div>

        {/* Navigation Grid with enhanced cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="hud-element hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500 transform hover:scale-105">
            <CardHeader className="pb-3">
              <CardTitle className="text-white flex items-center gap-3 font-mono">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500/30 to-orange-600/30 rounded flex items-center justify-center glow-border">
                  <BookOpen className="w-4 h-4 text-orange-400" />
                </div>
                BLOG_SYSTEM
              </CardTitle>
              <CardDescription className="text-gray-400 font-mono text-sm">
                Personal logs and technical documentation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/blog">
                <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-black font-mono font-bold shadow-lg shadow-orange-500/30 transition-all duration-300">
                  ACCESS LOGS
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hud-element hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500 transform hover:scale-105">
            <CardHeader className="pb-3">
              <CardTitle className="text-white flex items-center gap-3 font-mono">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500/30 to-orange-600/30 rounded flex items-center justify-center glow-border">
                  <Smartphone className="w-4 h-4 text-orange-400" />
                </div>
                ANDROID_PROJECTS
              </CardTitle>
              <CardDescription className="text-gray-400 font-mono text-sm">
                Mobile applications and system modifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/projects?category=android">
                <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-black font-mono font-bold shadow-lg shadow-orange-500/30 transition-all duration-300">
                  VIEW ANDROID
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hud-element hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500 transform hover:scale-105">
            <CardHeader className="pb-3">
              <CardTitle className="text-white flex items-center gap-3 font-mono">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500/30 to-orange-600/30 rounded flex items-center justify-center glow-border">
                  <Code className="w-4 h-4 text-orange-400" />
                </div>
                SOFTWARE_SUITE
              </CardTitle>
              <CardDescription className="text-gray-400 font-mono text-sm">
                Desktop applications and system utilities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/projects?category=software">
                <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-black font-mono font-bold shadow-lg shadow-orange-500/30 transition-all duration-300">
                  VIEW SOFTWARE
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Other Cool Stuff Section */}
        <div className="mb-12">
          <div className="border-l-4 border-orange-500 pl-6 mb-8">
            <h2 className="text-3xl font-bold text-white mb-2 font-mono holo-text">OTHER_COOL_STUFF</h2>
            <p className="text-lg text-orange-300 font-mono">Additional projects and resources</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="hud-element hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500 transform hover:scale-105">
              <CardHeader className="pb-3">
                <CardTitle className="text-white flex items-center gap-2 font-mono text-sm">
                  <div className="w-6 h-6 bg-gradient-to-br from-orange-500/30 to-orange-600/30 rounded flex items-center justify-center glow-border">
                    <Gamepad2 className="w-3 h-3 text-orange-400" />
                  </div>
                  UNIONCRAX
                </CardTitle>
                <CardDescription className="text-gray-400 font-mono text-xs">
                  Pre-installed games archive
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <a href="https://union-crax.xyz" target="_blank" rel="noopener noreferrer" className="block">
                  <Button
                    size="sm"
                    className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-mono font-bold shadow-lg shadow-purple-500/30 transition-all duration-300"
                  >
                    <ExternalLink className="w-3 h-3 mr-2" />
                    VISIT_SITE
                  </Button>
                </a>
              </CardContent>
            </Card>

            <Card className="hud-element hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500 transform hover:scale-105">
              <CardHeader className="pb-3">
                <CardTitle className="text-white flex items-center gap-2 font-mono text-sm">
                  <div className="w-6 h-6 bg-gradient-to-br from-orange-500/30 to-orange-600/30 rounded flex items-center justify-center glow-border">
                    <Gamepad2 className="w-3 h-3 text-orange-400" />
                  </div>
                  STEAMGG
                </CardTitle>
                <CardDescription className="text-gray-400 font-mono text-xs">Pre-installed games (ads)</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <a href="https://steamgg.net" target="_blank" rel="noopener noreferrer" className="block">
                  <Button
                    size="sm"
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-mono font-bold shadow-lg shadow-blue-500/30 transition-all duration-300"
                  >
                    <ExternalLink className="w-3 h-3 mr-2" />
                    VISIT_SITE
                  </Button>
                </a>
              </CardContent>
            </Card>

            <Card className="hud-element hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500 transform hover:scale-105">
              <CardHeader className="pb-3">
                <CardTitle className="text-white flex items-center gap-2 font-mono text-sm">
                  <div className="w-6 h-6 bg-gradient-to-br from-orange-500/30 to-orange-600/30 rounded flex items-center justify-center glow-border">
                    <HardDrive className="w-3 h-3 text-orange-400" />
                  </div>
                  VEEANTI_DRIVE
                </CardTitle>
                <CardDescription className="text-gray-400 font-mono text-xs">Personal file archive</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <a
                  href="https://drive.google.com/drive/folders/1yRzt9pslDVyxospUR2TqXrIrhTNkvXm5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button
                    size="sm"
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-mono font-bold shadow-lg shadow-green-500/30 transition-all duration-300"
                  >
                    <ExternalLink className="w-3 h-3 mr-2" />
                    ACCESS_DRIVE
                  </Button>
                </a>
              </CardContent>
            </Card>

            <Card className="hud-element hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500 transform hover:scale-105">
              <CardHeader className="pb-3">
                <CardTitle className="text-white flex items-center gap-2 font-mono text-sm">
                  <div className="w-6 h-6 bg-gradient-to-br from-orange-500/30 to-orange-600/30 rounded flex items-center justify-center glow-border">
                    <MessageCircle className="w-3 h-3 text-orange-400" />
                  </div>
                  DISCORD_PROFILE
                </CardTitle>
                <CardDescription className="text-gray-400 font-mono text-xs">Direct message contact</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <a
                  href="https://discord.com/users/1387386507853172746"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button
                    size="sm"
                    className="w-full bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-mono font-bold shadow-lg shadow-indigo-500/30 transition-all duration-300"
                  >
                    <ExternalLink className="w-3 h-3 mr-2" />
                    OPEN_DISCORD
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Social Links with all your accounts */}
        <div className="flex justify-center gap-3 mb-12 flex-wrap">
          <a
            href="https://github.com/veeeanti"
            target="_blank"
            rel="noopener noreferrer"
            className="glow-border text-orange-400 hover:bg-orange-500/20 bg-transparent transition-all duration-300 hover:scale-110 p-3 rounded-md"
            title="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://twitter.com/veeanti"
            target="_blank"
            rel="noopener noreferrer"
            className="glow-border text-orange-400 hover:bg-orange-500/20 bg-transparent transition-all duration-300 hover:scale-110 p-3 rounded-md"
            title="Twitter"
          >
            <Twitter className="w-5 h-5" />
          </a>
          <a
            href="https://bsky.app/profile/veeanti.bsky.social"
            target="_blank"
            rel="noopener noreferrer"
            className="glow-border text-orange-400 hover:bg-orange-500/20 bg-transparent transition-all duration-300 hover:scale-110 p-3 rounded-md"
            title="Bluesky"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v-.07zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
            </svg>
          </a>
          <a
            href="https://www.tiktok.com/@antitheus185"
            target="_blank"
            rel="noopener noreferrer"
            className="glow-border text-orange-400 hover:bg-orange-500/20 bg-transparent transition-all duration-300 hover:scale-110 p-3 rounded-md"
            title="TikTok"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
            </svg>
          </a>
          <a
            href="https://www.reddit.com/user/projectmajora/"
            target="_blank"
            rel="noopener noreferrer"
            className="glow-border text-orange-400 hover:bg-orange-500/20 bg-transparent transition-all duration-300 hover:scale-110 p-3 rounded-md"
            title="Reddit"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
            </svg>
          </a>
          <a
            href="https://steamcommunity.com/id/antitheus185"
            target="_blank"
            rel="noopener noreferrer"
            className="glow-border text-orange-400 hover:bg-orange-500/20 bg-transparent transition-all duration-300 hover:scale-110 p-3 rounded-md"
            title="Steam"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.624 0 11.999-5.375 11.999-12S18.603.001 11.979.001zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.319.005-1.949s-.75-1.121-1.377-1.383c-.624-.26-1.29-.249-1.878-.03l1.523.63c.956.4 1.409 1.5 1.009 2.455-.397.957-1.497 1.41-2.454 1.012H7.54zm11.415-9.303c0-1.662-1.353-3.015-3.015-3.015-1.665 0-3.015 1.353-3.015 3.015 0 1.665 1.35 3.015 3.015 3.015 1.663 0 3.015-1.35 3.015-3.015zm-5.273-.005c0-1.252 1.013-2.266 2.265-2.266 1.249 0 2.266 1.014 2.266 2.266 0 1.251-1.017 2.265-2.266 2.265-1.253 0-2.265-1.014-2.265-2.265z" />
            </svg>
          </a>
          <a
            href="https://cs.rin.ru/forum/memberlist.php?mode=viewprofile&u=2725712"
            target="_blank"
            rel="noopener noreferrer"
            className="glow-border text-orange-400 hover:bg-orange-500/20 bg-transparent transition-all duration-300 hover:scale-110 p-3 rounded-md"
            title="CS.RIN.RU Forum"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </a>
          <a
            href="https://open.spotify.com/user/314saua3rlrulnzdhodgborfbzvi?si=c5ff6f7267154ef0&nd=1&dlsi=1e564fda0beb49a4"
            target="_blank"
            rel="noopener noreferrer"
            className="glow-border text-orange-400 hover:bg-orange-500/20 bg-transparent transition-all duration-300 hover:scale-110 p-3 rounded-md"
            title="Spotify"
          >
            <Music className="w-5 h-5" />
          </a>
          <a
            href="mailto:notanactualemailimusing@gmail.com"
            className="glow-border text-orange-400 hover:bg-orange-500/20 bg-transparent transition-all duration-300 hover:scale-110 p-3 rounded-md"
            title="Email"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>

        {/* Recent Activity with enhanced styling */}
        <RecentActivity />

        {/* Footer */}
        <div className="text-center mt-8 pt-8 border-t border-orange-500/20">
          <p className="text-gray-400 font-mono text-sm">
            made with ♥ by <span className="text-orange-400">Lou</span>
          </p>
        </div>
      </div>
    </div>
  )
}
