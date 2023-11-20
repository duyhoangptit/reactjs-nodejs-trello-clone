import React from 'react'
import {
  Box,
  Divider,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography
} from '@mui/material'
import {
  AddCard,
  Cloud,
  ContentCopy,
  ContentCut,
  ContentPaste,
  DeleteForever, DragHandle,
  ExpandMore,
} from '@mui/icons-material'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import ListCards from '~/pages/Boards/BoardContent/ListColumns/Column/ListCards/ListCards.jsx'
import { mapOrder } from '~/utils/data.util.js'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

function Column(props) {

  const column = props.column
  const orderedCards = mapOrder(column?.cards, column?.cardOrderIds, '_id')
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (event) => {
    setAnchorEl(null)
  }

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
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
    transition
  }

  return (
    <Box
      ref={setNodeRef}
      style={dndKitColumnStyles}
      { ...attributes }
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
        p: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Button startIcon={<AddCard/>}>Add new card</Button>
        <Tooltip title={'Drag to move'}>
          <DragHandle
            sx={{
              cursor: 'pointer'
            }}/>
        </Tooltip>
      </Box>
    </Box>
  )
}

export default Column
