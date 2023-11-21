import React from 'react'
import { Box } from '@mui/material'
import TrelloCard from '~/pages/Boards/BoardContent/ListColumns/Column/ListCards/TrelloCard/TrelloCard.jsx'
import Column from '~/pages/Boards/BoardContent/ListColumns/Column/Column.jsx'
import { horizontalListSortingStrategy, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'


function ListCards(props) {

  const cards = props.cards

  return (
    <SortableContext
      items={cards?.map(c => c._id)}
      strategy={verticalListSortingStrategy}
    >
      <Box sx={{
        p: '0 5px',
        m: '0 5px',
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        overflowX: 'hidden',
        overflowY: 'auto',
        maxHeight: (theme) => `calc(${theme.trello.boardContentHeight}
                 - ${theme.spacing(5)} - ${theme.trello.columnHeaderHeight} - ${theme.trello.columnFooterHeight})`,
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#ced0da'
        },
        '&::-webkit-scrollbar-thumb:hover': {
          backgroundColor: '#bfc2cf'
        }
      }}>
        {cards?.map(card => (<TrelloCard card={card} key={card._id}/>))}
      </Box>
    </SortableContext>
  )
}

export default ListCards
