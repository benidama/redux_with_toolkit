import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import NotFound from './pages/NotFound';
import Navigation from './components/Navigation';
import Login from './components/Login';
import CreateAccount from './components/CreateAccount';
import OtpVerification from './components/OtpVerification';
import ClientDashboard from './pages/ClientDashboard';
import WorkerDashboard from './pages/WorkerDashboard';
import LeaderDashboard from './pages/LeaderDashboard';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/sign-in" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/verify-otp" element={<OtpVerification />} />
        <Route path="/client-dashboard" element={<ClientDashboard />} />
        <Route path="/worker-dashboard" element={<WorkerDashboard />} />
        <Route path="/leader-dashboard" element={<LeaderDashboard />} />
        <Route path="/*" element={
          <div>
            <Navigation />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        } />
      </Routes>
    </Router>
  );
};

export default App;