import React from 'react'
import { Card, CardContent, Typography, Button } from '@mui/material'

interface IJoke {
  setup: string
  punchline: string
  id: number
}

interface SavedProps {
  savedJokes: IJoke[]
  deleteJoke: (id: number) => void
}

const Saved: React.FC<SavedProps> = ({ savedJokes, deleteJoke }) => {
  return (
    <div>
      {savedJokes.length === 0 ? (
        <p>No saved jokes yet.</p>
      ) : (
        savedJokes.map(joke => (
          <Card key={joke.id} sx={{ marginBottom: 2 }}>
            <CardContent>
              <Typography variant="h5">{joke.setup}</Typography>
              <Typography variant="body2">{joke.punchline}</Typography>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => deleteJoke(joke.id)}
              >
                Delete
              </Button>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  )
}

export default Saved