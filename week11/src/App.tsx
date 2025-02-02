import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import ButtonAppBar from './components/Header'
import Home from './components/FrontPage'
import Saved from './components/SavedPage'
import useJokes from './hooks/useJokes'


function App() {
  const { jokes, addNewJoke, deleteJoke } = useJokes()


  return (
    <BrowserRouter>
    <ButtonAppBar />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home saveJoke={addNewJoke} />
            </>
          }
        />
        <Route
          path="/saved"
          element={
            <Saved jokes={jokes} deleteJoke={deleteJoke} />
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
