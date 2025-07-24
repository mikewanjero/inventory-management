import React, { useEffect, useState } from 'react'
import { CButton, CCard, CCardBody, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react';
import { deleteInventory, getInventory } from '../services/apiSetup';

export default function ViewInventory() {
    const [inventory, setInventory] = useState([]);

    const fetchInventory = async () => {
        try {
            const response = await getInventory();
            setInventory(response.data);
            console.log('Fetched inventory:', response);
        } catch (error) {
            console.error('Error fetching inventory:', error);
            setInventory([]);
            alert('Failed to fetch inventory. Please try again later.');
        }
    };

    useEffect(() => {
        fetchInventory();
    }, [])

    const handleDelete = async (id) => {
        try {
            await deleteInventory(id);
            fetchInventory();
            alert('Item deleted successfully!');
        } catch (error) {
            console.error('Failed to delete inventory!', error);
            alert('Failed to delete inventory. Please try again later.');
            fetchInventory();
        }
    }

    return (
        <CCard className="view-inventory-card">
            <CCardBody>
                <h4 className="form-header">Inventory List</h4>
                <CTable className='inventory-table' bordered responsive hover>
                    <CTableHead>
                        <CTableRow>
                            <CTableHeaderCell>ID</CTableHeaderCell>
                            <CTableHeaderCell>Invoice Code</CTableHeaderCell>
                            <CTableHeaderCell>Description</CTableHeaderCell>
                            <CTableHeaderCell>Ingredients</CTableHeaderCell>
                            <CTableHeaderCell>Blocked</CTableHeaderCell>
                            <CTableHeaderCell>High Value</CTableHeaderCell>
                            <CTableHeaderCell>Actions</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {inventory.map((item) => (
                        <CTableRow key={item.id}>
                            <CTableDataCell>{item.id}</CTableDataCell>
                            <CTableDataCell>{item.invCode}</CTableDataCell>
                            <CTableDataCell>{item.description}</CTableDataCell>
                            <CTableDataCell>{item.ingredients}</CTableDataCell>
                            <CTableDataCell>{item.blocked ? 'Yes' : 'No'}</CTableDataCell>
                            <CTableDataCell>{item.highValue ? 'Yes' : 'No'}</CTableDataCell>
                            <CTableDataCell>
                                <CButton
                                    color="warning"
                                    size="sm"
                                    className="me-2"
                                    onClick={() => window.location.href = `/edit?id=${item.id}`}
                                >
                                    Edit
                                </CButton>
                                <CButton
                                    color="danger"
                                    size="sm"
                                    onClick={() => handleDelete(item.id)}
                                >
                                    Delete
                                </CButton>
                            </CTableDataCell>
                        </CTableRow>
                        ))}
                    </CTableBody>
                </CTable>
            </CCardBody>
        </CCard>
  );
}
