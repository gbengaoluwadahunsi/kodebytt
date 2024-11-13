'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface HeaderProps {
  theme: string
  toggleTheme: () => void
  resetAppState: () => void
}

export default function Header({ theme, toggleTheme, resetAppState }: HeaderProps) {
  const router = useRouter()

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault()
    resetAppState()
    router.push('/')
  }

  return (
    <header className="bg-gradient-to-r from-orange-800 via-slate-600 to-blue-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" onClick={handleLogoClick}>
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500">
            Kodebytt
          </h1>
        </Link>
        <div className="flex items-center space-x-2">
          <Switch id="theme-switch" onCheckedChange={toggleTheme} />
          <Label htmlFor="theme-switch" className="text-white">
            {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
          </Label>
        </div>
      </div>
    </header>
  )
}