import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import SignupTypePage from './Pages/SignupTypePage';
import ContactInfoPage from './Pages/ContactInfoPage';
import PublicProfilePage from './Pages/PublicProfilePage';
import ProfileSettingsPage from './Pages/ProfileSettingsPage';

function App() {
  return (
    <div>
        <Router>
            <Routes>
                <Route Component={HomePage} exact path='/' />
                <Route Component={LoginPage} path='/login' />
                <Route Component={SignupPage} path='/signup' />
                <Route Component={SignupTypePage} path='/type' />
                <Route Component={ContactInfoPage} path='/settings/contact-info' />
                <Route Component={PublicProfilePage} path='/profile' />
                <Route Component={ProfileSettingsPage} path='/my-profile' />
            </Routes>
        </Router>
    </div>
  );
}

export default App;
