import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Layouts/Header';
import Sidebar from './components/Layouts/Sidebar';
import Footer from './components/Layouts/Footer';
import Main from './components/Layouts/Maincontents'; // Router của khách
import AdminLayout from './components/pages/Admin/Admin'; // Layout admin


function App() {
  return (
    <Router>
      <Routes>
        {/* Layout dành cho khách */}
        <Route
          path="/*"
          element={
            <div className="bg-[rgba(105,105,170,0.1)] min-h-screen">
              <Header />
              <Sidebar />
              <Main />
              <Footer />
            </div>
          }
        />

        {/* Layout dành cho admin */}
        <Route path="/admin/*" element={<AdminLayout />}>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
