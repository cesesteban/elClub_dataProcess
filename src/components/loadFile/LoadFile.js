import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {useDropzone} from 'react-dropzone'
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';

import { styled } from '@mui/material/styles';

var XLSX = require("xlsx");
const NUMBERS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const SHEETSNAMES = ['BASE 0', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function LoadFile({setDataTable, setFilters}) {
  const [data , setData] = useState('')
  const [dataProcess, setDataProcess] = useState('')
  const [processActive, setProcessActive] = useState(0)

  const onDrop = useCallback(async acceptedFiles => {
    setProcessActive(1)
    const file = acceptedFiles[0]
    const res = await file.arrayBuffer(); 
    let hashWorkbook = {};

    for(let z = 0; z < 32; z++) {      
      console.log([SHEETSNAMES[z]])
      let sheetName = SHEETSNAMES[z]
      
      const workbook = XLSX.read(res, {sheets: [sheetName]});
      const dataKey = Object.keys(workbook.Sheets[sheetName])
      const sheet = workbook.Sheets[sheetName]  
      
      if(sheetName !== "BASE 0") {
        let keys = []

        for(let i=0;i<dataKey.length; i++){
          const key = dataKey[i]
          if((!NUMBERS.includes(key[key.length-3]) && key[key.length-2]<3) || (!NUMBERS.includes(key[key.length-2]))){
            keys.push(key)
          }
        }
    
        let hash = {}
        // eslint-disable-next-line
        keys.map((k, index)=> {if(sheet[k].v !== 0) hash[index]={k: k, index: index, data: sheet[k].v}})
        let keyHash = Object.keys(hash)  
        let dataFiltered = {}
        
        for(let i = 0; i<keyHash.length; i++){
          if(hash[keyHash[i]].data !== 'Número de ticket' && hash[keyHash[i]].data !== 'Fecha' && hash[keyHash[i]].data !== 'Medio de pago' && hash[keyHash[i]].data !== "Transferencia" && hash[keyHash[i]].data !== "Otro" && hash[keyHash[i]].data !== "Efectivo" && hash[keyHash[i]].data !== "Ser. / Prod." && hash[keyHash[i]].data !== "Valor" && hash[keyHash[i]].data !== "Valor" && hash[keyHash[i]].data !== "Profesional" && hash[keyHash[i]].data !== "Ajuste" && hash[keyHash[i]].data !== "-"  && hash[keyHash[i]].data !== "Comisión" && hash[keyHash[i]].data !== "Valor ttl"  && hash[keyHash[i]].data !== "Com Prof" && keyHash[i] > 400 && hash[keyHash[i]].data){  
            dataFiltered[keyHash[i]] = {index: hash[keyHash[i]].k, data: hash[keyHash[i]].data} 
          }
        }

        hashWorkbook[sheetName] = dataFiltered
        console.log("OK")
      } else {
        let professionals = []

        for(let i=37; i<51; i++){
          let index = "A"+i
          professionals.push(sheet[index].v)
        }

        setFilters(professionals)
        console.log("OK")
      }
    }

    setProcessActive(0)
    setData(hashWorkbook)
  }, [setFilters])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  useMemo(() => {
    let dataProcessServices = []
    let dataProcessProducts = []
    let index = Object.keys(data)
    
    for (let i = 0; i < index.length; i++) {
      let sheet = data[index[i]]
      
        let dataKey = Object.keys(data[index[i]])  
        for (let j = 0; j < dataKey.length; j++) {
  
          if(sheet[dataKey[j]] && typeof sheet[dataKey[j]].data != "number" && sheet[dataKey[j]].data.split("-")[0] === "(S)"){
            dataProcessServices.push(sheet[dataKey[j]])
            dataProcessServices.push(sheet[dataKey[j+1]])
            dataProcessServices.push(sheet[dataKey[j+2]])
          }
          else if(sheet[dataKey[j]] && typeof sheet[dataKey[j]].data != "number" && sheet[dataKey[j]].data.split("-")[0] === "(P)"){
            dataProcessProducts.push(sheet[dataKey[j]])
            dataProcessProducts.push(sheet[dataKey[j+1]])
            dataProcessProducts.push(sheet[dataKey[j+2]])
          }
        }
      
    }

    setDataProcess({services: dataProcessServices , products: dataProcessProducts })
  },[data])

  useEffect(()=>{
    setDataTable(dataProcess)
    // eslint-disable-next-line
  },[dataProcess])

  return (
    <div {...getRootProps()}>
      <Box sx={{ mt: 3, width: '100%' }}>
        <Stack spacing={2}>
          <Item>
          
            <input {...getInputProps()} />
            
              {(isDragActive) ?
              (<p>{!processActive&&!data["01"]&&'Suelta el archivo aquí ...'}</p>) :
              (<p>{!processActive&&!data["01"]&&'Arrastre y suelte su archivo aquí, o haga clic para seleccionar archivos'}</p>)} 
                
              {(processActive) ?
              (<p>Procesando archivo, por favor aguarde unos minutos...</p>):
              (<p>{data["01"]?'Proceso completado':''}</p>)}
            
          </Item>
        </Stack>       
      </Box>
    </div>
  )
}
