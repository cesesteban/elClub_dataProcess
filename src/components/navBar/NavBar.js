import React from 'react'
import Box from '@mui/material/Box';

export default function NavBar() {
  return (
    <div>
        <nav style={{backgroundColor: "black"}}>
            <Box
              component="img"
              sx={{
                height: 150,
                width: 150,
                // maxHeight: { xs: 233, md: 167 },
                // maxWidth: { xs: 350, md: 250 },
              }}
              alt="EL CLUB"
              src="https://d1fdloi71mui9q.cloudfront.net/HSMEKqLwRQaZSZE0Ea9D_0rXHJBhDB5remGMK"
            />
        </nav>      
    </div>
  )
}
