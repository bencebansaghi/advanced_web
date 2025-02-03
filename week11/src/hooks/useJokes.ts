import { useState } from 'react'


interface IJoke {
    setup: string
    punchline: string
    id: number
  }

  export const useJokes = () => {
    const [savedJokes, setJokes] = useState<IJoke[]>([])

    function saveJoke(joke:IJoke) {
        setJokes([...savedJokes, joke])
    }

    function deleteJoke(id:number) {
      setJokes(savedJokes.filter(joke => joke.id !== id))
    }

    return { savedJokes, saveJoke, deleteJoke }
}
