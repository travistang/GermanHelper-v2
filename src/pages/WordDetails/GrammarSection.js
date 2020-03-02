import React from 'react'
import {
  Typography
} from '@material-ui/core'
import flatten from 'flat'
import { ExerciseMask } from '../../backend/withExerciseMask'

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

const KeyValueRow = ({keyName, value, setExerciseRefs}) => {
  return (
    <div className="GrammarSectionKeyValueRow">
      <div className="GrammarSectionKeyValueColumn GrammarSectionKey">
        <Typography variant="h4">{keyName}</Typography>
      </div>
      <ExerciseMask>
        <div className="GrammarSectionKeyValueColumn">
          <Typography variant="h3">{value}</Typography>
        </div>
      </ExerciseMask>
    </div>
  )
}

export default function({
  info: { meaning, ...nestedInfo },  // so that the "meanings" are excluded from the info
  form
}) {
  const info = flatten(nestedInfo)
  const infoKeyToRowKey = key => {
    return key.split('.').pop().replace(/_/g, ' ')
  }

  // when the nested info updates, create a new list of refs for it
  // React.useEffect(() => {
  //   setExerciseRefs(Object.keys(info).map(_ => React.createRef()))
  // }, [])

  if (form === 'Adverb') return null
  return (
    <Wrapper>
      {
        Object.keys(info).map(
          (key, i) => <KeyValueRow
            // ref={exerciseRefs[i]}
            keyName={infoKeyToRowKey(key)}
            value={info[key]}
          />
        )
      }
    </Wrapper>
  )
}
