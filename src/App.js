import './App.css';
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom"
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import SignupTypePage from './Pages/SignupTypePage';
import ContactInfoPage from './Pages/ContactInfoPage';
import PublicProfilePage from './Pages/PublicProfilePage';
import ProfileSettingsPage from './Pages/ProfileSettingsPage';
import ForgotPage from './Pages/ForgotPage';
import ResetPage from './Pages/ResetPage';
import PostJobPage from './Pages/PostJobPage';
import JobViewPage from './Pages/JobViewPage';
import ChatPage from './Pages/ChatPage';
import MyPostsPage from './Pages/MyPostsPage';
import { useSelector } from 'react-redux';

function App() {

  const {type} = useSelector(state => state.user)

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
                <Route Component={ForgotPage} path='/forgot-password' />
                <Route Component={ResetPage} path='/reset/:key' />
                <Route Component={PostJobPage} path='/post-job' />
                <Route Component={JobViewPage} path='/post-view' />
                <Route Component={ChatPage} path='/chats' />

                <Route element={type === "client" ? <MyPostsPage/> : <Navigate to={"/"}/>} path='/my-posts' />
            </Routes>
        </Router>
    </div>
  );
}

export default App;
