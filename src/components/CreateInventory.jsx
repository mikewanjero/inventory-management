import React, { useState } from 'react';
import { createInventory } from '../services/apiSetup';
import {
    CButton,
    CForm,
    CFormCheck,
    CFormInput,
    CFormLabel,
    CFormTextarea,
    CToast,
    CToastBody,
    CToaster,
    CCard,
    CCardBody,
    CCardHeader
} from '@coreui/react';

export default function CreateInventory() {
    const [item, setItem] = useState({
        invCode: '',
        description: '',
        ingredients: '',
        blocked: false,
        highValue: false,
    });

    const [toast, setToast] = useState(false);

    const handleSubmit = async () => {
        try {
            const response = await createInventory(item);
            console.log("Inventory created successfully:", response);
            setToast(true);
            setItem({
                invCode: '',
                description: '',
                ingredients: '',
                blocked: false,
                highValue: false,
            });
        } catch (error) {
            console.error("Failed to create inventory:", error);
        }
    };

  return (
    <CCard className="create-form-card">
        <CCardHeader className="form-header">Create Inventory Item</CCardHeader>
        <CCardBody>
            <CForm className="inventory-form">
                <CFormLabel htmlFor="invCode">Invoice Code</CFormLabel>
                <CFormInput
                    id="invCode"
                    type="text"
                    value={item.invCode}
                    onChange={(e) => setItem({ ...item, invCode: e.target.value })}
                    className="form-input"
                />

                <CFormLabel htmlFor="description">Description</CFormLabel>
                <CFormTextarea
                    id="description"
                    value={item.description}
                    onChange={(e) => setItem({ ...item, description: e.target.value })}
                    rows={2}
                    className="form-textarea"
                />

                <CFormLabel htmlFor="ingredients">Ingredients</CFormLabel>
                <CFormTextarea
                    id="ingredients"
                    value={item.ingredients}
                    onChange={(e) => setItem({ ...item, ingredients: e.target.value })}
                    rows={2}
                    className="form-textarea"
                />

                <div className="form-checkboxes">
                    <CFormCheck
                        label="Blocked"
                        checked={item.blocked}
                        onChange={(e) => setItem({ ...item, blocked: e.target.checked })}
                    />
                    <CFormCheck
                        label="High Value"
                        checked={item.highValue}
                        onChange={(e) => setItem({ ...item, highValue: e.target.checked })}
                    />
                </div>

                <div className="form-buttons">
                    <CButton color="primary" onClick={handleSubmit} style={{backgroundColor: '#ffcb93ff'}}>
                        Create
                    </CButton>
                    <CButton color="secondaary" onClick={handleSubmit} style={{backgroundColor: '#ffcb93ff'}}>
                        Cancel
                    </CButton>
                </div>
            </CForm>
        </CCardBody>

        <CToaster placement="top-end">
            {toast && (
            <CToast autohide visible>
                <CToastBody>Item created successfully!</CToastBody>
            </CToast>
            )}
        </CToaster>
    </CCard>
  );
}
