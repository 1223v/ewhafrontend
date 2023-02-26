import './App.css';
import {Route,Routes} from 'react-router-dom'
import NavBar from './views/NavBar/NavBar'
//import Footer from './views/Footer/Footer'
import LandingPage from './views/LandingPage/LandingPage';
import LoginPage from './views/LoginPage/LoginPage';
import RegisterPage from './views/RegisterPage/RegisterPage';
import Auth from '../hoc/auth'

function App() {
  return (
    <div className="App">
      
      
      <Routes>
		  
						<Route path="/" element={Auth(<LandingPage />)} />			  
						<Route path="/login" element={<LoginPage/>} />
            			<Route path="/register" element={<RegisterPage/>} />
      </Routes>
			
    
      
    </div>
  );
}

export default App;
