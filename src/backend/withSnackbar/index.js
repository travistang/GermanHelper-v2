import React from 'react'
import {
  Snackbar, SnackbarContent,
  Typography, Icon
} from '@material-ui/core'
import Separator from '../../components/separator'
import './style.css'

export default function(WrappedComponent) {
  return function(props) {

    const [ openSnackbar, setOpenSnackbar ] = React.useState(false)
    const [snackbarConfig, setSnackbarConfig ] = React.useState({})

    const { title, icon, style, ...config } = snackbarConfig

    return (
      <>
        <WrappedComponent
          setOpenSnackbar={setOpenSnackbar}
          setSnackbarConfig={setSnackbarConfig}
          {...props} />
        <Snackbar
          variant="primary"
          open={openSnackbar}>
          <SnackbarContent
            style={style}
            message={(
              <div className="SnackbarContainer">
                <Icon>{icon}</Icon>
                <Separator horizontal size={16} />
                <Typography variant="h3">
                  {title}
                </Typography>
              </div>
            )}
          />

        </Snackbar>
      </>
    )
  }
}
