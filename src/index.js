import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from "react-router-dom";
import NavBar from './Navbar_Component.tsx';
import CV from './CV_Component.tsx';
import Main from './Main_Component.tsx'; // Assuming you have a Main component

const App = () => {
  const location = useLocation();

  const hideNavBar = location.pathname === '/cv';

  return (
    <React.StrictMode>
      {!hideNavBar && <NavBar />}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/cv" element={<CV />} />

      </Routes>
    </React.StrictMode>
  );
}

const rootContainer = ReactDOM.createRoot(document.getElementById('root'));
rootContainer.render(
  <Router>
    <App />
  </Router>
);
