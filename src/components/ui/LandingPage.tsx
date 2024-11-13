import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"

interface LandingPageProps {
  onGetStarted: () => void
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]"
    >
      <h1 className="text-4xl lg:text-5xl font-extrabold mb-4 lg:mb-8 text-center">
        Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500">Kodebytt</span>
      </h1>
      <h2 className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 font-semibold mb-8 text-center max-w-2xl">
        Master your favorite programming languages and frameworks, anytime, anywhere!
      </h2>
      <Button
        onClick={onGetStarted}
        size="lg"
        className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
      >
        Get Started
      </Button>
    </motion.div>
  )
}