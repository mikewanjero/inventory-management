import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CreateInventory from './components/CreateInventory';
import ViewInventory from './components/ViewInventory';
import EditInventory from './components/EditInventory';
import DeleteInventory from './components/DeleteInventory';
import { CContainer, CNavbar, CNavItem, CNavLink } from '@coreui/react';

function App() {
  return (
    <Router>
      <CNavbar colorScheme="light" className="mb-4">
        <CNavItem><CNavLink component={Link} to="/">Create</CNavLink></CNavItem>
        <CNavItem><CNavLink component={Link} to="/view">View</CNavLink></CNavItem>
        <CNavItem><CNavLink component={Link} to="/edit">Edit</CNavLink></CNavItem>
        <CNavItem><CNavLink component={Link} to="/delete">Delete</CNavLink></CNavItem>
      </CNavbar>

      <CContainer>
        <Routes>
          <Route path="/" element={<CreateInventory />} />
          <Route path="/view" element={<ViewInventory />} />
          <Route path="/edit" element={<EditInventory id={1} />} /> {/* Replace 1 with dynamic ID later */}
          <Route path="/delete" element={<DeleteInventory id={1} />} />
        </Routes>
      </CContainer>
    </Router>
  );
}

export default App;
