import React, { useEffect, useState } from 'react'
import { Box, CircularProgress, Container, Typography } from '@mui/material'
import AppBar from '~/components/AppBar/AppBar.jsx'
import BoardBar from './BoardBar/BoardBar.jsx'
import BoardContent from './BoardContent/BoardContent.jsx'
import {mockData} from '~/apis/mock-data'
import {
  createNewCardAPI,
  createNewColumnAPI,
  fetchBoardDetailsAPI, moveCardToDifferentColumnAPI,
  updateBoardDetailsAPI,
  updateColumnDetailsAPI
} from '~/apis/index.js'
import { toast } from 'react-toastify'
import { mapOrder } from '~/utils/data.util.js'

function Board() {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    const boardId = '6562b0d1d66f1fe9f6e60e53'

    fetchBoardDetailsAPI(boardId).then(board => {
      console.log(board)
      // mapping order columns and cards
      board.columns = mapOrder(board.columns, board.columnOrderIds, '_id')
      // mapping cards in column
      board.columns.forEach(column => {
        if (!column.cards) {
          column.cards = []
        }
        column.cards = mapOrder(column.cards, column.cardOrderIds, '_id')
      })

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

  const moveCardInTheSameColumn = (columnId, dndOrderCards, dndOrderedCardIds) => {
    // update state board
    const newBoard = { ...board }
    const columnToUpdate = newBoard.columns.find(item => item._id === columnId)
    if (!columnToUpdate.cards) {
      columnToUpdate.cards = []
    }

    // update cards
    columnToUpdate.cards = dndOrderCards
    columnToUpdate.cardOrderIds = dndOrderedCardIds

    // call api update column
    updateColumnDetailsAPI(columnId, {
      cardOrderIds: dndOrderedCardIds
    }).then(() => {
      setBoard(board)
    }).catch(err => {
      toast.error(err.message, { position: 'top-right' })
    })
  }

  // Khi di chuyen sang column khac
  // b1: update mang cardOrderIds của column ban dau chua no
  // b2: update mang cardOrderIds cua column tiep theo
  // b3: cap nhat lai columnId moi cua card da keo
  const moveCardToDifferentColumn = (currentCardId, prevColumnId, nextColumnId, dndOrderedColumns) => {
    const dndOrderColumnsIds = dndOrderedColumns.map(c => c._id)

    // update state board
    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderColumnsIds

    // call api update
    moveCardToDifferentColumnAPI({
      currentCardId,
      prevColumnId,
      prevCardOrderIds: dndOrderedColumns.find(c => c._id === prevColumnId)?.cardOrderIds,
      nextColumnId,
      nextCardOrderIds: dndOrderedColumns.find(c => c._id === nextColumnId)?.cardOrderIds
    }).then(() => {
      setBoard(board)
    }).catch(err => {
      toast.error(err.message, { position: 'top-right' })
    })
  }

  if (!board) {
    return (
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        width: '100vw',
        height: '100vh'
      }}>
        <CircularProgress/>
        <Typography>Loading board...</Typography>
      </Box>
    )
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
        moveCardInTheSameColumn={moveCardInTheSameColumn}
        moveCardToDifferentColumn={moveCardToDifferentColumn}
      />
    </Container>
  )
}

export default Board
