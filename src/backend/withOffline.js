import React from 'react'
import { Detector } from 'react-detect-offline'

export default function(WrappedComponent) {
  return function(props) {
    return (
      <Detector
        render={({online}) => (
          <WrappedComponent {...props} online={online} />
        )}
      />
    )
  }
}
