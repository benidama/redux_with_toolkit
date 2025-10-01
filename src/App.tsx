import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import NotFound from './pages/NotFound';
import Navigation from './components/Navigation';
import Login from './components/Login';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/sign-in" element={<Login onLogin={async () => {}} />} />
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