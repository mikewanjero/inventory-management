import React, { useState } from 'react';
import { createInventory } from '../services/apiSetup';
import { CButton, CForm, CFormInput } from '@coreui/react';

export default function CreateInventory() {
    const [item, setItem] = useState({ name: '', quantity : '' });

    const handleSubmit = async () => {
        try {
            const response = await createInventory(item);
            alert('Item created successfully!');
            console.log("Inventory created successfully:", response);
        } catch (error) {
            console.error("Failed to create inventory:", error);
        }
    }

  return (
    <CForm>
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
        <CButton onClick={handleSubmit}>Create Item</CButton>
    </CForm>

  )
}
