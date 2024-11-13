import '../app/styles/globals.css'

import { ThemeProvider } from '@/components/ui/ThemeContext'
import { Toaster } from "@/components/ui/toaster"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider>
          {children}
         
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}