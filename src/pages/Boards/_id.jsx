import React, { useEffect, useState } from 'react'
import { Container } from '@mui/material'
import AppBar from '~/components/AppBar/AppBar.jsx'
import BoardBar from './BoardBar/BoardBar.jsx'
import BoardContent from './BoardContent/BoardContent.jsx'
import {mockData} from '~/apis/mock-data'
import { createNewCardAPI, createNewColumnAPI, fetchBoardDetailsAPI, updateBoardDetailsAPI } from '~/apis/index.js'
import { toast } from 'react-toastify'

function Board() {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    const boardId = '6562b0d1d66f1fe9f6e60e53'

    fetchBoardDetailsAPI(boardId).then(board => {
      console.log(board)
      setBoard(board)
    }).catch(err => {
      console.log(err)
    })
    // setBoard(mockData?.board)
  }, [])

  const createNewColumn = async (data) => {
    const createdColumn = await createNewColumnAPI({
      ...data,
      boardId: board?._id
    })
    // update state board
    const newBoard = { ...board }
    if (!newBoard.columns) {
      newBoard.columns = []
    }
    newBoard.columns.push(createdColumn)
    newBoard.columnOrderIds.push(createdColumn._id)
    setBoard(newBoard)
  }

  const createNewCard = async (data) => {
    console.log(data)
    const createdCard = await createNewCardAPI({
      ...data,
      boardId: board?._id
    })
    // update state board
    const newBoard = { ...board }
    const columnId = data.columnId
    const column = newBoard.columns.find(item => item._id === columnId)
    if (!column.cards) {
      column.cards = []
    }
    column.cards.push(createdCard)
    column.cardOrderIds.push(createdCard._id)
    setBoard(newBoard)
  }

  const moveColumns = async (dndOrderedColumns) => {
    const dndOrderColumnsIds = dndOrderedColumns.map(c => c._id)

    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderColumnsIds

    // call api
    updateBoardDetailsAPI(board._id, {
      columnOrderIds: dndOrderColumnsIds
    }).then(() => {
      setBoard(newBoard)
    }).catch(err => {
      // show error
      toast.error(err.message, { position: 'top-right' })
    })
  }

  return (
    <Container disableGutters
      maxWidth={false}
      xsx={{ height: '100vh' }}>
      {/*app bar*/}
      <AppBar/>
      {/*board bar*/}
      <BoardBar board={board}/>
      {/*content bar*/}
      <BoardContent board={board}
        createNewColumn={createNewColumn}
        createNewCard={createNewCard}
        moveColumns={moveColumns}
      />
    </Container>
  )
}

export default Board
