import React from 'react'
import { Avatar, AvatarGroup, Box, Chip, Tooltip } from '@mui/material'
import { AddToDrive, Bolt, Dashboard, FilterList, PersonAdd, VpnLock } from '@mui/icons-material'
import Button from '@mui/material/Button'

const MENU_STYLES = {
  color: 'white',
  bgcolor: 'transparent',
  border: 'none',
  paddingX: '4px',
  borderRadius: '4px',
  '.MuiSvgIcon-root': {
    color: 'white',
  },
  '&:hover': {
    bgcolor: 'primary.50'
  }
}

const BOX_STYLES = {display: 'flex', alignItems: 'center', gap: 2}

function BoardBar() {
  return (
    <Box sx={{
      width: '100%',
      height: (theme) => theme.trello.boardBarHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 2,
      paddingX: 2,
      overflowX: 'auto',
      borderBottom: '1px solid #00bfa5',
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2')
    }}>
      <Box sx={BOX_STYLES}>
        <Chip
          sx={MENU_STYLES}
          icon={<Dashboard />} label="HoangTiger Trello" onClick={ () => {}}/>
        <Chip
          sx={MENU_STYLES}
          icon={<VpnLock />} label="Public/Private Workspace" onClick={ () => {}}/>
        <Chip
          sx={MENU_STYLES}
          icon={<AddToDrive />} label="Google Driver" onClick={ () => {}}/>
        <Chip
          sx={MENU_STYLES}
          icon={<Bolt />} label="Automation" onClick={ () => {}}/>
        <Chip
          sx={MENU_STYLES}
          icon={<FilterList />} label="Filter" onClick={ () => {}}/>
      </Box>
      <Box sx={BOX_STYLES}>
        <Button
          variant={'outlined'}
          startIcon={<PersonAdd/>}
          sx={{
            color: 'white',
            borderColor: 'white',
            '&:hover': {
              borderColor: 'white'
            }
        }}
        >
          Invite
        </Button>
        <AvatarGroup
          total={10}
          max={4}
          sx={{
            gap: '10px',
            '& .MuiAvatar-root': {
              width: 30,
              height: 30,
              fontSize: '16px',
              border: 'none',
              color: 'white',
              cusor: 'pointer',
              '&.first-of-type': {
                bgcolor: '#a4b0be'
              }
          }
        }}>
          <Tooltip title={'HoangTiger'}>
            <Avatar alt="Remy Sharp"
                    src="https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/avatar-icon.png" />
          </Tooltip>
          <Tooltip title={'HoangTiger'}>
            <Avatar alt="Remy Sharp"
                    src="https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/avatar-icon.png" />
          </Tooltip>
          <Tooltip title={'HoangTiger'}>
            <Avatar alt="Remy Sharp"
                    src="https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/avatar-icon.png" />
          </Tooltip>
          <Tooltip title={'HoangTiger'}>
            <Avatar alt="Remy Sharp"
                    src="https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/avatar-icon.png" />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  )
}

export default BoardBar
