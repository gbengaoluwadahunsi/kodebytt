'use client'

import { useState, useEffect } from 'react'
import { useTheme } from '@/components/ui/ThemeContext'
import { useToast } from "@/hooks/use-toast"
import LandingPage from '@/components/ui/LandingPage'
import AuthPage from '@/components/ui/AuthPage'
import MainContent from '@/components/ui/MainContent'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'

export default function Home() {
  const [selectedTopics, setSelectedTopics] = useState<string[]>([])
  const [concepts, setConcepts] = useState<Array<{ topic: string, concept: string }>>([])
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showLanding, setShowLanding] = useState(true)
  const [isLogin, setIsLogin] = useState(true)
  const { theme, toggleTheme } = useTheme()
  const { toast } = useToast()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setIsLoggedIn(true)
      setShowLanding(false)
      fetchUserTopics(token)
    }
  }, [])

  useEffect(() => {
    if (selectedTopics.length > 0 && isLoggedIn) {
      fetchConcepts()
    } else {
      setConcepts([])
    }
  }, [selectedTopics, isLoggedIn])

  const fetchUserTopics = async (token: string) => {
    try {
      const response = await fetch('/api/user/topics', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (response.ok) {
        const data = await response.json()
        setSelectedTopics(data.topics)
      }
    } catch (error) {
      console.error('Error fetching user topics:', error)
    }
  }

  const fetchConcepts = async () => {
    const queryString = selectedTopics.map(topic => `choice=${encodeURIComponent(topic)}`).join('&')
    try {
      const response = await fetch(`/api/concepts?${queryString}`)
      if (response.ok) {
        const data = await response.json()
        setConcepts(data)
      }
    } catch (error) {
      console.error('Error fetching concepts:', error)
    }
  }

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    const endpoint = isLogin ? '/api/login' : '/api/register'
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      if (response.ok) {
        const data = await response.json()
        if (isLogin) {
          localStorage.setItem('token', data.token)
          setIsLoggedIn(true)
          fetchUserTopics(data.token)
          setShowLanding(false)
        } else {
          setIsLogin(true)
        }
        toast({
          title: isLogin ? "Login successful" : "Registration successful",
          description: isLogin ? "Welcome back!" : "Please log in with your new account.",
        })
        setEmail('')
        setPassword('')
      } else {
        const data = await response.json()
        toast({
          title: isLogin ? "Login failed" : "Registration failed",
          description: data.error,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error(isLogin ? 'Login error:' : 'Registration error:', error)
      toast({
        title: isLogin ? "Login failed" : "Registration failed",
        description: "An unexpected error occurred.",
        variant: "destructive",
      })
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsLoggedIn(false)
    setSelectedTopics([])
    setConcepts([])
    setShowLanding(true)
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    })
  }

  const handleGetStarted = () => {
    setShowLanding(false)
  }

  const toggleAuthMode = () => {
    setIsLogin(!isLogin)
  }

  const resetAppState = () => {
    setShowLanding(true)
    setIsLoggedIn(false)
    setSelectedTopics([])
    setConcepts([])
    setEmail('')
    setPassword('')
    setIsLogin(true)
    localStorage.removeItem('token')
  }

  return (
    <div className={`flex flex-col min-h-screen ${theme === 'dark' ? 'bg-customBlue text-customWhite' : 'bg-customWhite text-customBlue'}`}>
      <Header theme={theme} toggleTheme={toggleTheme} resetAppState={resetAppState} />
      <main className="container flex-grow mx-auto px-4 py-8">
        {showLanding ? (
          <LandingPage onGetStarted={handleGetStarted} />
        ) : isLoggedIn ? (
          <MainContent
            selectedTopics={selectedTopics}
            setSelectedTopics={setSelectedTopics}
            concepts={concepts}
            handleLogout={handleLogout}
          />
        ) : (
          <AuthPage
            isLogin={isLogin}
            onSubmit={handleAuth}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            toggleAuthMode={toggleAuthMode}
          />
        )}
      </main>
      <Footer />
    </div>
  )
} 