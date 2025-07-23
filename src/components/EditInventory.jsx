import React, { useState } from 'react'
import { editInventory } from '../services/apiSetup';
import { CButton, CFormInput } from '@coreui/react';

export default function EditInventory({id}) {
    const [data, setData] = useState({ name: '', quantity: ''});

    const handleEdit = async () => {
        try {
            await editInventory(id, data);
            alert('Item updated successfully!');
            console.log('Inventory updated successfully!', data);
        } catch (error) {
            console.error('Failed to update inventory!', error);
            alert('Failed to update inventory. Please try again later.');
            setData({ name: '', quantity: ''});
        }
    }

  return (
    <>
        <CFormInput 
            label='Edit Name' 
            value={data.name} 
            onChange={(e) => {
                setData({ ...data, name: e.target.value});
            }}
        />
        <CFormInput 
            label='Edit Quantity' 
            value={data.quantity} 
            onChange={(e) => {
                setData({ ...data, quantity: e.target.value});
            }}
        />
        <CButton color='warning' onClick={handleEdit}>
            Update
        </CButton>
    </>
  )
}
