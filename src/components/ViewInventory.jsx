import {
    CCard, CCardBody, CTable, CTableHead, CTableRow,
    CTableHeaderCell, CTableBody, CTableDataCell, CButton,
    CFormInput, CFormTextarea, CFormCheck
} from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { getInventory, deleteInventory, editInventory } from '../services/apiSetup';

export default function ViewInventory() {
    const [inventory, setInventory] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editData, setEditData] = useState({});

    const fetchInventory = async () => {
        try {
            const response = await getInventory();
            setInventory(response.data);
        } catch (error) {
            console.error('Error fetching inventory:', error);
        }
    };

    useEffect(() => {
        fetchInventory();
    }, []);

    const handleEditClick = (item) => {
        setEditingId(item.id);
        setEditData({
            invCode: item.invCode,
            description: item.description,
            ingredients: item.ingredients,
            blocked: item.blocked,
            highValue: item.highValue,
        });
    };

    const handleSave = async () => {
        try {
            await editInventory(editingId, editData);
            setEditingId(null);
            setEditData({});
            fetchInventory();
        } catch (error) {
            console.error('Error updating inventory:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteInventory(id);
            fetchInventory();
        } catch (error) {
            console.error('Delete failed:', error);
        }
    };

  return (
    <CCard className="view-inventory-card">
        <CCardBody>
            <h4 className="form-header">Inventory List</h4>
            <CTable bordered responsive hover className="inventory-table">
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
                        <CTableDataCell>
                            {editingId === item.id
                                ? <CFormInput value={editData.invCode} onChange={(e) => setEditData({...editData, invCode: e.target.value})} />
                                : item.invCode}
                        </CTableDataCell>
                        <CTableDataCell>
                            {editingId === item.id
                                ? <CFormTextarea rows={2} value={editData.description} onChange={(e) => setEditData({...editData, description: e.target.value})} />
                                : item.description}
                        </CTableDataCell>
                        <CTableDataCell>
                            {editingId === item.id
                                ? <CFormTextarea rows={2} value={editData.ingredients} onChange={(e) => setEditData({...editData, ingredients: e.target.value})} />
                                : item.ingredients}
                        </CTableDataCell>
                        <CTableDataCell>
                            {editingId === item.id
                                ? <CFormCheck checked={editData.blocked} onChange={(e) => setEditData({...editData, blocked: e.target.checked})} />
                                : item.blocked ? 'Yes' : 'No'}
                        </CTableDataCell>
                        <CTableDataCell>
                            {editingId === item.id
                                ? <CFormCheck checked={editData.highValue} onChange={(e) => setEditData({...editData, highValue: e.target.checked})} />
                                : item.highValue ? 'Yes' : 'No'}
                        </CTableDataCell>
                        <CTableDataCell>
                            {editingId === item.id ? (
                                <>
                                <CButton color="success" size="sm" className="me-2" onClick={handleSave}>
                                    Save
                                </CButton>
                                <CButton color="secondary" size="sm" onClick={() => setEditingId(null)}>
                                    Cancel
                                </CButton>
                                </>
                            ) : (
                                <>
                                <CButton color="warning" size="sm" className="me-2" onClick={() => handleEditClick(item)}>
                                    Edit
                                </CButton>
                                <CButton color="danger" size="sm" onClick={() => handleDelete(item.id)}>
                                    Delete
                                </CButton>
                                </>
                            )}
                        </CTableDataCell>
                    </CTableRow>
                    ))}
                </CTableBody>
            </CTable>
        </CCardBody>
    </CCard>
  );
}
