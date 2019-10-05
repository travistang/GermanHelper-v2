import React from 'react'
import Highlight from 'react-highlight-words'
import './style.css'
export default function({word, highlightWord, ...props}) {
  return (
    <Highlight
      {...props}
      highlightClassName="MuiTypography-h4 HighlightText"
      unhighlightClassName="MuiTypography-h4"
      searchWords={[highlightWord]}
      autoEscape={true}
      textToHighlight={word}
    />
  )
}
