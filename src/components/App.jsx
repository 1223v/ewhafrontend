import './App.css';
import {Route,Routes} from 'react-router-dom'
import NavBar from './views/NavBar/NavBar'
//import Footer from './views/Footer/Footer'
import LandingPage from './views/LandingPage/LandingPage';
import LoginPage from './views/LoginPage/LoginPage';
import RegisterPage from './views/RegisterPage/RegisterPage';
import Auth from '../hoc/auth'

function App() {
	const NewLandingPage = Auth(LandingPage, true);
  const NewLoginPage = Auth(LoginPage, false);
  const NewRegisterPage = Auth(RegisterPage, false);
  return (
    <div className="App">
      
      
      <Routes>
		  
						<Route path="/" element={<NewLandingPage />} />			  
						<Route path="/login" element={<NewLoginPage/>} />
            			<Route path="/register" element={<NewRegisterPage/>} />
      </Routes>
			
    
      
    </div>
  );
}

export default App;
