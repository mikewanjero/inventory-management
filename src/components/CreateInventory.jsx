import React, { useState } from 'react';
import { createInventory } from '../services/apiSetup';
import { CButton, CFormInput, CModal, CModalBody, CModalFooter, CModalHeader, CToast, CToaster } from '@coreui/react';

export default function CreateInventory() {
    const [item, setItem] = useState({ name: '', quantity : '' });
    const [modalIsVisible, setModalIsVisible] = useState(false);
    const [toast, setToast] = useState(false);

    const handleSubmit = async () => {
        try {
            const response = await createInventory(item);
            console.log("Inventory created successfully:", response);
            setToast(true);
            setModalIsVisible(false);
            setItem({ name: '', quantity: '' });
        } catch (error) {
            console.error("Failed to create inventory:", error);
            setItem({ name: '', quantity: '' });
        }
    }

  return (
    <>
        <CButton onClick={() => setModalIsVisible(true)}>Create Inventory Item</CButton>
        <CModal visible={modalIsVisible} onClose={() => setModalIsVisible(false)}>
            <CModalHeader>New Inventory Item</CModalHeader>
            <CModalBody>
                <CFormInput 
                    type='text' 
                    label='Name'
                    value={item.name}
                    onChange={(e) => {
                        setItem({ ...item, name: e.target.value});
                    }}/>
                <CFormInput 
                    type='Number'
                    label='Quantity'
                    value={item.quantity}
                    onChange={(e) => {
                        setItem({ ...item, quantity: e.target.value});
                    }}/>
            </CModalBody>
            <CModalFooter>
                <CButton color='primary' onClick={handleSubmit}>Create</CButton>
                <CButton color='secondary' onClick={() => setModalIsVisible(false)}>Cancel</CButton>
            </CModalFooter>
        </CModal>

        <CToaster placement="top-end">
            {toast && (
            <CToast autohide visible>
                <CToastBody>Item created successfully!</CToastBody>
            </CToast>
            )}
        </CToaster>
    </>
  )
}
