import React from 'react'
import { Container } from '@mui/material'
import AppBar from '~/components/AppBar/AppBar.jsx'
import BoardBar from './BoardBar/BoardBar.jsx'
import BoardContent from './BoardContent/BoardContent.jsx'
import {mockData} from '~/apis/mock-data'

function Board() {
  return (
    <Container disableGutters
               maxWidth={false}
               sx={{ height: '100vh' }}>
      {/*app bar*/}
      <AppBar/>
      {/*board bar*/}
      <BoardBar board={mockData?.board}/>
      {/*content bar*/}
      <BoardContent board={mockData?.board}/>
    </Container>
  )
}

export default Board
