import { useState } from 'react'


interface IJoke {
    setup: string
    punchline: string
    id: number
  }

  const useJokes = () => {
    const [jokes, setJokes] = useState<IJoke[]>([])

    function addNewJoke(joke:IJoke) {
        setJokes([...jokes, joke])
    }

    function deleteJoke(id:number) {
      setJokes(jokes.filter(joke => joke.id !== id))
    }

    return { jokes, addNewJoke, deleteJoke }
}

export default useJokes