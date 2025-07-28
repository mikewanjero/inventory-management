import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CreateInventory from './components/CreateInventory';
import ViewInventory from './components/ViewInventory';
import { CContainer } from '@coreui/react';
import Header from './components/Navigation/Header';
import Sidebar from './components/Navigation/Sidebar';
import { ToastProvider } from './components/ToastProvider';

function App() {
  return (
    <ToastProvider>
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
    </ToastProvider>
  );
}

export default App;
