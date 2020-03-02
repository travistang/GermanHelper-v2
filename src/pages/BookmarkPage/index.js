import React from 'react'
import TopNavigation from '../TopNavigation'
import { withRouter } from 'react-router-dom'
import withBookmarks from '../../backend/withBookmarks'
import CenterNotice from '../../components/CenterNotice'
import ShortWordCard from '../../components/ShortWordCard'

import './style.css'

function BookmarkPage(props) {
  const {
    history,  // withRouter
    bookmarks // withBookmarks
  } = props
  return (
    <div className="BookmarkPage">
      <TopNavigation
        title="Bookmarks"
        rightButton={{
          name: "edit",
          onClick: () => history.push('/exercise')
        }}
      />
      <div className="BookmarkPageInnerContainer">
        {!bookmarks.length &&
          <CenterNotice
            iconName="bookmark"
            title="You have no bookmarks"
          />
        }
        {bookmarks.map(bookmark => (
          <ShortWordCard {...bookmark} />
        ))}
      </div>
    </div>
  )
}

export default withBookmarks(withRouter(BookmarkPage))
