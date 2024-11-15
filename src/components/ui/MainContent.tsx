import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface MainContentProps {
  selectedTopics: string[]
  setSelectedTopics: (topics: string[]) => void
  concepts: Array<{ topic: string, concept: string }>
  handleLogout: () => void
}

const topics = ['Next.js', 'React', 'React Native', 'JavaScript', 'TypeScript', 'AWS CDK', 'Python', 'Django', 'Flask']

export default function MainContent({
  selectedTopics,
  setSelectedTopics,
  concepts,
  handleLogout
}: MainContentProps) {
  
  // Function to toggle topic selection
  const toggleTopic = (topic: string) => {
    setSelectedTopics(
      selectedTopics.includes(topic)
        ? selectedTopics.filter(t => t !== topic)
        : [...selectedTopics, topic]
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-orange-500">Select Programming Topics:</h2>
          <Button onClick={handleLogout} variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white">
            Logout
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {topics.map(topic => (
            <motion.div
              key={topic}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={() => toggleTopic(topic)}
                variant={selectedTopics.includes(topic) ? "default" : "outline"}
                className={`w-full ${
                  selectedTopics.includes(topic)
                    ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white'
                    : 'bg-white text-blue-600 border-blue-600 hover:bg-blue-100'
                }`}
              >
                {topic}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>

      {concepts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {concepts.map((concept, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card>
                <CardHeader className="bg-gradient-to-r from-orange-500 to-pink-500">
                  <CardTitle className="text-white">{concept.topic} Concept</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg">{concept.concept}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  )
}
