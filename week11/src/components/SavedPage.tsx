import React from 'react'
import { Card, CardContent, Typography, Button } from '@mui/material'

interface IJoke {
  setup: string
  punchline: string
  id: number
}

interface SavedProps {
  jokes: IJoke[]
  deleteJoke: (id: number) => void
}

const Saved: React.FC<SavedProps> = ({ jokes, deleteJoke }) => {
  return (
    <div>
      {jokes.length === 0 ? (
        <p>No saved jokes yet.</p>
      ) : (
        jokes.map(joke => (
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