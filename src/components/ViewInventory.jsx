import { CCard, CCardBody, CListGroup, CListGroupItem } from '@coreui/react';
import React, { useEffect, useState } from 'react'

export default function ViewInventory() {
    const [inventory, setInventory] = useState([]);

    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const response = await fetch('/api/TestProject/GetTESTInventory');
                if (!response.ok) {
                    alert('Failed to fetch inventory!');
                    throw new Error('Network response was not ok');
                } else {
                    const data = await response.json();
                    setInventory(data);
                    console.log('Succesfully fetched invenotry: ', data);
                    return data;
                }
            } catch (error) {
                console.error('Error picking invenotry: ', error);
                alert('Error fetching invenotry!', error);
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
