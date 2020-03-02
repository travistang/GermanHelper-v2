import React from 'react'
import './style.css'
import {
  Fab,
  Icon,
  Typography
} from '@material-ui/core';
import SearchBar from './SearchBar'
import { withRouter } from 'react-router-dom'
import withOffline from '../../../backend/withOffline'

function SearchGroup(props) {
  const { online } = props // withOffline
  const [searchTerm, setSearchTerm ] = React.useState('')
  const toSearchPage = () => {

    props.history.push(`/search/${searchTerm}`)
  }
  return (
    <div className="SearchFormGroup">
      <SearchBar onSearchTermChange={setSearchTerm.bind(this)} />
      <Fab
        disabled={!online || !searchTerm || !searchTerm.length}
        onClick={toSearchPage.bind(this)}
        variant="extended" color="secondary" className="SearchButton">
        <Icon>search_outlined</Icon>
        <Typography variant="h3">Search</Typography>
      </Fab>
    </div>
  )
}

export default withRouter(
  withOffline(SearchGroup)
)
