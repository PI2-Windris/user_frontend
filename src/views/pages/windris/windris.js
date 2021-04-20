import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCollapse,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CNavbar,
  CNavbarNav,
  CNavbarBrand,
  CNavbarText,
  CToggler,
  CNavLink,
  CDropdown,
  CForm,
  CInput,
  CButton,
  CImg
} from '@coreui/react'
import { DocsLink } from 'src/reusable'

const Windris = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenDropdown, setIsOpenDropdown] = useState(false)
  const [navbarText, setNavbarText] = useState(false)

  return (
      <CCard>
        <CCardBody>
          <CNavbar expandable="sm" color="info" >
            <CToggler inNavbar onClick={() => setIsOpen(!isOpen)}/>
            <CNavbarBrand>
              Windris
            </CNavbarBrand>
            <CCollapse show={isOpen} navbar>
              <CNavbarNav>
                <CNavLink>Home</CNavLink>
                <CNavLink>Link</CNavLink>
              </CNavbarNav>
              <CNavbarNav className="ml-auto">
                <CForm inline>
                  <CInput
                    className="mr-sm-2"
                    placeholder="Search"
                    size="sm"
                  />
                  <CButton color="green" className="my-2 my-sm-0" type="submit">Search</CButton>
                </CForm>
                <CDropdown
                  inNav
                >
                  <CDropdownToggle color="primary">
                    Lang
                  </CDropdownToggle>
                  <CDropdownMenu>
                    <CDropdownItem>EN</CDropdownItem>
                    <CDropdownItem>ES</CDropdownItem>
                    <CDropdownItem>RU</CDropdownItem>
                    <CDropdownItem>FA</CDropdownItem>
                  </CDropdownMenu>
                </CDropdown>
                <CDropdown
                  inNav
                >
                  <CDropdownToggle color="primary">
                    User
                  </CDropdownToggle>
                  <CDropdownMenu>
                    <CDropdownItem>Account</CDropdownItem>
                    <CDropdownItem>Settings</CDropdownItem>
                  </CDropdownMenu>
                </CDropdown>
              </CNavbarNav>
            </CCollapse>
          </CNavbar>
        </CCardBody>
      </CCard>

  )
}

export default Windris
