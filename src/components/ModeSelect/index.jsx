import React from 'react'
import { useColorScheme } from '@mui/material/styles'
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import SettingBrightnessIcon from '@mui/icons-material/SettingsBrightness'


function ModeSelect() {
  const {mode, setMode} = useColorScheme()
  const handleChange = (event) => {
    const value = event.target.value
    setMode(value)
  }

  return (
    <FormControl size="small" sx={{minWidth: '110px'}}>
      <InputLabel
        id="label-select-dark-light-mode"
        sx={{
          color: 'white',
          '&.Mui-focused': {
            color: 'white',
          }
      }}
      >
        Mode
      </InputLabel>
      <Select
        labelId="label-select-dark-light-mode"
        id="select-dark-light-mode"
        value={mode}
        label="Mode"
        onChange={handleChange}
        sx={{
          color: 'white',
          '.MuiOutlinedInput-notchedOutline': {
            borderColor: 'white',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white',
          },
          '.MuiSvgIcon-root': {
            borderColor: 'white',
          }
        }}
      >
        <MenuItem value='light'>
          <Box sx={{display:'flex', alignItems: 'center', gap: 1}}>
            <LightModeIcon fontSize="small"/> Light
          </Box>
        </MenuItem>
        <MenuItem value='dark'>
          <Box sx={{display:'flex', alignItems: 'center', gap: 1}}>
            <DarkModeOutlinedIcon fontSize="small"/> Dark
          </Box>
        </MenuItem>
        <MenuItem value='system'>
          <Box sx={{display:'flex', alignItems: 'center', gap: 1}}>
            <SettingBrightnessIcon fontSize="small"/> System
          </Box>
        </MenuItem>
      </Select>
    </FormControl>
  )
}

export default ModeSelect
