import React from 'react'
import {
  Box,
} from '@mui/material'
import Column from '~/pages/Boards/BoardContent/ListColumns/Column/Column.jsx'
import Button from '@mui/material/Button'
import { NoteAdd } from '@mui/icons-material'

function ListColumns() {

  return (
    <Box sx={{
      // background ke thua thang ngoai cung
      bgcolor: 'inherit',
      width: '100%',
      height: '100%',
      display: 'flex',
      overflowX: 'auto',
      overflowY: 'hidden',
      '&::-webkit-scrollbar-track': { m:2 }
    }}>
      <Column/>
      <Column/>
      <Column/>
      <Column/>
      <Column/>

      <Box sx={{
        minWidth: '200px',
        maxWidth: '200px',
        mx: 2,
        borderRadius: '6px',
        height: 'fit-content',
        bgcolor: '#ffffff3d'
      }}>
        <Button
          startIcon={<NoteAdd/>}
          sx={{
            color: 'white',
            width: '100%',
            justifyContent: 'flex-start',
            pl: 2.5,
            py: 1
          }}
        >
          Add new column
        </Button>
      </Box>
    </Box>
  )
}

export default ListColumns
