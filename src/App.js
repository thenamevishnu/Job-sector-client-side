import './App.css';
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom"
import HomePage from './Pages/Users/HomePage';
import LoginPage from './Pages/Users/LoginPage';
import SignupPage from './Pages/Users/SignupPage';
import SignupTypePage from './Pages/Users/SignupTypePage';
import ContactInfoPage from './Pages/Users/ContactInfoPage';
import PublicProfilePage from './Pages/Users/PublicProfilePage';
import ProfileSettingsPage from './Pages/Users/ProfileSettingsPage';
import ForgotPage from './Pages/Users/ForgotPage';
import ResetPage from './Pages/Users/ResetPage';
import PostJobPage from './Pages/Users/Client/PostJobPage';
import JobViewPage from './Pages/Users/JobViewPage';
import ChatPage from './Pages/Chats/ChatPage';
import MyPostsPage from './Pages/Users/Client/MyPostsPage';
import { useSelector } from 'react-redux';
import MyProposalsPage from './Pages/Users/Freelancer/MyProposalsPage';
import ViewPostPage from './Pages/Users/Client/ViewPostPage';
import PostEditPage from './Pages/Users/Client/PostEditPage';
import AdminLoginPage from './Pages/Admins/AdminLoginPage';

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
                <Route Component={MyProposalsPage} path='/my-proposals' />

                <Route element={type === "client" ? <MyPostsPage/> : <Navigate to={"/"}/>} path='/my-posts' />
                <Route element={type === "client" && <ViewPostPage />} path='/view-post' />
                <Route element={type === "client" && <PostEditPage />} path='/post-edit' />

                <Route element={<AdminLoginPage/>} path='/admin/login' />
            </Routes>
        </Router>
    </div>
  );
}

export default App;
