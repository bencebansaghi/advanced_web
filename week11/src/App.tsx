import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import ButtonAppBar from './components/Header'
import Home from './components/FrontPage'
import Saved from './components/SavedPage'
import { useJokes } from './hooks/useJokes'


function App() {
  const { savedJokes, saveJoke, deleteJoke } = useJokes()


  return (
    <BrowserRouter>
    <ButtonAppBar />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home saveJoke={saveJoke} />
            </>
          }
        />
        <Route
          path="/saved"
          element={
            <Saved savedJokes={savedJokes} deleteJoke={deleteJoke} />
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
