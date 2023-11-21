import React, { useEffect, useState } from 'react'
import {
  Box,
} from '@mui/material'
import ListColumns from '~/pages/Boards/BoardContent/ListColumns/ListColumns.jsx'
import { mapOrder } from '~/utils/data.util.js'
import {
  defaultDropAnimationSideEffects,
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import Column from '~/pages/Boards/BoardContent/ListColumns/Column/Column.jsx'
import TrelloCard from '~/pages/Boards/BoardContent/ListColumns/Column/ListCards/TrelloCard/TrelloCard.jsx'

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

function BoardContent(props) {

  // const pointerSensor
  //   // require the mouse to move by 10 pixels before activating
  //   = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
  // -> cobug.
  // Yeu cau di chuyen chuot 10px thi ms thuc hien event
  const mouseSensor
    // require the mouse to move by 10 pixels before activating
    = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })

  // nhan giu 250s va dung sai cua cam ung la 500px thi thuc hien event
  const touchSensor
    // require the mouse to move by 10 pixels before activating
    = useSensor(TouchSensor, { activationConstraint: {
      delay: 250,
      tolerance: 500
    } })


  const sensors = useSensors(mouseSensor, touchSensor)

  const [orderedColumns, setOrderedColumns] = useState([])
  const board = props.board

  // Cung mot thoi diem chi co card hoac column dk keo
  const [activeDragItemId, setActiveDragItemId] = useState([])
  const [activeDragItemType, setActiveDragItemType] = useState([])
  const [activeDragItemData, setActiveDragItemData] = useState([])

  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
    // Khi board co change thi useEffect se dk chay lai
  }, [board])

  const handleDragStart = (event) => {
    console.log(event)
    if (!event || !event.active) {
      return
    }

    setActiveDragItemId(event.active.id)

    const data = event.active.data;
    if (!data) {
      return
    }

    const itemType = data.current.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN
    setActiveDragItemType(itemType)
    setActiveDragItemData(data.current)
    console.log('activeDragItemId:: ', activeDragItemId)
    console.log('activeDragItemType:: ', activeDragItemType)
    console.log('activeDragItemData:: ', activeDragItemData)
  }

  const handleDragEnd = (event) => {
    // active and over
    const { active, over } = event

    if (!active || !over) {
      return
    }

    if (active.id === over.id) {
      return
    }

    // old index
    const oldIndex = orderedColumns.findIndex(c => c._id === active.id)
    // new index
    const newIndex = orderedColumns.findIndex(c => c._id === over.id)
    // update lai columnOrderIds
    const dndOrderColumns = arrayMove(orderedColumns, oldIndex, newIndex)
    // const dndOrderColumnsIds = dndOrderColumns.map(c => c._id)

    // TODO: save dndOrderColumnsIds into database
    // update dndOrderColumns state
    setOrderedColumns(dndOrderColumns)

    // reset state and data
    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
  }

  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5'
        }
      }
    })
  }

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      sensors={sensors}
    >
      <Box sx={{
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
        width: '100%',
        height: (theme) => theme.trello.boardContentHeight,
        p: '10px 0'
      }}>
        <ListColumns columns={orderedColumns}/>
        <DragOverlay dropAnimation={dropAnimation}>
          {!activeDragItemType && null}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) && <Column column={activeDragItemData}/> }
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) && <TrelloCard card={activeDragItemData}/> }
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent
