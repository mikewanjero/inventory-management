import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CreateInventory from './components/CreateInventory';
import ViewInventory from './components/ViewInventory';
import EditInventory from './components/EditInventory';
import DeleteInventory from './components/DeleteInventory';
import { CContainer, CNavbar, CNavItem, CNavLink } from '@coreui/react';
import Header from './components/Navigation/Header';
import Sidebar from './components/Navigation/Sidebar';

function App() {
  return (
    <Router>
      <div className="app-layout">
        <Sidebar />
        <div className="main-content">
          <Header />
          <CContainer className='pt-4'>
            <Routes>
              <Route path="/" element={<CreateInventory />} />
              <Route path="/view" element={<ViewInventory />} />
            </Routes>
          </CContainer>
        </div>
      </div>
    </Router>
  );
}

export default App;
