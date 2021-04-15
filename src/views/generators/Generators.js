import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination
} from '@coreui/react'

import GeneratorsData from './GeneratorsData'

const getBadge = status => {
  switch (status) {
    case 'High': return 'danger'
    case 'Low': return 'warning'
    case 'Normal': return 'success'
    default: return 'primary'
  }
}

const getStatusBadge = status => {
  switch (status) {
    case 'ON': return 'success'
    case 'OFF': return 'danger'
    default: return 'primary'
  }
}

const Generators = () => {
  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)

  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/users?page=${newPage}`)
  }

  useEffect(() => {
    currentPage !== page && setPage(currentPage)
  }, [currentPage, page])

  return (
    <CRow>
      <CCol xl={12}>
        <CCard>
          <CCardHeader>
            Geradores
          </CCardHeader>
          <CCardBody>
          <CDataTable
            items={GeneratorsData}
            fields={[
              { key: 'Nome do Gerador', _classes: 'font-weight-bold' },
              'Id do Gerador', 'Status', 'Performance'
            ]}
            hover
            striped
            itemsPerPage={10}
            activePage={page}
            clickableRows
            onRowClick={(item) => history.push(`/users/${item.id}`)}
            scopedSlots = {
              {'Performance':
                (item)=>(
                  <td>
                    <CBadge color={getBadge(item.Performance)}>
                      {item.Performance}
                    </CBadge>
                  </td>
                ),
                'Status':
                (item)=>(
                  <td>
                    <CBadge color={getStatusBadge(item.Status)}>
                      {item.Status}
                    </CBadge>
                  </td>
                )}
            }
          />
          <CPagination
            activePage={page}
            onActivePageChange={pageChange}
            pages={5}
            doubleArrows={false} 
            align="center"
          />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Generators
