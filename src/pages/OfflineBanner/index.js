import React from 'react'
import { Offline } from 'react-detect-offline'
import { Icon, Typography } from '@material-ui/core'
import "./style.css"

export default function(props) {
  return (
    <Offline>
      <div className="OfflineBanner">
        <Icon>warning</Icon>
        <div style={{width: 8}} />
        <Typography variant="h3">
          You are offline.
        </Typography>
      </div>
    </Offline>
  )
}
