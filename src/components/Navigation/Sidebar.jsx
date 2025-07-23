import React from 'react'
import { cilMagnifyingGlass, cilPencil, cilPlus, cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CNavItem, CNavLink, CNavTitle, CSidebar, CSidebarBrand, CSidebarHeader, CSidebarNav, CSidebarToggler } from '@coreui/react'
import { Link } from 'react-router-dom'

export default function Sidebar() {
  return (
    <CSidebar visible className="sidebar">

        <CSidebarHeader className="border-bottom">
            <CSidebarBrand className='csidebarbrand'>CoreBase Solutions</CSidebarBrand>
        </CSidebarHeader>

        <CSidebarNav>
            <CNavTitle>phAMACore Inventory Management</CNavTitle>
            <CNavItem>
                <CNavLink href='/' className='def-color'>
                <CIcon className='add-icon' icon={cilPlus} height={13} width={25}/>
                    Create
                </CNavLink>
            </CNavItem>
            <CNavItem>
                <CNavLink href="/view" className='def-color'>
                <CIcon className='view-icon' icon={cilMagnifyingGlass} height={13} width={25}/>
                    View
                </CNavLink>
            </CNavItem>
            <CNavItem>
                <CNavLink href="/edit" className='def-color'>
                <CIcon className='edit-icon' icon={cilPencil} height={13} width={25}/>
                    Edit
                </CNavLink>
            </CNavItem>
            <CNavItem>
                <CNavLink href="/delete" className='def-color'>
                <CIcon className='delete-icon' icon={cilTrash} height={13} width={25}/>
                    Delete
                </CNavLink>
            </CNavItem>
        </CSidebarNav>
        <CSidebarHeader className='border-top'>
            <CSidebarToggler className='def-color' />
        </CSidebarHeader>
    </CSidebar>
  )
}
