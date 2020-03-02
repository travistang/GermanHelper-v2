import React from 'react'
import { Icon, Typography } from '@material-ui/core'
import './style.css'
export default function({iconName, title, onClick}) {
  return (
    <div className="ActionSheetOption" onClick={onClick}>
      <Icon>{iconName}</Icon>
      <div style={{width: 16}} />
      <Typography variant="h2">{title}</Typography>
    </div>
  )
}
