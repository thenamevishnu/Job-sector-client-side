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
import { ToastContainer } from 'react-toastify';
import BalancePage from './Pages/Users/BalancePage';
import PaymentsPage from './Pages/Users/PaymentsPage';
import ManageNotificationPage from './Pages/Users/ManageNotificationPage';
import PasswordSecurityPage from './Pages/Users/PasswordSecurityPage';
import DeleteAccountPage from './Pages/Users/DeleteAccountPage';
import SearchPostPage from './Pages/Users/SearchPostPage';
import AdminIndexPage from './Pages/Admins/AdminIndexPage';
import AdminLoginPage from "./Pages/Admins/AdminLoginPage"
import FreelancerReportPage from './Pages/Users/Freelancer/FreelancerReportPage';
import ClientReportPage from './Pages/Users/Client/ClientReportPage';
import UserManagePage from './Pages/Admins/UserManagePage';
import PostManagePage from './Pages/Admins/PostManagePage';
import Broadcast from './Pages/Admins/Broadcast';
import PaymentManagePage from './Pages/Admins/PaymentManagePage';
import VideoCallPage from './Pages/VideoCall/VideoCallPage';

function App() {

  const {type} = useSelector(state => state.user)

  return (
    <div>
        <Router>
            <Routes>
                <Route element={<HomePage/>} exact path='/' />
                <Route element={<LoginPage/>} path='/login' />
                <Route element={<SignupPage/>} path='/signup' />
                <Route element={<SignupTypePage/>} path='/type' />
                <Route element={<ContactInfoPage/>} path='/settings/contact-info' />
                <Route element={<PublicProfilePage/>} path='/profile' />
                <Route element={<BalancePage/>} path='/settings/balance' />
                <Route element={<PaymentsPage/>} path='/settings/payments' />
                <Route element={<ProfileSettingsPage/>} path='/my-profile' />
                <Route element={<ForgotPage/>} path='/forgot-password' />
                <Route element={<ResetPage/>} path='/reset/:key' />
                <Route element={<JobViewPage/>} path='/post-view' />
                <Route element={<SearchPostPage/>} path='/search' />
                <Route element={<ChatPage/>} path='/chats' />
                <Route element={<ManageNotificationPage/>} path='/settings/notifications' />
                <Route element={<PasswordSecurityPage/>} path='/settings/password-security' />
                <Route element={<DeleteAccountPage/>} path='/settings/delete-account' />

                <Route element={type === "freelancer" ? <MyProposalsPage/> : <Navigate to={"/my-posts"}/>} path='/my-proposals' />

                <Route element={type === "client" ? <PostJobPage/> : <Navigate to={"/"}/>} path='/post-job' />
                <Route element={type === "client" ? <MyPostsPage/> : <Navigate to={"/my-proposals"}/>} path='/my-posts' />
                <Route element={type === "client" && <ViewPostPage />} path='/view-post' />
                <Route element={type === "client" && <PostEditPage />} path='/post-edit' />
                <Route element={type === "client" ? <ClientReportPage/> : <FreelancerReportPage/>} path="/settings/reports"/>

                <Route element={<AdminIndexPage/>} path='/admin' />
                <Route element={<AdminLoginPage/>} path='/admin/login'/>
                <Route element={<UserManagePage/>} path='/admin/user_management'/>
                <Route element={<PostManagePage/>} path='/admin/post_management'/>
                <Route element={<Broadcast/>} path='/admin/notify'/>
                <Route element={<PaymentManagePage/>} path='/admin/payouts' />

                <Route element={<VideoCallPage/>} path='/chats/video/:room_id'/>

                
            </Routes>
        </Router>
        <ToastContainer/>
    </div>
  );
}

export default App;
