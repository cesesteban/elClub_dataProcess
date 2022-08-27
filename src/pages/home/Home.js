import React, { useState } from 'react'
import NavBar from '../../components/navBar'
import LoadFile from '../../components/loadFile'
import TableData from '../../components/tableData'

export default function Home() {
  const [dataTable, setDataTable] = useState(null)
  const [filters, setFilters] = useState(null)

  const handleSetDataTable = (data) => {
    setDataTable(data)
  }

  const handleSetFilter = (data) => {
    setFilters(data)
  }

  return (
    <div >      
        <NavBar/>
        <LoadFile setDataTable={handleSetDataTable} setFilters={handleSetFilter} />
        <TableData dataTable={dataTable} filters={filters} />
    </div>
  )
}
