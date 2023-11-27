import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  Box,
} from '@mui/material'
import ListColumns from '~/pages/Boards/BoardContent/ListColumns/ListColumns.jsx'
import { mapOrder } from '~/utils/data.util.js'
import {
  closestCorners,
  defaultDropAnimationSideEffects,
  DndContext,
  DragOverlay, getFirstCollision,
  MouseSensor, pointerWithin,
  TouchSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import Column from '~/pages/Boards/BoardContent/ListColumns/Column/Column.jsx'
import TrelloCard from '~/pages/Boards/BoardContent/ListColumns/Column/ListCards/TrelloCard/TrelloCard.jsx'
import {cloneDeep} from 'lodash'
import column from '~/pages/Boards/BoardContent/ListColumns/Column/Column.jsx'

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
  const board = props?.board

  // Cung mot thoi diem chi co card hoac column dk keo
  const [activeDragItemId, setActiveDragItemId] = useState([])
  const [activeDragItemType, setActiveDragItemType] = useState([])
  const [activeDragItemData, setActiveDragItemData] = useState([])
  const lastOverId = useRef( null)

  // cache tmp data old
  const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] = useState([])

  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
    // Khi board co change thi useEffect se dk chay lai
  }, [board])

  const findColumnByCardId = (cardId) => {
    return orderedColumns.find(column => column.cards.map(card => card._id)?.includes(cardId))
  }

  const handleDragStart = (event) => {
    console.log('handleDragStart::', event)
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

    // neu move card thi moi thuc hien hanh dong backup card
    if (itemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      setOldColumnWhenDraggingCard(findColumnByCardId(event.active.id))
    }

    console.log('activeDragItemId:: ', activeDragItemId)
    console.log('activeDragItemType:: ', activeDragItemType)
    console.log('activeDragItemData:: ', activeDragItemData)
  }

  const handleDragOver = (event) => {
    console.log('handleDragOver::', event)
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      // neu la column thi ko can xu ly gi them
      return
    }

    const { active, over } = event
    if (!active || !over) {
      return
    }

    if (active.id === over.id) {
      return
    }

    const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
    const { id: overCardId } = over

    // tim 2 column theo card id
    const activeColumn = findColumnByCardId(activeDraggingCardId)
    const overColumn = findColumnByCardId(overCardId)
    console.log('activeColumn:: ', activeColumn)
    console.log('overColumn:: ', overColumn)

    if (!activeColumn || !overColumn) return

    if (activeColumn._id === overColumn._id) return

    setOrderedColumns(prevColumns => {
      return getOrderedColumnCalc(active, over, overColumn, activeColumn, prevColumns, overCardId, activeDraggingCardId, activeDraggingCardData)
    })
  }

  const getOrderedColumnCalc = (active, over, overColumn, activeColumn, prevColumns, overCardId, activeDraggingCardId, activeDraggingCardData) => {
    // tim vi tri index cua over card trong column target
    const overCardIndex = overColumn.cards.findIndex(card => card._id === overCardId)

    // logic card index moi, tinh toan vi tri moi cua card tren column moi
    let newCardIndex
    // top, width, height vi tri cua phan tu so voi khung hinh, rect of canvas
    const isBelowOverItem = active.rect.current.translated &&
      active.rect.current.translated.top > over.rect.top + over.rect.height

    const modifier = isBelowOverItem ? 1 : 0
    newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn.cards.length + 1

    console.log('isBelowOverItem:: ', isBelowOverItem)
    console.log('modifier:: ', modifier)
    console.log('newCardIndex:: ', newCardIndex)

    const nextColumns = cloneDeep(prevColumns)
    const nextActiveColumn = nextColumns.find(column => column._id === activeColumn._id)
    const nextOverColumn = nextColumns.find(column => column._id === overColumn._id)

    // old column
    if (nextActiveColumn) {
      // remove item card on old column
      nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDraggingCardId)

      // update card order ids
      nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)
    }

    // new column
    if (nextOverColumn) {
      // kiem tra xem card dang keo no co ton tai o trong over column chua, neu co thi remove index
      nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)

      // Khi da update lai column id thi moi ko can phai backup card tmp
      const rebuildActiveDraggingCardData = {
        ...activeDraggingCardData,
        columnId: nextOverColumn._id
      }

      // Tiep theo la them cai card dang keo vao over column
      // toSpliced khac vs splice, splice thi cap nhat mang ban dau con toSpliced thi tao ra mang moi va k sua lai mang ban dau
      // vi tri muon them, 0 la ko xoa thang nao het, data muon set vao vi tri do
      nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, rebuildActiveDraggingCardData)

      // cap nhat lai mang cardOrderIds cua column moi
      nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)
    }

    return nextColumns
  }

  const handleDragEnd = (event) => {
    console.log('handleDragEnd::', event)
    // active and over
    const { active, over } = event

    if (!active || !over) {
      return
    }

    if (active.id === over.id) {
      return
    }

    // check active item type
    console.log('activeDragItemType::', activeDragItemType)
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      dragDropCard(active, over)
    } else {
      dragDropColumn(active, over)
    }

    // reset state and data
    resetValueDragItem()
  }

  const resetValueDragItem = () => {
    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
    setOldColumnWhenDraggingCard(null)
  }

  const dragDropCard = (active, over) => {
    const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
    const { id: overCardId } = over

    // tim 2 column theo card id
    const activeColumn = findColumnByCardId(activeDraggingCardId)
    const overColumn = findColumnByCardId(overCardId)
    console.log('activeColumn:: ', activeColumn)
    console.log('overColumn:: ', overColumn)

    if (!activeColumn || !overColumn) return
    // Phai dung toi oldColumnWhenDraggingCard._id(set vao state buoc handlerDragStart) chu ko phai activeData
    // trong scope handlerDragEnd nay vi sau khi di qua onDragOver toi day la state ard da bi cap nhat mot lan r
    if (oldColumnWhenDraggingCard._id !== overColumn._id) {
      console.log('keo tha khac column')
      setOrderedColumns(prevColumns => {
        return getOrderedColumnCalc(active, over, overColumn, activeColumn, prevColumns, overCardId, activeDraggingCardId, activeDraggingCardData)
      })
    } else {
      console.log('keo tha trong cung column')
      const oldCards = oldColumnWhenDraggingCard.cards
      // old index
      const oldCardIndex = oldCards.findIndex(c => c._id === activeDraggingCardId)
      // new index
      const newCardIndex = overColumn.cards.findIndex(c => c._id === overCardId)
      // dung arrayMoves order card
      const dndOrderCards = arrayMove(oldCards, oldCardIndex, newCardIndex)
      // update state cards oder id
      setOrderedColumns(prevColumns => {
        const nextColumns = cloneDeep(prevColumns)
        // get column contain card in nextColumns
        const targetColumn = nextColumns.find(c => c._id === overColumn._id)
        console.log('targetColumn:: ', targetColumn)

        // edit card in column on nextColumns -> update cardOrderIds
        targetColumn.cards = dndOrderCards
        targetColumn.cardOrderIds = dndOrderCards.map(card => card._id)

        return nextColumns
      })
    }
  }

  const moveCardInColumnNow = () => {
  }

  const moveCardBetweenDifferentColumn = () => {
  }

  const dragDropColumn = (active, over) => {
    // old index
    const oldColumnIndex = orderedColumns.findIndex(c => c._id === active.id)
    // new index
    const newColumnIndex = orderedColumns.findIndex(c => c._id === over.id)
    // update lai columnOrderIds
    const dndOrderColumns = arrayMove(orderedColumns, oldColumnIndex, newColumnIndex)
    // const dndOrderColumnsIds = dndOrderColumns.map(c => c._id)

    // TODO: save dndOrderColumnsIds into database
    // update dndOrderColumns state
    setOrderedColumns(dndOrderColumns)
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

  const collisionDetectionStrategy = useCallback((args) => {
    console.log('collisionDetectionStrategy')
    // neu la column thi su dung thuat toan cu
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      return closestCorners({
        ...args
      })
    }

    // tim cac diem giao nhau, va cham vs con tro
    const pointerIntersections = pointerWithin(args)
    if (!pointerIntersections?.length) {
      return
    }

    // tim cai overId dau tien trong dam intersection o tren
    let overId = getFirstCollision(pointerIntersections, 'id')
    if (overId) {
      const checkColumn = orderedColumns.find(column => column._id === overId)
      if (checkColumn) {
        console.log('overId before 1:: ', overId)
        overId = closestCorners({
          ...args,
          droppableContainers: args.droppableContainers
            .filter(container => container.id !== overId && checkColumn?.cardOrderIds?.includes(container.id))
        })[0]?.id
        // console.log('overId after:: ', overId)
      }

      lastOverId.current = overId
      return [{ id: overId }]
    }

    console.log('overId before 2:: ', overId)
    return lastOverId.current ? [{ id: lastOverId }] : []
  }, [activeDragItemType])

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      sensors={sensors}
      // collisionDetection={closestCorners}
      collisionDetection={collisionDetectionStrategy}
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
