import React, { useState } from 'react'
import {
  Box, InputAdornment, TextField
} from '@mui/material'
import Column from '~/pages/Boards/BoardContent/ListColumns/Column/Column.jsx'
import Button from '@mui/material/Button'
import { Close, NoteAdd, Search } from '@mui/icons-material'
import { horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable'

function ListColumns(props) {
  const [openNewColumnForm, setOpenNewColumnForm] = useState(false)

  const [inputTitleColumn, setInputTitleColumn] = useState('')
  const addNewColumn = () => {
    if (!inputTitleColumn) {
      // show error
      return
    }
    // call api create column

    // clear value and close input form
    toggleOpenNewColumnForm()
  }
  const toggleOpenNewColumnForm = () => {
    setOpenNewColumnForm(!openNewColumnForm)
    setInputTitleColumn('')
  }

  const columns = props.columns
  /**
   * columns yêu cầu đầu vào là 1 mảng nguyên thuy, [1,2,3], ['a1', 'b1', 'c1'], ko nhận 1 list object
   */
  return (
    <SortableContext
      items={columns?.map(c => c._id)}
      strategy={horizontalListSortingStrategy}
    >
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
        {columns?.map(column => (<Column column={column} key={column._id}/>))}

        {!openNewColumnForm ?
          <Box
            onClick={toggleOpenNewColumnForm}
            sx={{
              minWidth: '250px',
              maxWidth: '250px',
              mx: 2,
              borderRadius: '6px',
              height: 'fit-content',
              bgcolor: '#ffffff3d'
            }}
          >
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
          :
          <Box sx={{
            minWidth: '250px',
            maxWidth: '250px',
            mx: 2,
            p: 1,
            borderRadius: '6px',
            height: 'fit-content',
            bgcolor: '#ffffff3d',
            display: 'flex',
            flexDirection: 'column',
            gap: 1
          }}>
            <TextField
              label="Enter column title..."
              type="text"
              size={'small'}
              variant={'outlined'}
              autoFocus
              value={inputTitleColumn}
              onChange={(e) => setInputTitleColumn(e.target.value)}
              sx={{
                '& label': { color: 'white' },
                '& input': { color: 'white' },
                '& label.Mui-focused': { color: 'white' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'white' },
                  '&:hover fieldset': { borderColor: 'white' },
                  '&.Mui-focused fieldset': { borderColor: 'white' }
                }
              }}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1}}>
              <Button variant={'contained'} color={'success'} size={'small'}
                onClick={addNewColumn}
                sx={{
                  boxShadow: 'none',
                  border: '0.5px solid',
                  borderColor: (theme) => theme.palette.success.main,
                  '&:hover': { bgColor:  (theme) => theme.palette.success.main }
                }}
              >Add Column</Button>
              <Close
                fontSize={'small'}
                sx={{
                  color: 'white',
                  cursor: 'pointer',
                  '&:hover': { bgColor:  (theme) => theme.palette.warning.light }
              }}
                onClick={toggleOpenNewColumnForm}
              />
            </Box>
          </Box>
        }
      </Box>
    </SortableContext>
  )
}

export default ListColumns
