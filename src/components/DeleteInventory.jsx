import React from 'react'
import { deleteInventory } from '../services/apiSetup'
import { CButton } from '@coreui/react';

export default function DeleteInventory({id}) {
    const handleDelete = async () => {
        try {
            await deleteInventory(id);
            alert('Item deleted successfully!');
        } catch (error) {
            console.error('Failed to delete inventory!', error);
            alert('Failed to delete inventory. Please try again later.');
        }
    }

  return (
    <CButton color='danger' onClick={handleDelete}>
        Delete Item
    </CButton>
  )
}
