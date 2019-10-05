import React from 'react'
import { connect } from 'react-redux'

export const actions = {
  SET_CONFIG: 'SET_CONFIG'
}

const initialState = {
  serverURL: 'http://localhost:8989',
  proxyURL: 'http://localhost:8080/ocr'
}


export default function(state = initialState, action) {
  switch(action.type) {
    case actions.SET_CONFIG:
      const { type, ...newConfig } = action
      return { ...state, ...newConfig }
    default: return state
  }
}

// helper HOC for getting config
export function withServerConfig(WrappedComponent) {
  return connect(
    state => state.config,
    dispatch => ({
      setConfig: ({ serverURL, proxyURL}) => dispatch({
        type: actions.SET_CONFIG,
        serverURL, proxyURL
      })
    })
  )(WrappedComponent)
}
