import {
    CCard, CCardBody, CTable, CTableHead, CTableRow,
    CTableHeaderCell, CTableBody, CTableDataCell, CButton,
    CFormInput, CFormTextarea, CFormCheck,
    CToaster,
    CToast,
    CToastBody
} from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { getInventory, deleteInventory, editInventory } from '../services/apiSetup';
import CIcon from '@coreui/icons-react';
import { cilPencil, cilTrash } from '@coreui/icons';

export default function ViewInventory() {
    const [inventory, setInventory] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editData, setEditData] = useState({});
    const [toastList, setToastList] = useState([]);

    // Trigger toasts
    const displayToast = (message, color = 'info') => {
        setToastList((prev) => [
            ...prev,
            { message, color, autohide: true, visible: true, timestamp: new Date().toISOString()}
        ])
    }

    const fetchInventory = async () => {
        try {
            const response = await getInventory();
            setInventory(response);
            displayToast('Inventory fetched successfully!', 'success');
        } catch (error) {
            console.error('Error fetching inventory:', error);
            displayToast('Failed to fetch inventory. Please try again later.', 'danger');
            setInventory([]);
        }
    };

    useEffect(() => {
        fetchInventory();
    }, []);

    const handleEditClick = (item) => {
        setEditingId(item.invCode);
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
            await editInventory(editData.invCode, editData);
            displayToast('Item updated successfully!', 'success');
            setEditingId(null);
            setEditData({});
            fetchInventory();
        } catch (error) {
            console.error('Error updating inventory:', error);
            displayToast('Failed to update item. Please try again.', 'danger');
        }
    };

    const handleDelete = async (item) => {
        try {
            await deleteInventory(item.invCode);
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
                            <CTableHeaderCell>Invoice Code</CTableHeaderCell>
                            <CTableHeaderCell>Description</CTableHeaderCell>
                            <CTableHeaderCell>Ingredients</CTableHeaderCell>
                            <CTableHeaderCell>Blocked</CTableHeaderCell>
                            <CTableHeaderCell>High Value</CTableHeaderCell>
                            <CTableHeaderCell>Actions</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {Array.isArray(inventory) && inventory.map((item) => (
                        <CTableRow key={item.invCode}>
                            <CTableDataCell>
                                {editingId === item.invCode
                                    ? <CFormInput value={editData.invCode} onChange={(e) => setEditData({...editData, invCode: e.target.value})} />
                                    : item.invCode}
                            </CTableDataCell>
                            <CTableDataCell>
                                {editingId === item.invCode
                                    ? <CFormTextarea rows={2} value={editData.description} onChange={(e) => setEditData({...editData, description: e.target.value})} />
                                    : item.description}
                            </CTableDataCell>
                            <CTableDataCell>
                                {editingId === item.invCode
                                    ? <CFormTextarea rows={2} value={editData.ingredients} onChange={(e) => setEditData({...editData, ingredients: e.target.value})} />
                                    : item.ingredients}
                            </CTableDataCell>
                            <CTableDataCell>
                                {editingId === item.invCode
                                    ? <CFormCheck checked={editData.blocked} onChange={(e) => setEditData({...editData, blocked: e.target.checked})} />
                                    : item.blocked ? 'Yes' : 'No'}
                            </CTableDataCell>
                            <CTableDataCell>
                                {editingId === item.invCode
                                    ? <CFormCheck checked={editData.highValue} onChange={(e) => setEditData({...editData, highValue: e.target.checked})} />
                                    : item.highValue ? 'Yes' : 'No'}
                            </CTableDataCell>
                            <CTableDataCell>
                                {editingId === item.invCode ? (
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
                                        <div className='d-flex'>
                                            <CButton color="warning" size="sm" className="me-2" onClick={() => handleEditClick(item)}>
                                                <CIcon icon={cilPencil} style={{ color: 'green', width: '16px', height: '16px' }}/>Edit
                                            </CButton>
                                            <CButton color="danger" size="sm" onClick={() => handleDelete(item)}>
                                                <CIcon icon={cilTrash} style={{ color: 'red', width: '16px', height: '16px' }}/>Delete
                                            </CButton>
                                        </div>
                                    </>
                                )}
                            </CTableDataCell>
                        </CTableRow>
                        ))}
                    </CTableBody>
                </CTable>
                <CToaster placement="top-center">
                    {toastList.map((toast) => (
                        <CToast key={toast.timestamp} color={toast.color} autohide visible>
                            <CToastBody>{toast.message}</CToastBody>
                        </CToast>
                    ))}
                </CToaster>
            </CCardBody>
        </CCard>
  );
}
