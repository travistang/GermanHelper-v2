import React from 'react'
import { withRouter } from 'react-router-dom'
import { withTheme } from '@material-ui/styles'
import { connect } from 'react-redux'
import { Typography } from '@material-ui/core'
import TopNavigation from '../TopNavigation'
import { List } from 'react-content-loader'
import './style.css'
import { range } from 'lodash'
import { withWordSearch } from '../../backend/hoc'
import ShortWordCard from '../../components/ShortWordCard'
import CenterNotice from '../../components/CenterNotice'

function SearchResultPage(props) {
  const {
    location, history,  // withRouter
    wordInfo, loading,
  } = props
  const word = location.pathname.split('/').pop()
  // the state that this page carries if it is from OCR suggestions
  const suggestionState = location.stsate

  const loadingComponent = range(4).map(_ => <List />)
  const notFoundComponent = <CenterNotice iconName="search" title="No German Words Found" />
  const formComponent = (form, formInfo) => formInfo?(
          <div className="SearchResultFormRow">
            <Typography variant="h2">{form}</Typography>
            <ShortWordCard
              className="SearchResultCard"
              form={form}
              info={formInfo}
              word={word} />
          </div>
        ): null

  return (
    <div className="SearchResultPageContainer">
      <TopNavigation
        title={`Search Result for "${word}"`}
        withBackButton
      />
      <div className="SearchResultMain">
        {loading && loadingComponent}
        <div className="SearchResultList">
          { (!loading && wordInfo)? ( // if it is not loading and there are info
              Object.keys(wordInfo).map(form => ( // then for each info....
                formComponent(form, wordInfo[form])
              ))):( // otherwise the loading and the not found message
                !loading && notFoundComponent
              )
          }
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => state.search

export default withWordSearch(
  withTheme(
    withRouter(
      connect(mapStateToProps, null)(SearchResultPage)
    )
  )
)
