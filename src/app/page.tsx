'use client'

import { useState, useEffect, useCallback } from 'react'
import { useTheme } from '@/components/ui/ThemeContext'
import { useToast } from "@/hooks/use-toast"
import LandingPage from '@/components/ui/LandingPage'
import AuthPage from '@/components/ui/AuthPage'
import MainContent from '@/components/ui/MainContent'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

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

  const fetchConcepts = useCallback(async () => {
    if (selectedTopics.length === 0) return;
    const queryString = selectedTopics.map(topic => `choice=${encodeURIComponent(topic)}`).join('&')
    try {
      const response = await fetch(`${API_URL}/api/concepts?${queryString}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (response.ok) {
        const data = await response.json()
        setConcepts(data)
      } else {
        throw new Error('Failed to fetch concepts')
      }
    } catch (error) {
      console.error('Error fetching concepts:', error)
      toast({
        title: "Error",
        description: "Failed to fetch concepts. Please try again.",
        variant: "destructive",
      })
    }
  }, [selectedTopics, toast])

  const fetchUserTopics = useCallback(async (token: string) => {
    try {
      const response = await fetch(`${API_URL}/api/user/topics`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (response.ok) {
        const data = await response.json()
        setSelectedTopics(data.topics)
      } else {
        throw new Error('Failed to fetch user topics')
      }
    } catch (error) {
      console.error('Error fetching user topics:', error)
      toast({
        title: "Error",
        description: "Failed to fetch your topics. Please try logging in again.",
        variant: "destructive",
      })
    }
  }, [toast, setSelectedTopics])

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setIsLoggedIn(true)
      setShowLanding(false)
      fetchUserTopics(token)
    }
  }, [fetchUserTopics])

  useEffect(() => {
    if (selectedTopics.length > 0 && isLoggedIn) {
      fetchConcepts()
    } else {
      setConcepts([])
    }
  }, [selectedTopics, isLoggedIn, fetchConcepts])

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    const endpoint = isLogin ? '/api/login' : '/api/register'
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, topics: selectedTopics })
      })
      if (response.ok) {
        const data = await response.json()
        if (isLogin) {
          localStorage.setItem('token', data.token)
          setIsLoggedIn(true)
          setSelectedTopics(data.topics)
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
        throw new Error(data.error)
      }
    } catch (error: unknown) {
      console.error(isLogin ? 'Login error:' : 'Registration error:', error)
      toast({
        title: isLogin ? "Login failed" : "Registration failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred.",
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
            selectedTopics={selectedTopics}
            setSelectedTopics={setSelectedTopics}
          />
        )}
      </main>
      <Footer />
    </div>
  )
}