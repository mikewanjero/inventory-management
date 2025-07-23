import React from 'react'
import { CHeader, CHeaderBrand } from '@coreui/react'

export default function Header() {
  return (
    <CHeader className='header bg-light'>
        <CHeaderBrand style={{ color: '#000'}}>Inventory Management</CHeaderBrand>
    </CHeader>
  )
}

