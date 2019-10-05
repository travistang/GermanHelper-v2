import React from 'react'
import { withRouter } from 'react-router-dom'
import {
  Typography,
  CircularProgress,
  Icon
} from '@material-ui/core'
import Separator from '../../../components/separator'
import { serverURL } from '../../../backend/constants'
import './style.css'

function OCRSuggestions(props) {
  const {
    word,
    suggestionState,
    history // withRouter
   } = props
  const [suggestions, setSuggestions] = React.useState(null)
  const [loading, setLoading ] = React.useState(true) // when this page loads, it is loading suggestions

  React.useEffect(() => {
    const fetchSuggestions = async () => {
      await setLoading(true)
      const response = await fetch(`${serverURL}/closest/${word}`)
      const payload = await response.json()
      await setLoading(false)
      await setSuggestions(payload.suggestions)
    }

    fetchSuggestions()
  }, [word])

  const SuggestionRow = ({word}) => (
    <div className="OCRSuggestionRow" onClick={() => history.push({
      pathname: `/search/${word}`,
      state: suggestionState
    })}>
      <Typography variant="h4">{word}</Typography>
      <Icon>keyboard_arrow_right</Icon>
    </div>
  )
  return (
    <div className="OCRSuggestions">
      <div className="OCRSuggestionsHeaderRow">
        <Typography variant="h2">"{word}"</Typography>
      </div>
      <div className="OCRSuggestionsInner">
        {loading && (
            <div className="OCRSuggestionsLoadingComponent">
              <CircularProgress color="primary" />
              <Separator size={16} />
              <Typography variant="h3">Looking up similar words...</Typography>
            </div>
          )
        }
        {
          (suggestions && (suggestions.length > 0) && !loading) &&
          suggestions.map(sugg => <SuggestionRow word={sugg} />)
        }
      </div>
    </div>
  )
}

export default withRouter(OCRSuggestions)
