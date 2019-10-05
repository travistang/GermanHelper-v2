import React from 'react'
import { Typography } from '@material-ui/core'
import { withTheme } from '@material-ui/styles'
import './style.css'

function CounterBadge({count = 0, className, theme, ...props}) {
  return (
    <div
      {...props}
      className={`CounterBadge ${className}`}
      style={{backgroundColor: theme.palette.primary.main}}>
      <Typography variant="h3" color="white">{count}</Typography>
    </div>
  )
}

export default withTheme(CounterBadge)
