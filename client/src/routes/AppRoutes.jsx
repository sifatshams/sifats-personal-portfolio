import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AiChatSection from '../components/AiChatSection';

import DashboardLayout from '../layout/DashboardLayout';
import MainLayout from '../layout/MainLayout';

import AboutPage from '../pages/AboutPage';
import ContactPage from '../pages/ContactPage';
import ForgotPassword from '../pages/ForgotPassword';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import RegisterPage from '../pages/RegisterPage';
import ResetPassword from '../pages/ResetPassword';
import ServicePage from '../pages/ServicePage';
import TermsPage from '../pages/TermsPage';
import VerifyEmail from '../pages/VerifyEmail';
import VerifyEmailNotice from '../pages/VerifyEmailNotice';
import VerifyResetOTP from '../pages/VerifyResetOTP';

import UserDashboard from '../pages/user-dashboard/UserDashboard';
import ProfilePage from '../pages/user-dashboard/UserProfilePage';

import AllMessagesPage from '../pages/admin/AllMessagesPage';
import AdminDashboard from '../pages/admin/DashboardPage';
import MessageDetailsPage from '../pages/admin/MessageDetailsPage';

import CreateProjectPage from '../pages/admin/CreateProjectPage';
import EditProjectPage from '../pages/admin/EditProjectPage';
import ProjectDetailsPage from '../pages/admin/ProjectDetailsPage';
import ProjectsPage from '../pages/admin/ProjectsPage';

import ErrorPage from '../pages/not-found/ErrorPage';

import VisitorChart from '../components/admin_dashboard/VisitorChart';
import AdminLayout from '../layout/AdminLayout';
import AdminProfilePage from '../pages/admin/ProfilePage';
import SettingsPage from '../pages/admin/settings/SettingsPage';
import AdminRoute from './AdminRoute';
import PrivateRoute from './PrivateRoute';

import ProgressBar from '../components/ProgressBar';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      {/* progress bar */}
      <ProgressBar />

      <Routes>
        {/* public */}

        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />

          <Route path="about" element={<AboutPage />} />
          <Route path="service" element={<ServicePage />} />
          <Route path="contact" element={<ContactPage />} />

          {/* auth */}
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />

          {/* email verification */}
          <Route path="verify-email-notice" element={<VerifyEmailNotice />} />

          <Route path="verify-email/:token" element={<VerifyEmail />} />

          {/* forgot Password */}
          <Route path="forgot-password" element={<ForgotPassword />} />

          <Route path="verify-reset-otp" element={<VerifyResetOTP />} />

          <Route path="reset-password" element={<ResetPassword />} />

          {/* policies */}
          <Route path="privacy-policy" element={<PrivacyPolicy />} />

          <Route path="terms" element={<TermsPage />} />

          {/* AI */}
          <Route path="ai-chat" element={<AiChatSection />} />
        </Route>

        {/* user dashboard */}

        <Route
          path="/user-dashboard"
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<UserDashboard />} />

          <Route path="profile" element={<ProfilePage />} />
        </Route>

        {/* admin dashboard */}

        <Route
          path="/admin-dashboard"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          {/* dashboard */}
          <Route index element={<AdminDashboard />} />

          {/* profile */}
          <Route path="profile" element={<AdminProfilePage />} />

          {/* settings */}
          <Route path="settings" element={<SettingsPage />} />

          {/* messages */}
          <Route path="messages" element={<AllMessagesPage />} />
          <Route path="messages/:id" element={<MessageDetailsPage />} />

          {/* projects */}
          <Route path="projects" element={<ProjectsPage />} />

          <Route path="projects/create" element={<CreateProjectPage />} />

          <Route path="projects/:id" element={<ProjectDetailsPage />} />

          <Route path="projects/edit/:id" element={<EditProjectPage />} />

          {/* analytics */}
          <Route path="analytics" element={<VisitorChart />} />
        </Route>

        {/* 404 */}

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
