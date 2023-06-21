import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import SignupTypePage from './Pages/SignupTypePage';

function App() {
  return (
    <div>
        <Router>
            <Routes>
                <Route Component={HomePage} exact path='/' />
                <Route Component={LoginPage} path='/login' />
                <Route Component={SignupPage} path='/signup' />
                <Route Component={SignupTypePage} path='/type' />
            </Routes>
        </Router>
    </div>
  );
}

export default App;
