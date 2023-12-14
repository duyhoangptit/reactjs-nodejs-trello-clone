import React, { useState } from 'react'
import {
  Box,
  Divider,
  ListItemIcon,
  ListItemText, TextField,
  Tooltip,
  Typography
} from '@mui/material'
import {
  AddCard, Close,
  Cloud,
  ContentCopy,
  ContentCut,
  ContentPaste,
  DeleteForever, DragHandle,
  ExpandMore
} from '@mui/icons-material'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import ListCards from '~/pages/Boards/BoardContent/ListColumns/Column/ListCards/ListCards.jsx'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { toast } from 'react-toastify'

function Column(props) {
  const column = props.column

  const [openNewCardForm, setOpenNewCardForm] = useState(false)

  const [inputTitleCard, setInputTitleCard] = useState('')
  const addNewCard = async () => {
    if (!inputTitleCard) {
      toast.error('Please enter card title', { position: 'bottom-right' })
      // show error
      return
    }
    // call api create column
    await props.createNewCard({
      title: inputTitleCard,
      columnId: column?._id
    })

    // clear value and close input form
    toggleOpenNewCardForm()
  }
  const toggleOpenNewCardForm = () => {
    setOpenNewCardForm(!openNewCardForm)
    setInputTitleCard('')
  }

  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (event) => {
    setAnchorEl(null)
  }
  const orderedCards = column?.cards

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable(
    {
      id: column._id,
      data: { ...column }
    }
  )

  const dndKitColumnStyles = {
    // touchAction: 'none', // danh cho sensor default dang PointerSensor
    // thay vì transform thì chuyển sang Translate để k bị lỗi stretch
    // https://github.com/clauderic/dnd-kit/issues/117
    transform: CSS.Translate.toString(transform),
    transition,
    // Chieu cao phai luon max 100% neu khong loi luc keo column ngan qua mot cai column dai thi phai keo o khu vuc giua, rat kho chiu
    height: '100%',
    opacity: isDragging ? 0.5 : undefined
  }

  // Boc dev o day vi van de chieu cao cua column khi keo tha se co bug kieu flickering
  return (
    <div
      ref={setNodeRef}
      style={dndKitColumnStyles}
      { ...attributes }>
      <Box
        { ...listeners }
        sx={{
          minWidth: '300px',
          maxWidth: '300px',
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#333643' : '#ebecf0'),
          ml: 2,
          borderRadius: '6px',
          height: 'fit-content',
          maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`
        }}>
        <Box sx={{
          height:  (theme) => theme.trello.columnHeaderHeight,
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Typography variant={'h6'} sx={{
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}>
            {column?.title}
          </Typography>
          <Box>
            <Tooltip title={'More options'}>
              <ExpandMore
                sx={{color: 'text.primary', cursor: 'pointer'}}
                id="basic-column-dropdown"
                aria-controls={open ? 'basic-menu-column-dropdown' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              />
            </Tooltip>
            <Menu
              id="basic-menu-column-dropdown"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button-workspaces'
              }}
            >
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <AddCard fontSize="small" />
                </ListItemIcon>
                <ListItemText>Add new Card</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <ContentCut fontSize="small" />
                </ListItemIcon>
                <ListItemText>Cut</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <ContentCopy fontSize="small" />
                </ListItemIcon>
                <ListItemText>Copy</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <ContentPaste fontSize="small" />
                </ListItemIcon>
                <ListItemText>Paste</ListItemText>
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <DeleteForever fontSize="small" />
                </ListItemIcon>
                <ListItemText>Remove this column</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <Cloud fontSize="small" />
                </ListItemIcon>
                <ListItemText>Archive this column</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        </Box>

        <ListCards cards={orderedCards}/>

        {/*Box footer*/}
        <Box sx={{
          height:  (theme) => theme.trello.columnFooterHeight,
          p: 2
        }}>
          {!openNewCardForm
            ?
            <Box sx={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <Button
                startIcon={<AddCard/>}
                onClick={toggleOpenNewCardForm}
              >Add new card</Button>
              <Tooltip title={'Drag to move'}>
                <DragHandle
                  sx={{
                    cursor: 'pointer'
                  }}/>
              </Tooltip>
            </Box>
            :
            <Box sx={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}>
              <TextField
                label="Enter column title..."
                type="text"
                size={'small'}
                variant={'outlined'}
                autoFocus
                value={inputTitleCard}
                onChange={(e) => setInputTitleCard(e.target.value)}
                sx={{
                  '& label': { color: 'text.primary' },
                  '& input': {
                    color: (theme) => theme.palette.primary.main,
                    bgcolor: (theme) => theme.palette.mode === 'dark' ? '#333643' : 'white'
                  },
                  '& label.Mui-focused': { color: (theme) => theme.palette.primary.main },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: (theme) => theme.palette.primary.main, },
                    '&:hover fieldset': { borderColor: (theme) => theme.palette.primary.main, },
                    '&.Mui-focused fieldset': { borderColor: (theme) => theme.palette.primary.main, }
                  },
                  '& .MuiOutlinedInput-input': {
                    borderRadius: 1
                  }
                }}
              />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Button variant={'contained'} color={'success'} size={'small'}
                  onClick={addNewCard}
                  sx={{
                    boxShadow: 'none',
                    border: '0.5px solid',
                    borderColor: (theme) => theme.palette.success.main,
                    '&:hover': { bgColor:  (theme) => theme.palette.success.main }
                  }}
                >Add</Button>
                <Close
                  fontSize={'small'}
                  sx={{
                    color: (theme) => theme.palette.warning.light,
                    cursor: 'pointer'
                  }}
                  onClick={toggleOpenNewCardForm}
                />
              </Box>
            </Box>
          }
        </Box>
      </Box>
    </div>
  )
}

export default Column
