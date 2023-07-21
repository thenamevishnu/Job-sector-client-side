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
import { ToastContainer } from 'react-toastify';

function App() {

  const {type} = useSelector(state => state.user)
  const userStorage = localStorage.getItem("userStorage")
  const adminStorage = localStorage.getItem("adminStorage")

  return (
    <div>
        <Router>
            <Routes>
                <Route element={userStorage ? <HomePage/> : <Navigate to={"/login"}/>} exact path='/' />
                <Route element={userStorage ? <Navigate to={"/"}/> : <LoginPage/>} path='/login' />
                <Route element={userStorage ? <Navigate to={"/"}/> : <SignupPage/>} path='/signup' />
                <Route element={userStorage ? <Navigate to={"/"}/> : <SignupTypePage/>} path='/type' />
                <Route element={userStorage ? <ContactInfoPage/> : <Navigate to={"/login"}/>} path='/settings/contact-info' />
                <Route element={userStorage ? <PublicProfilePage/> : <Navigate to={"/login"}/>} path='/profile' />
                <Route element={userStorage ? <ProfileSettingsPage/> : <Navigate to={"/login"}/>} path='/my-profile' />
                <Route element={userStorage ? <Navigate to={"/"}/> : <ForgotPage/>} path='/forgot-password' />
                <Route element={userStorage ? <Navigate to={"/"}/> : <ResetPage/>} path='/reset/:key' />
                <Route element={userStorage ? <JobViewPage/> : <Navigate to={"/login"}/>} path='/post-view' />
                <Route element={userStorage ? <ChatPage/> : <Navigate to={"/login"}/>} path='/chats' />

                <Route element={!userStorage ?  <Navigate to={"/login"}/> : type === "freelancer" ? <MyProposalsPage/> : <Navigate to={"/my-posts"}/>} path='/my-proposals' />

                <Route element={!userStorage ?  <Navigate to={"/login"}/> : type === "client" ? <PostJobPage/> : <Navigate to={"/"}/>} path='/post-job' />
                <Route element={!userStorage ?  <Navigate to={"/login"}/> : type === "client" ? <MyPostsPage/> : <Navigate to={"/my-proposals"}/>} path='/my-posts' />
                <Route element={!userStorage ?  <Navigate to={"/login"}/> : type === "client" && <ViewPostPage />} path='/view-post' />
                <Route element={!userStorage ?  <Navigate to={"/login"}/> : type === "client" && <PostEditPage />} path='/post-edit' />

                <Route element={!adminStorage ?  <Navigate to={"/login"}/> : <AdminLoginPage/>} path='/admin/login' />
            </Routes>
        </Router>
        <ToastContainer limit={1}/>
    </div>
  );
}

export default App;
