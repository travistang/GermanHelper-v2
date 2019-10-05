import React from 'react'
import Webcam from "react-webcam"
import { Icon, Typography } from '@material-ui/core'

import { withTheme } from '@material-ui/styles'
import { withServerConfig } from '../../reducers/config'
import withSnackbar from '../../backend/withSnackbar'

import 'react-html5-camera-photo/build/css/index.css'
import './style.css'

export default function(WrappedComponent) {
  return withTheme(withServerConfig(
    withSnackbar(function(props) {
      const url = props.serverURL
      const {
        theme,
        setSnackbarConfig,
        setOpenSnackbar,
      } = props

      const webcamRef = React.useRef(null)
      // states
      const [cameraStarted, setCameraStarted] = React.useState(false)
      const [photo, setPhoto] = React.useState(null)
      const [boxAndWords, setBoxAndWords] = React.useState(null)
      const [recognizing, setRecognizing] = React.useState(false)
      // derived states and actions
      const launchCamera = () => setCameraStarted(true)


      const onPhotoTaken = async photo => {
        setPhoto(photo)
        setCameraStarted(false)

        setRecognizing(true)

        const photoString = photo.replace(/^data:image\/jpeg;base64,/, "")
        const formData = new FormData()
        formData.append('image', photoString)
        const response = await fetch(url, {
          method: 'POST',
          mode: 'cors',
          body: formData
        })
        try {
          setBoxAndWords(await response.json())
        } catch(e) {
          setSnackbarConfig({
            title: "Cannot reach OCR Server",
            icon: "warning",
            style: {
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              backgroundColor: theme.palette.secondary.main
            },
            anchorOrigin: {
               vertical: 'bottom',
               horizontal: 'left',
             }
          })
          setOpenSnackbar(true)
          setTimeout(() => setOpenSnackbar(false), 3000)
        }


        setRecognizing(false)
      }
      return (cameraStarted?
          <>
            <Icon
              onClick={() => setCameraStarted(false)}
              className="CameraBackButton">
              keyboard_arrow_left
            </Icon>
            <div className="CameraViewWrapper">
              <Webcam
                ref={webcamRef}
                audio={false}
                screenshotFormat="image/jpeg"
                onTakePhoto={onPhotoTaken}
                videoConstraints={{
                  width: 320,
                  height: 240,
                  facingMode: 'environment'
                }}
              />
              <div className="CameraHelpText">
                <Typography variant="h3" style={{color: 'white'}}>
                  Point your camera towards some German text, then click the button below.
                </Typography>
              </div>
              <div className="CameraShootButtonRow"
                onClick={() => onPhotoTaken(webcamRef.current.getScreenshot())}
              >
                <div className="CameraShootButton" style={{backgroundColor: theme.palette.primary.main}}>
                  <Icon color="white">photo_camera</Icon>
                </div>
              </div>
            </div>
          </>:
          <WrappedComponent
            {...props}
            boxAndWords={boxAndWords}
            recognizing={recognizing}
            photo={photo}
            launchCamera={launchCamera} />
      )
  })))
}
