import React, { useEffect, useState } from 'react'
import { Container } from '@mui/material'
import AppBar from '~/components/AppBar/AppBar.jsx'
import BoardBar from './BoardBar/BoardBar.jsx'
import BoardContent from './BoardContent/BoardContent.jsx'
import {mockData} from '~/apis/mock-data'
import { fetchBoardDetailsAPI } from '~/apis/index.js'

function Board() {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    // const boardId = '6562b0d1d66f1fe9f6e60e53'
    //
    // fetchBoardDetailsAPI(boardId).then(board => {
    //   console.log(board)
    //   setBoard(board)
    // }).catch(err => {
    //   console.log(err)
    // })
    setBoard(mockData?.board)
  }, [])

  return (
    <Container disableGutters
      maxWidth={false}
      xsx={{ height: '100vh' }}>
      {/*app bar*/}
      <AppBar/>
      {/*board bar*/}
      <BoardBar board={board}/>
      {/*content bar*/}
      <BoardContent board={board}/>
    </Container>
  )
}

export default Board
