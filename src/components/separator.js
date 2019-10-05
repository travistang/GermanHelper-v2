import React from 'react'

export default function({horizontal = false, size = 8}) {
  return (
    <div style={{[horizontal?"width":"height"]: size}} />
  )
}
