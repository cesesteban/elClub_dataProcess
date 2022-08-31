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
              src="https://pps.whatsapp.net/v/t61.24694-24/172150149_1114627222624177_7985391750631597188_n.jpg?ccb=11-4&oh=01_AVy5RqGbfPfI32C_kUUJZP_dgHvkAOnNcgFHvqn2S6LpQw&oe=63203822"
            />
        </nav>      
    </div>
  )
}
