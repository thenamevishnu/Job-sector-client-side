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
import ChangePasswordPage from './Pages/Users/Freelancer/ChangePasswordPage';
import ContactPage from './Pages/Users/ContactPage';
import ClientProfilePage from './Pages/Users/Client/ClientProfilePage';
import ClientPublicProfilePage from './Pages/Users/Client/ClientPublicProfilePage';
import NotFound from './Components/NotFound';

function App() {

  const {type} = useSelector(state => state.user)

  return (
    <div>
        <Router>
            <Routes>
                <Route element={type ? <HomePage/> : <Navigate to={"/login"}/>} exact path='/' />
                <Route element={type ? <Navigate to={"/"}/> : <LoginPage/>} path='/login' />
                <Route element={type ? <Navigate to={"/"}/> : <SignupPage/>} path='/signup' />
                <Route element={type ? <Navigate to={"/"}/> : <SignupTypePage/>} path='/type' />
                <Route element={type ? <ContactInfoPage/> : <Navigate to={"/login"}/>} path='/settings/contact-info' />
                <Route element={type ? <PublicProfilePage/> : <Navigate to={"/login"}/>} path='/profile' />
                <Route element={type ? <BalancePage/> : <Navigate to={"/login"}/>} path='/settings/balance' />
                <Route element={type ? <PaymentsPage/> : <Navigate to={"/login"}/>} path='/settings/payments' />
                <Route element={type ? type==="freelancer" ? <ProfileSettingsPage/> : <ClientProfilePage/> : <Navigate to={"/login"}/>} path='/my-profile' />
                <Route element={type ? <Navigate to={"/"}/> : <ForgotPage/>} path='/forgot-password' />
                <Route element={type ? <Navigate to={"/"}/> : <ResetPage/>} path='/reset/:key' />
                <Route element={type ? <JobViewPage/> : <Navigate to={"/login"}/>} path='/post-view' />
                <Route element={type ? <SearchPostPage/> : <Navigate to={"/login"}/>} path='/search' />
                <Route element={type ? <ChatPage/> : <Navigate to={"/login"}/>} path='/chats' />
                <Route element={type ? <ManageNotificationPage/> : <Navigate to={"/login"}/>} path='/settings/notifications' />
                <Route element={type ? <PasswordSecurityPage/> : <Navigate to={"/login"}/>} path='/settings/password-security' />
                <Route element={type ? <DeleteAccountPage/> : <Navigate to={"/login"}/>} path='/settings/delete-account' />
                <Route element={type ? <ChangePasswordPage/> : <Navigate to={"/login"}/>} path='/settings/change-password'/>
                <Route element={type ? <ContactPage/> : <Navigate to={"/login"}/>} path='/contact' />
                <Route element={type ? <ClientPublicProfilePage/> : <Navigate to={"/login"}/>} path='/client-profile' />
                <Route element={type ? type === "freelancer" ? <MyProposalsPage/> : <Navigate to={"/my-posts"}/> : <Navigate to={"/login"}/>} path='/my-proposals' />

                <Route element={type ? type === "client" ? <PostJobPage/> : <Navigate to={"/"}/> : <Navigate to={"/login"}/>} path='/post-job' />
                <Route element={type ? type === "client" ? <MyPostsPage/> : <Navigate to={"/my-proposals"}/> : <Navigate to={"/login"}/>} path='/my-posts' />
                <Route element={type ? type === "client" && <ViewPostPage /> : <Navigate to={"/login"}/>} path='/view-post' />
                <Route element={type ? type === "client" && <PostEditPage /> : <Navigate to={"/login"}/>} path='/post-edit' />
                <Route element={type ? type === "client" ? <ClientReportPage/> : <FreelancerReportPage/> : <Navigate to={"/login"}/>} path="/settings/reports"/>

                <Route element={<AdminIndexPage/>} path='/admin' />
                <Route element={<AdminLoginPage/>} path='/admin/login'/>
                <Route element={<UserManagePage/>} path='/admin/user_management'/>
                <Route element={<PostManagePage/>} path='/admin/post_management'/>
                <Route element={<Broadcast/>} path='/admin/notify'/>
                <Route element={<PaymentManagePage/>} path='/admin/payouts' />

                <Route element={<VideoCallPage/>} path='/chats/video/:room_id'/>

                <Route element={<NotFound/>} path='*'/>
            </Routes>
        </Router>
        <ToastContainer/>
    </div>
  );
}

export default App;
