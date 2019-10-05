import React from 'react'

import { withTheme } from '@material-ui/styles'
import { withRouter } from 'react-router-dom'
import withBookmarks from '../../backend/withBookmarks'
import withActionSheet from '../../backend/withActionSheet'

import ShortWordCard from '../../components/ShortWordCard'
import ActionSheetOption from '../../components/ActionSheetComponent'
import GrammarSection from './GrammarSection'
import TopNavigation from '../TopNavigation'
import { Typography } from '@material-ui/core'
import CounterBadge from '../../components/CounterBadge'
import { Icon } from '@material-ui/core'

import './style.css'

function WordDetails(props) {
  const {
    location, history, // withRouter
    theme: {palette},  // withTheme
    setActionSheetComponents, // withActionSheet
    open, setOpen,            // withActionSheet
    getBookmark, bookmarks,   // withBookmarks
    newWordOrBookmark,        // withBookmarks
    addBookmark, removeBookmark, // withBookmarks
    details
  } = props
  // state passed to this page

  let { word, form, info, searchCount } = newWordOrBookmark(location.state)
  const verticalBuffer = <div style={{height: 8}} />
  const subtitleRow = subtitle => (
    <div className="WordDetailsSubtitleRow">
      <Typography variant="h3">{subtitle}</Typography>
    </div>
  )

  React.useEffect(() => {
    const isBookmarked = getBookmark({ word, form })
    let actionSheetOptions
    if(!isBookmarked) {
      actionSheetOptions = [{
        iconName: 'library_add',
        title: 'Add To Bookmark',
        onClick: () => {
          addBookmark({word, form, info})
          setOpen(false)
        }
      }, {
        iconName: 'edit',
        title: 'Edit Word',
        onClick: () => {
          history.push({
            pathname: '/edit',
            state: {
              adding: false,
              info: {word, form, ...info}
            }
          })
        }
      }]
    } else {
      actionSheetOptions = [{
        iconName: 'delete',
        title: 'Remove Bookmark',
        onClick: () => {
          removeBookmark({word, form })
          setOpen(false)
        }
      }]
    }
    const ActionSheetComponents = actionSheetOptions.map(ActionSheetOption)
    setActionSheetComponents(ActionSheetComponents)
  }, [bookmarks, open])

  return (
    <div className="WordDetailsContainer">

      <TopNavigation
        leftButton={{
          name: 'keyboard_arrow_left',
          onClick: history.goBack
        }}
        rightButton={{
          name: getBookmark({word, form})?'bookmark':'bookmark_outlined',
          onClick: () => setOpen(!open)
        }}
        title={word} />
      <div className="WordDetailsInnerContainer">
        <div className="WordDetailsRow">
          <div className="WordDetailsSumamryContainer">
            <Typography variant="h2">
              {word}
            </Typography>
            {verticalBuffer}
            <Typography variant="h4">
              {form}
            </Typography>
          </div>
          <div className="SearchCountContainer">
            <CounterBadge count={searchCount} />
            {verticalBuffer}
            <Typography variant="h5">
              Times Searched
            </Typography>
          </div>
        </div>
        <GrammarSection form={form} info={info} />
        <div className="WordDetailsRow">
          {subtitleRow("Meaning")}
        </div>
        <div className="WordDetailsRow">
          <ol className="WordDetailsMeaningList">
            {
              info.meaning.map(meaning => (
                <li className="WordDetailsMeaningItem">{meaning.trim()}</li>
              ))
            }
          </ol>
        </div>
      </div>
    </div>
  )
}

export default withTheme(
  withRouter(
    withActionSheet(
      withBookmarks(WordDetails)
    )
  )
)
