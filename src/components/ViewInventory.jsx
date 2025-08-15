import {
    CCard, CCardBody, CTable, CTableHead, CTableRow,
    CTableHeaderCell, CTableBody, CTableDataCell, CButton,
    CFormInput, CFormTextarea, CFormCheck,
} from '@coreui/react';
import React, { useEffect, useRef, useState } from 'react';
import { getInventory, deleteInventory, editInventory } from '../services/apiSetup';
import CIcon from '@coreui/icons-react';
import { cilPencil, cilTrash } from '@coreui/icons';
import { useToast } from '../hooks/ToastContext';

export default function ViewInventory() {
    const [inventory, setInventory] = useState([]);
    const [filter, setFilter] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editData, setEditData] = useState({});
    const { showToast } = useToast();
    const componentMount = useRef(false);

    const fetchInventory = async () => {
        try {
            const response = await getInventory();
            setInventory(response);
            if(!componentMount.current) {
                componentMount.current = true;
            }
        } catch (error) {
            console.error('Error fetching inventory:', error);
            showToast('Failed to fetch inventory.', 'danger');
            setInventory([]);
        }
    };

    useEffect(() => {
        fetchInventory(); // Fetch inventory on component mount
    }, []);

    useEffect(() => {
        setFilter(inventory); // Reset filtered list when inventory changes
    }, [inventory]);

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);

        if (value.trim() === '') {
            setFilter(inventory); // Reset filter if search term is empty
            return;
        }
        if (value) {
            const filtered = inventory.filter(item =>
                item.invCode.toLowerCase().includes(value) ||
                item.description.toLowerCase().includes(value) ||
                item.ingredients.toLowerCase().includes(value)
            );
            setFilter(filtered); // Show filtered value
        } else {
            setFilter(inventory); // Show display list of all items
        }
    }

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
            await editInventory(editData);
            showToast('Item updated successfully!', 'success');
            setEditingId(null);
            setEditData({});
            fetchInventory(true);
        } catch (error) {
            console.error('Error updating inventory:', error);
            showToast('Failed to update item. Please try again.', 'danger');
        }
    };

    const handleDelete = async (item) => {
        try {
            await deleteInventory(item.invCode);
            showToast('Item deleted successfully!', 'success');
            console.log('Item deleted:', item.invCode);
            setEditingId(null);
            setEditData({});
            fetchInventory(true);
        } catch (error) {
            console.error('Delete failed:', error);
            showToast('Error deleting item.', 'danger');
        }
    };

    return (
        <CCard className="view-inventory-card">
            <CCardBody style={{  }}>
                <div className='d-flex justify-content-between align-items-center pb-2'>
                    <h4 className="form-header">Inventory List</h4>
                    <CFormInput
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleSearch}
                        style={{ width: '250px' }}
                    />
                </div>
                <div style={{ overflowY: 'auto', maxHeight: '300px' }}>
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
                            {Array.isArray(filter) && filter.map((item) => (
                                <CTableRow key={item.invCode}>
                                    <CTableDataCell>
                                        {editingId === item.invCode
                                            ? <CFormInput value={editData.invCode} disabled />
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
                                                <CButton color="success" size="sm" className="me-2 mb-1" onClick={handleSave}>
                                                    Save
                                                </CButton>
                                                <CButton color="danger" size="sm" className='mb-1' onClick={() => setEditingId(null)}>
                                                    Cancel
                                                </CButton>
                                            </>
                                        ) : (
                                            <>
                                                <div className='d-flex gap-0'>
                                                    <CButton size="sm" className="me-2 d-inline-flex align-items-center" style={{ whiteSpace: 'nowrap'}} onClick={() => handleEditClick(item)}>
                                                        <CIcon icon={cilPencil} style={{ color: 'green', width: '16px', height: '16px' }}/><span className='ms-1'>Edit</span>
                                                    </CButton>
                                                    <CButton size="sm" className='d-inline-flex align-items-center' style={{ whiteSpace: 'nowrap'}} onClick={() => handleDelete(item)}>
                                                        <CIcon icon={cilTrash} style={{ color: 'red', width: '16px', height: '16px' }}/><span className='ms-1'>Delete</span>
                                                    </CButton>
                                                </div>
                                            </>
                                        )}
                                    </CTableDataCell>
                                </CTableRow>
                            ))}
                        </CTableBody>
                    </CTable>
                </div>
            </CCardBody>
        </CCard>
    );
}
