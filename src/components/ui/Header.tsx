'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid'

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
        <div className="flex items-center ">
          <Switch id="theme-switch" onCheckedChange={toggleTheme} />
        
          <Label htmlFor="theme-switch" className="ml-2 text-white">
            {theme === 'dark' ?  <div  className='flex gap-1 justify-center items-center cursor-pointer'><MoonIcon className="w-6 h-6 text-yellow-600 cursor-pointer" /> <span>Dark Mode</span> </div> :<div className='flex gap-1 justify-center items-center cursor-pointer'><SunIcon className="w-6 h-6 text-yellow-300 cursor-pointer" /> <span>Light Mode</span> </div>}
          </Label>
        </div>
      </div>
    </header>
  )
}