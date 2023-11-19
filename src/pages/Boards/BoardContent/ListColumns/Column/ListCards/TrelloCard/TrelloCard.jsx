import React from 'react'
import { Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import { Attachment, Comment, Group } from '@mui/icons-material'

function TrelloCard(props) {
  if (props.temporaryHideMedia) {
    return (
      <Card sx={{
        cursor: 'pointer',
        boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
        overflow: 'unset'
      }}>
        <CardContent sx={{
          p: 1.5,
          '&:last-child': {
            p: 1.5
          }
        }}>
          <Typography>
            HoangTiger Fullstack
          </Typography>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card sx={{
      cursor: 'pointer',
      boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
      overflow: 'unset'
    }}>
      <CardMedia
        sx={{ height: 140 }}
        image="https://mixkit.imgix.net/art/399/399-original.png-1000h.png"
        title="green iguana"
      />
      <CardContent sx={{
        p: 1.5,
        '&:last-child': {
          p: 1.5
        }
      }}>
        <Typography>
          HoangTiger Fullstack
        </Typography>
      </CardContent>
      <CardActions sx={{
        p: '0 4px 8px 4px'
      }}>
        <Button size="small" startIcon={<Group/>}>20</Button>
        <Button size="small" startIcon={<Comment/>}>15</Button>
        <Button size="small" startIcon={<Attachment/>}>10</Button>
      </CardActions>
    </Card>
  )
}

export default TrelloCard
