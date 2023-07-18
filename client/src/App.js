import './App.css';
import { Route, Routes, useLocation} from "react-router-dom"; 
import Landing from './components/LandingPage/LandingPage';
import Navbar from './components/HomePage/Navbar/Navbar';
import DogList from './components/DogList/DogList';
import Detail from './components/HomePage/Detail/Detail';
import { Formpage } from './components/FormPage/Formpage';
// import Card from './components/homePage/Card/Card';



function App() {
  const {pathname} = useLocation(); 

  return (
    <div >
      {pathname !== "/" && <Navbar/>}
      <div>
      <Routes>
          <Route exact path='/' element={<Landing/>}/>
          <Route path='/home' element={<DogList/>}/>
          <Route path='/detail/:id' element={<Detail/>}/>
          <Route path='/formpage' element={<Formpage/>}/>
      </Routes>
      </div>
     
    </div>
  );
}

export default App;
