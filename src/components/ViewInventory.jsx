import { CCard, CCardBody, CListGroup, CListGroupItem } from '@coreui/react';
import React, { useEffect, useState } from 'react'
import { getInventory } from '../services/apiSetup';

export default function ViewInventory() {
    const [inventory, setInventory] = useState([]);

    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const response = await getInventory();
                setInventory(response);
                console.log('Fetched inventory:', response);
            } catch (error) {
                console.error('Error fetching inventory:', error);
                setInventory([]);
                alert('Failed to fetch inventory. Please try again later.');
            }
        };
        fetchInventory();
    }, [])

  return (
    <CCard>
        <CCardBody>
            <h4>Inventory List</h4>
            <CListGroup>
                {inventory.map((item) => (
                    <CListGroupItem key={item.id}>
                        {item.name} - Qty: {item.quantity}
                    </CListGroupItem>
                ))}
            </CListGroup>
        </CCardBody>
    </CCard>
  )
}
