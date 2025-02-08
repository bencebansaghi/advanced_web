import { BrowserRouter, Route, Routes } from 'react-router-dom'
import FrontPage from './components/FrontPage'
import ShowBook from './components/ShowBook'

function App() {
  return(
    <BrowserRouter>
    <h1>Books</h1>

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
        <Route
          path="*"
          element={
            <div>
              <h1>404: This is not the webpage you are looking for</h1>

            </div>
        }
      />
      </Routes>
    </BrowserRouter>
  )
}

export default App
