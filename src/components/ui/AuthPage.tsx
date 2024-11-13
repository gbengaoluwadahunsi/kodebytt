import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface AuthPageProps {
  isLogin: boolean
  onSubmit: (e: React.FormEvent) => void
  email: string
  setEmail: (email: string) => void
  password: string
  setPassword: (password: string) => void
  toggleAuthMode: () => void
}

export default function AuthPage({
  isLogin,
  onSubmit,
  email,
  setEmail,
  password,
  setPassword,
  toggleAuthMode
}: AuthPageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto"
    >
      <Card>
        <CardHeader className="bg-gradient-to-r from-orange-500 to-pink-500">
          <CardTitle className="text-white text-center">{isLogin ? 'Login' : 'Register'}</CardTitle>
        </CardHeader>
        <CardContent className="mt-4">
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full"
              />
            </div>
            <Button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white">
              {isLogin ? 'Login' : 'Register'}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <button onClick={toggleAuthMode} className="text-blue-600 dark:text-blue-400 hover:underline">
              {isLogin ? 'Not registered? Click here to sign up' : 'Already have an account? Login'}
            </button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}