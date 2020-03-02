import React from 'react'
import {
  MenuItem,
  Popper,
  Paper,
  Typography, Icon
} from '@material-ui/core'
import Highlight from '../../../components/Highlight'
import CenterNotice from '../../../components/CenterNotice'
import { withRouter } from 'react-router-dom'
import { withTheme } from '@material-ui/styles'
import withBookmarks from '../../../backend/withBookmarks'
import { recognisedWordForms } from '../../../backend/constants'
function SearchSuggestionContainer(props) {
  const { open,
    history, // withRouter
    suggestions = {},
    anchorEl,
    searching,
    getBookmark,
    searchWord, onSelectWord } = props
  return (
    <Popper id="SuggestionsContainer" open={open} anchorEl={anchorEl}>
      <Paper square style={{ width: anchorEl ? anchorEl.clientWidth : undefined }}>
        {searching && (
          <CenterNotice className="SearchSuggestionCenterNotice" iconName="search" title="Searching..." />
        )}
        {!searching && Object.keys(suggestions).map(sugg => (
          <MenuItem
            key={sugg}
            component="div"
            onClick={() => onSelectWord(sugg)}
            >
            <Highlight word={sugg} highlightWord={searchWord} />
            {
              recognisedWordForms.some(form => !!getBookmark({word: sugg, form})) && (
                <Icon color="primary">bookmark</Icon>
              )
            }
          </MenuItem>
        ))}
        {!searching && (
          <div
            onClick={() => history.push({
              pathname: '/edit',
              state: {adding: true, info: { word: searchWord }}
            })}
            className="SuggestionsContainerAddWordRow">
            <Icon>add</Icon>
            <div style={{width: 8}} />
            <Typography variant="h3">Add a word</Typography>
          </div>
        )}
      </Paper>
    </Popper>
  )
}

export default withRouter(
  withTheme(
    withBookmarks(SearchSuggestionContainer)
  )
)
