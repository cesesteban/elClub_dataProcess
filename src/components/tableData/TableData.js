import React, { useMemo, useState } from 'react'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';

const COMISSIONS = ['Comisiones', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55', '60', '65', '70', '75', '80', '85', '90', '95', '100'];
export default function TableData({dataTable, filters}) {

  const [rowsService, setRowsService] = useState([])
  const [rowsProduct, setRowsProduct] = useState([])
  const [filter, setFiler] = useState([])
  const [professional, setProfessional] = useState('');
  const [commissionServices, setCommissionServices] = useState('Comisiones');
  const [commissionProducts, setCommissionProducts] = useState('Comisiones');
  const [rowsServiceFiltered, setRowsServiceFiltered] = useState([])
  const [rowsProductFiltered, setRowsProductFiltered] = useState([])
  const [totalService, setTotalService] = useState()
  const [totalProduct, setTotalProduct] = useState()

  const handleChangeProfessional = (event) => {
    setProfessional(event.target.value);
  };

  const handleChangeCommissionServices = (event) => {
    setCommissionServices(event.target.value);
  };

  const handleChangeCommissionProducts = (event) => {
    setCommissionProducts(event.target.value);
  };

  useMemo(() => {
    if(dataTable){
      const key = Object.keys(dataTable)
      let serviceData = []
      let productData = []
      
      for(let i = 0; i < key.length; i++){
        const dataKey = key[i]
        let dataRow = dataTable[dataKey]
        let rowKeys = Object.keys(dataRow)
        for(let j=0; j<rowKeys.length; j++){
          const rowKey = rowKeys[j]
          const row = dataRow[rowKey]   
          if(typeof row.data === "string"){
            if(row.data.includes("(S)")){
              let service = row.data.split('-')[1]
              let price = dataRow[rowKeys[j+1]].data
              let profesional = dataRow[rowKeys[j+2]].data
              serviceData.push({service: service, price: price, profesional: profesional})
            }
            if(row.data.includes("(P)")){
              let product = row.data.split('-')[1]
              let price = dataRow[rowKeys[j+1]].data
              let profesional = dataRow[rowKeys[j+2]].data
              productData.push({product: product, price: price, profesional: profesional})
            }
          }       
        }        
      }
      setRowsService(serviceData)
      setRowsProduct(productData)
      setFiler(filters)
    }
    // eslint-disable-next-line
  },[dataTable]) 
  
  useMemo(()=>{
    if(rowsService[0] && rowsProduct[0]){
      let rowsServicesProcess = rowsService.filter(s=>s.profesional===professional)
      let rowsProductsProcess = rowsProduct.filter(s=>s.profesional===professional)
      let totalServiceProcess = 0
      let totalProductProcess = 0
      for(let i=0; i<rowsServicesProcess.length; i++){
        totalServiceProcess += rowsServicesProcess[i].price
      } 
      for(let i=0; i<rowsProductsProcess.length; i++){
        totalProductProcess += rowsProductsProcess[i].price
      } 

      setTotalService(totalServiceProcess)
      setTotalProduct(totalProductProcess)
      setRowsServiceFiltered(rowsServicesProcess)
      setRowsProductFiltered(rowsProductsProcess)
    }
    // eslint-disable-next-line
  },[professional])

  return (
    <>
      <FormControl sx={{ mt: 3, mr: 3 ,minWidth: 160 }} size="small">
        <InputLabel id="demo-select-small">Profesional</InputLabel>
        <Select
          labelId="demo-select-small"
          id="demo-select-small"
          value={professional}
          label="Professional"
          onChange={handleChangeProfessional}
        >
          {filter&&filter[0]&&filter.map(x=>{
            return <MenuItem key={x+Math.random()} value={x}>{x}</MenuItem>
          })} 
        </Select>
      </FormControl>

      <Box>
        <FormControl sx={{mt: 3 ,minWidth: 160 }} size="small">
          <InputLabel id="demo-select-small">Comisiones</InputLabel>
          <Select
            labelId="demo-select-small"
            id="demo-select-small"
            value={commissionServices}
            label="commission"
            onChange={handleChangeCommissionServices}
          >
            {COMISSIONS&&COMISSIONS.map(x=>{
              return <MenuItem key={x} value={x}>{x}</MenuItem>
            })} 
          </Select>
        </FormControl>
      </Box>

      <TableContainer sx={{ mt: 3 }} component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Profesional</TableCell>
              <TableCell align="right">Servicio</TableCell>
              <TableCell align="right">Pago</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>            
            {rowsServiceFiltered.map((row, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.profesional}
                </TableCell>
                <TableCell align="right">{row.service}</TableCell>
                <TableCell align="right">{commissionServices!=='Comisiones'?row.price*(commissionServices/100):row.price}</TableCell>
              </TableRow>
            ))}
              {totalService&&
              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  TOTAL
                </TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right">{commissionServices!=='Comisiones'?totalService*(commissionServices/100):totalService}</TableCell>
              </TableRow>}
          </TableBody>
        </Table>
      </TableContainer>

      <Box>
        <FormControl sx={{mt: 7 ,minWidth: 160 }} size="small">
          <InputLabel id="demo-select-small">Comisiones</InputLabel>
          <Select
            labelId="demo-select-small"
            id="demo-select-small"
            value={commissionProducts}
            label="commission"
            onChange={handleChangeCommissionProducts}
          >
            {COMISSIONS&&COMISSIONS.map(x=>{
              return <MenuItem key={x} value={x}>{x}</MenuItem>
            })} 
          </Select>
        </FormControl>
      </Box>
        
      <TableContainer sx={{ mt: 3 }} component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Profesional</TableCell>
              <TableCell align="right">Producto</TableCell>
              <TableCell align="right">Pago</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>            
            {rowsProductFiltered.map((row, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.profesional}
                </TableCell>
                <TableCell align="right">{row.product}</TableCell>
                <TableCell align="right">{commissionProducts!=='Comisiones'?row.price*(commissionProducts/100):row.price}</TableCell>
              </TableRow>
            ))}
            {totalProduct&&
              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  TOTAL
                </TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right">{commissionProducts!=='Comisiones'?totalProduct*(commissionProducts/100):totalProduct}</TableCell>
              </TableRow>}
          </TableBody>
        </Table>
      </TableContainer>   
    </>
  );
}
