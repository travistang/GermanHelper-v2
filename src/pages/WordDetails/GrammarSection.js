import React from 'react'
import {
  Typography
} from '@material-ui/core'
import flatten
 from 'flat'
const Wrapper = ({children}) => (
  [
    <div className="WordDetailsRow GrammSectionWrapper">
      <Typography variant="h3">Grammar</Typography>
    </div>,
    <div className="WordDetailsRow">
      <div className="GrammarSectionContainer">
        {children}
      </div>
    </div>
  ]
)
const KeyValueRow = ({keyName, value}) => (
  <div className="GrammarSectionKeyValueRow">
    <div className="GrammarSectionKeyValueColumn GrammarSectionKey">
      <Typography variant="h4">{keyName}</Typography>
    </div>

    <div className="GrammarSectionKeyValueColumn">
      <Typography variant="h3">{value}</Typography>
    </div>
  </div>
)
export default function({
  info: { meaning, ...nestedInfo },  // so that the "meanings" are excluded from the info
  form
}) {
  const info = flatten(nestedInfo)
  const infoKeyToRowKey = key => {
    return key.split('.').pop().replace(/_/g, ' ')
  }
  if (form === 'Adverb') return null
  return (
    <Wrapper>
      {
        Object.keys(info).map(
          key => <KeyValueRow
            keyName={infoKeyToRowKey(key)}
            value={info[key]}
          />
        )
      }
    </Wrapper>
  )
}
