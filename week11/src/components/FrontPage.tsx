import { useEffect, useState } from 'react'
import { Button, Card, CardContent, Typography } from '@mui/material'

interface IJoke {
  setup: string
  punchline: string
  id: number
}

interface FrontPageProps {
  saveJoke?: (joke: IJoke) => void
}

const FrontPage: React.FC<FrontPageProps> = ({ saveJoke }) => {
  const [joke, setJoke] = useState<IJoke>()
  const [loading, setLoading] = useState(false)
  const [newJoke, setNewJoke] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    const fetchJoke = async () => {
      setLoading(true)
      try {
        const response = await fetch('https://official-joke-api.appspot.com/random_joke', { signal: controller.signal })
        if (!response.ok) {
          throw new Error("Failed to fetch data!")
      }
        const data: IJoke = await response.json()
        setJoke(data)
      } catch (error) {
        console.error('Failed to fetch joke:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchJoke()

    return () => {
      controller.abort()
    }
  }, [newJoke])

  const addJoke = () => {
    if (joke && saveJoke) {
      saveJoke(joke)
    }
  }

  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => setNewJoke(newJoke+1)}>
        Get Joke
      </Button>
      <Button variant="contained" color="primary" onClick={() => addJoke()}>
        Save joke
      </Button>
      {loading ? (
        <Typography>Loading a joke...</Typography>
      ) : (
        joke && (
          <Card key={joke.id}>
            <CardContent>
              <Typography variant="h5">{joke.setup}</Typography>
              <Typography variant="body2">{joke.punchline}</Typography>
            </CardContent>
          </Card>
        )
      )}
    </div>
  )
}

export default FrontPage

