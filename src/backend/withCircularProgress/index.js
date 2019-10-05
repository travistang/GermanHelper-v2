import React from 'react'
import {
  Typography,
  CircularProgress,
  Dialog
} from '@material-ui/core'
import './style.css'
export default function(WrappedComponent) {
  return function(props) {
    const [showProgress, setShowProgress] = React.useState(false)
    const [title, setTitle] = React.useState(null)
    return (
      <>
        <WrappedComponent
          {...props}
          setShowProgress={setShowProgress}
          setProgressTitle={setTitle}
        />
        <Dialog open={showProgress}>
          <div className="CircularProgressContainer">
            <CircularProgress color="primary" />
            <Typography variant="h3">{title}</Typography>
          </div>
        </Dialog>
      </>
    )
  }
}
