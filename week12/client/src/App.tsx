import { BrowserRouter, Route, Routes } from 'react-router-dom'
import FrontPage from './components/FrontPage'
import ShowBook from './components/ShowBook'

function App() {
  return(
    <BrowserRouter>

      <Routes>
        <Route
          path="/"
          element={
            <>
              <FrontPage />
            </>
          }
        />
        <Route
          path="/book/:name"
          element={
            <ShowBook />
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
