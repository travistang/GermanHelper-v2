import { Typography, Icon} from '@material-ui/core'
import './TabButtonStyle.css'
import React from 'react'
import { withRouter } from 'react-router-dom'
import { withTheme } from '@material-ui/core'

function TabButton({ theme, iconName, label, href, location, history}) {
  const colorCode = (href === location.pathname)?"primary":"grey1"
  const color = theme.palette[colorCode].main
  
  const goToPage = () => {
    if (location.href === href) return
    history.push(href)
  }
  return (
    <div className="TabButton" onClick={goToPage} style={{color}}>
      <Icon color={color}>{iconName}</Icon>
      <Typography variant="h4" color={color}>
        {label}
      </Typography>
    </div>
  )
}

export default withRouter(withTheme(TabButton))
