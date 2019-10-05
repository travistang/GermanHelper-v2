import React from 'react'
import "./style.css"

export default function Button({className, ...props}) {
  return (
    <div className={["Button", className].join(' ')} {...props} />
  )
}
