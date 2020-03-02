import React from 'react'
import {
  TextField,
} from '@material-ui/core'
import SuggestionsContainer from './SuggestionsContainer'
import { withWiktionary } from '../../../backend/hoc'

const SearchBar = function(props) {
  const { wiktionary, onSearchTermChange } = props
  // the states
  const [input, setInput] = React.useState('')
  const [suggestions, setSuggestions] = React.useState({})
  const [anchorEl, setAnchorEl] = React.useState(null)
  // flag indicating if a search is ongoing
  const [searching, setSearching] = React.useState(null)
  // the counter that launches the search when time is up
  const [searchCounter, setSearchCounter] = React.useState(null)

  const onSetInput = (value) => {
    setInput(value)
    clearTimeout(searchCounter)
    setSearching(true)
    setSearchCounter(
      setTimeout(async () => {
        setSuggestions(await wiktionary.getSearchAutoCompleteSuggestion(value))
        setSearching(false)
      }, 500)
    )
  }

  const onSelectWord = (word) => {
    setInput(word)
    setAnchorEl(null) // close the anchor
    setSuggestions({})
    onSearchTermChange(word)
  }
  return (
    <div className="SearchFormInput">
      <TextField
        style={{flex: 1}}
        onClick={e => setAnchorEl(e.currentTarget)}
        onChange={e => onSetInput(e.target.value)}
        value={input}
        label="Search Words" />
      <SuggestionsContainer
        open={!!anchorEl && !!input}
        anchorEl={anchorEl}
        searchWord={input}
        searching={searching}
        onSelectWord={onSelectWord.bind(this)}
        suggestions={suggestions}/>
    </div>
  )
}

export default withWiktionary(SearchBar)
