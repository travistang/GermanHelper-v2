import React from 'react'
import { withTheme } from '@material-ui/styles'
import { withRouter } from 'react-router-dom'
import { Typography } from '@material-ui/core'
import CounterBadge from '../CounterBadge'

import './style.css'

function ShortWordCard(props) {

  const {
    info, word, form, searchCount, // properties from store
    theme, className, history,
    canClick = true,
  } = props

  let subMessage = ''
  let formAbbreviation = ''
  const shortMeaning = info.meaning.join(';').replace(/\(.*?\)/, '')
  const wordOrDash = word => word?word:' - '

  switch (form) {
    case 'Adjective':
      formAbbreviation = 'adj.'
      subMessage = `${wordOrDash(info.comparative)} | ${wordOrDash(info.superlative)}`
      break
    case 'Noun':
      formAbbreviation = 'n.'
      subMessage = `${wordOrDash(`${info.gender}.`)} | ${wordOrDash(info.declension.plural)}`
      break
    case 'Verb':
      formAbbreviation = 'v.'
      subMessage = `${wordOrDash(info.auxillary)} | ${wordOrDash(info.tense.past_participle)}`
      break
    case 'Preposition':
      formAbbreviation = 'prep.'
      break
    case 'Adverb':
      formAbbreviation = 'adv.'
      break
    default:
      break
  }

  const onClick = () => history.push({
    pathname: '/wordDetails',
    state: {info, form, word, searchCount } // throw all the info including the form and the word itself to the detail page
  })

  return (
    <div className={`ShortWordCardContainer ${className}`} onClick={canClick && onClick}>
      <div className="ShortWordLeftContainer">
        <div className="ShortWordHeadRow">
          <Typography variant="h3"> {word} </Typography>
          <div style={{width: 8}} />
          <Typography variant="h4"> ({formAbbreviation}) </Typography>
        </div>
        <div className="ShortWordHeadRow">
          <Typography variant="h4" style={{color: theme.palette.grey2.main}}>
            {wordOrDash(subMessage)}
          </Typography>
        </div>
        <div className="ShortWordHeadRow">
          <Typography variant="h5" style={{color: theme.palette.grey2.main}}>
            {wordOrDash(shortMeaning)}
          </Typography>
        </div>
      </div>
      <CounterBadge count={searchCount} />
    </div>
  )
}

export default withRouter(withTheme(ShortWordCard))
