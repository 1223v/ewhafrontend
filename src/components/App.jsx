import './App.css';
import {Route,Routes} from 'react-router-dom'
import NavBar from './views/NavBar/NavBar'
import Footer from './views/Footer/Footer'
import LandingPage from './views/LandingPage/LandingPage';
import LoginPage from './views/LoginPage/LoginPage';
import RegisterPage from './views/RegisterPage/RegisterPage';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <div style={{ minHeight: 'calc(100vh - 80px)', paddingTop: '50px' }}>
      <Routes>
						<Route path="/" element={<LandingPage />} />
						<Route path="/login" element={<LoginPage/>} />
            <Route path="/register" element={<RegisterPage/>} />
      </Routes>
			</div>
    
      <Footer/>
    </div>
  );
}

export default App;
