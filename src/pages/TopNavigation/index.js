import React from 'react'
import './style.css'
import { withTheme } from '@material-ui/styles'
import { withRouter } from 'react-router-dom'
import { Typography, Icon } from '@material-ui/core'

function TopNavigation(props) {
  const {
    title, leftButton, rightButton,
    withBackButton,
    history // withRouter
  } = props
  return (
    <div
      style={{backgroundColor: props.theme.palette.primary.main }}
      className="TopNavigationContainer">
      <div className="TopNavigationButtonContainer">
        { (leftButton && !withBackButton) && (
          <Icon onClick={leftButton.onClick}>{leftButton.name}</Icon>
        )}
        {
          withBackButton && (
            <Icon onClick={history.goBack}>keyboard_arrow_left</Icon>
          )
        }
      </div>
      <Typography variant="h3">{title}</Typography>
      <div className="TopNavigationButtonContainer">
        { rightButton && (
          <Icon onClick={rightButton.onClick}>{rightButton.name}</Icon>
        )}
      </div>
    </div>
  )
}

export default withTheme(
  withRouter(TopNavigation)
)
