import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from "react-router-dom";
import Main from './Main_Component.tsx'; 

const App = () => {
  const location = useLocation();



  return (
    <React.StrictMode>
      <Routes>
        <Route path="/" element={<Main />} />
      

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
