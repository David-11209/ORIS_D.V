import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PokeInfoPage from './pages/PokeInfoPage/component/PokeInfoPageComponent/PokeInfoPage'
import MainPage from './pages/mainPage/component/MainPageComponent/MainPage';

const App = () => {

  return (  
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<MainPage/>}/>
            <Route path='/pokemon/:name' element={<PokeInfoPage/>}/>   
          </Routes>
      </BrowserRouter>

  )
}

export default App