import './App.css';
import { Route, Switch } from "react-router-dom"; 
import Landing from './components/LandingPage/LandingPage';


function App() {
  return (
    <div >
       <Switch>
            <Route path='/' exact>
              <Landing/>
            </Route>
       </Switch>
    </div>
  );
}

export default App;
