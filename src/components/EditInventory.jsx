import React, { useState } from 'react'
import { editInventory } from '../services/apiSetup';
import { CButton, CFormInput, CModal, CModalBody, CModalFooter, CModalHeader, CToast, CToastBody, CToaster } from '@coreui/react';

export default function EditInventory({id}) {
    const [data, setData] = useState({ name: '', quantity: ''});
    const [modalIsVisible, setModalIsVisible] = useState(false);
    const [toast, setToast] = useState(false);

    const handleEdit = async () => {
        try {
            await editInventory(id, data);
            setToast(true);
            setModalIsVisible(false);
            console.log('Inventory updated successfully!', data);
        } catch (error) {
            console.error('Failed to update inventory!', error);
            setToast(true);
            setModalIsVisible(false);
            setData({ name: '', quantity: ''});
        }
    }

  return (
    <>
        <CButton color="warning" onClick={() => setModalIsVisible(true)}>Edit Item</CButton>

        <CModal visible={modalIsVisible} onClose={() => setModalIsVisible(false)}>
        <CModalHeader>Edit Inventory Item</CModalHeader>

        <CModalBody>
            <CFormInput label="Name: " value={data.name} onChange={(e) => setData({...data, name: e.target.value})} />
            <CFormInput label="Quantity: " type="number" value={data.quantity} onChange={(e) => setData({...data, quantity: e.target.value})} />
        </CModalBody>

        <CModalFooter>
            <CButton color="primary" onClick={handleEdit}>Update</CButton>
            <CButton color="secondary" onClick={() => setModalIsVisible(false)}>Cancel</CButton>
        </CModalFooter>
        </CModal>

        <CToaster placement="top-end">
        {toast && (
            <CToast autohide visible>
                <CToastBody>Item updated successfully!</CToastBody>
            </CToast>
        )}
        </CToaster>
    </>
  )
}
