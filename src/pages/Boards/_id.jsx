import React from 'react'
import { Container } from '@mui/material'
import AppBar from '~/components/AppBar/AppBar.jsx'
import BoardBar from './BoardBar/BoardBar.jsx'
import BoardContent from './BoardContent/BoardContent.jsx'

function Board() {
  return (
    <Container disableGutters
               maxWidth={false}
               sx={{ height: '100vh' }}>
      {/*app bar*/}
      <AppBar/>
      {/*board bar*/}
      <BoardBar/>
      {/*content bar*/}
      <BoardContent/>
    </Container>
  )
}

export default Board
