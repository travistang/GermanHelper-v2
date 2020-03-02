import React from 'react'
import { withRouter } from 'react-router-dom'
import { withTheme } from '@material-ui/styles'

import TopNavigation from '../TopNavigation'
import CenterNotice from '../../components/CenterNotice'

import './style.css'
function ActivityPage(props) {
  const { theme, history } = props
  return (
    <div className="ActivityPage">
      <TopNavigation
        title="Activity"
      />
      <div className="ActivityPageInner">
        <CenterNotice
          title="Coming soon!"
          iconName="bar_chart_outlined"
        />
      </div>
    </div>
  )
}

export default withTheme(
  withRouter(ActivityPage)
)
