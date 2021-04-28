import React from 'react'
import CIcon from '@coreui/icons-react'

const _nav =  [

  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/windrisdashboard',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Geradores',
    to: '/generators',
    icon: <CIcon name="cilGrid" customClasses="c-sidebar-nav-icon"/>,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Suporte',
    to: '/support',
    icon: <CIcon name="cilEnvelopeLetter" customClasses="c-sidebar-nav-icon"/>,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Manutenção',
    to: '/maintanance',
    icon: <CIcon name="cilBookmark" customClasses="c-sidebar-nav-icon"/>,
  },
  
]

export default _nav
