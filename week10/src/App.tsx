import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MyContainer from './components/MyContainer'
import About from './components/About'
import Header from './components/Header'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header /> <MyContainer />
              </>
            }
          />
          <Route
            path="/about"
            element={
              <>
                <Header />
                <About />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
