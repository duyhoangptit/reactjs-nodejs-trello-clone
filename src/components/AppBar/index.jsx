import React, { useState } from 'react'
import { Badge, Box, InputAdornment, TextField, Tooltip, Typography } from '@mui/material'
import ModeSelect from '../ModeSelect/index.jsx'
import AppsIcon from '@mui/icons-material/Apps'
import {ReactComponent as TrelloIcon} from '~/assets/trello.svg'
import SvgIcon from '@mui/material/SvgIcon'
import Workspaces from '~/components/AppBar/Menu/Workspaces.jsx'
import Recent from '~/components/AppBar/Menu/Recent.jsx'
import Templates from '~/components/AppBar/Menu/Templates.jsx'
import Starred from '~/components/AppBar/Menu/Starred.jsx'
import Button from '@mui/material/Button'
import { Close, HelpOutline, LibraryAdd, NotificationsNone, Search } from '@mui/icons-material'
import Profiles from '~/components/AppBar/Menu/Profiles.jsx'

function AppBar() {
  const [searchValue, setSearchValue] = useState('')

  return (
    <Box sx={{
      width: '100%',
      height: (theme) => theme.trello.appBarHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 2,
      paddingX: 2,
      overflowX: 'auto',
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#2e3c50' : '#1565c0')
    }}>
      <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
        <AppsIcon sx={{color: 'white'}}/>
        <Box sx={{display: 'flex', alignItems: 'center', gap: 0.5}}>
          <SvgIcon component={TrelloIcon}
                   inheritViewBox
                   fontSize={'small'}
                   sx={{color: 'white'}}/>
          <Typography variant="span" sx={{fontSize: '1.2rem', fontWeight: 'bold', color: 'white'}}>Trello</Typography>
        </Box>

        <Box sx={{ display: {xs: 'none', md: 'flex'}, gap: 1 }}>
          <Workspaces/>
          <Recent/>
          <Starred/>
          <Templates/>
          <Button
            sx={{
              color: 'white',
              border: 'none',
              '&:hover:': {
                border: 'none',
              }
            }}
            variant={'outlined'}
            startIcon={<LibraryAdd/>}>
            Create
          </Button>
        </Box>

      </Box>
      <Box sx={{display: 'flex', alignItems: 'center'}}>
        <Box sx={{display: {xs: 'none', md: 'flex'}, alignItems: 'center', gap: 2}}>
          <TextField id="outlined-search"
                     label="Search..."
                     type="text"
                     size={'small'}
                     value={searchValue}
                     onChange={(e) => setSearchValue(e.target.value)}
                     InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Search sx={{color: 'white'}}/>
                          </InputAdornment>
                        ),
                       endAdornment: (
                         <Close
                           fontSize={'small'}
                           sx={{color: searchValue ? 'white' : 'transparent', cursor: 'pointer'}}
                           onClick={() => setSearchValue('')}
                         />
                       )
                     }}
                     sx={{
                       minWidth: '120px',
                       maxWidth: '180px',
                       '& label': {color: 'white'},
                       '& input': {color: 'white'},
                       '& label.Mui-focused': {color: 'white'},
                       '& .MuiOutlinedInput-root': {
                         '& fieldset': {borderColor: 'white'},
                         '&:hover fieldset': {borderColor: 'white'},
                         '&.Mui-focused fieldset': {borderColor: 'white'},
                       }
                     }}
          />
          <ModeSelect/>
          <Tooltip title={'Notifications'}>
            <Badge color="warning" variant="dot" sx={{cursor: 'pointer'}}>
              <NotificationsNone sx={{color: 'white'}}/>
            </Badge>
          </Tooltip>
          <Tooltip title={'Helps'}>
            <HelpOutline sx={{color: 'white'}}/>
          </Tooltip>
        </Box>

        <Profiles/>
      </Box>
    </Box>
  )
}

export default AppBar
