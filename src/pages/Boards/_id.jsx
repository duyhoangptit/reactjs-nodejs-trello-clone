import React from 'react'
import { Container } from '@mui/material'
import AppBar from '~/components/AppBar/index.jsx'
import BoardBar from './BoardBar/index.jsx'
import BoardContent from './BoardContent/_id.jsx'

function Board() {
  return (
    <Container disableGutters
               maxWidth={false}
               sx={{height: '100vh'}}>
      {/*app bar*/}
      <AppBar />
      {/*board bar*/}
      <BoardBar />
      {/*content bar*/}
      <BoardContent />
    </Container>
  )
}

export default Board
