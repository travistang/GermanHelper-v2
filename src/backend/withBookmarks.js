import React from 'react'
import {connect} from 'react-redux'
import { actions as BookmarkActions, compareBookmark } from '../reducers/bookmark'

// functions related to extracting bookmarks
export function getBookmark(bookmarks, word) {
  const foundBookmarks = bookmarks.filter(b => compareBookmark(b, word))
  return foundBookmarks[0]
}

export function newWordOrBookmark(bookmarks, {word, form, info, ...rest}) {
  const bookmark = getBookmark(bookmarks, { word, form})
  if(bookmark) return { word, info: bookmark.info, form, ...rest }
  else return { word, form , info, ...rest}
}

export default function(WrappedComponent) {
  return connect(           // bounding the wrapped component to redux
    state => state.bookmark,
    dispatch => ({
      addBookmark: word => dispatch({
        type: BookmarkActions.ADD_BOOKMARK,
        word
      }),
      removeBookmark: word => dispatch({
        type: BookmarkActions.REMOVE_BOOKMARK,
        word
      })
    }),
  )(function({bookmarks, ...props}) {
    // the wrapped component with additional properties
    return (
      <WrappedComponent
        {...props}
        bookmarks={bookmarks}
        newWordOrBookmark={b => newWordOrBookmark(bookmarks, b)}
        getBookmark={(b) => getBookmark(bookmarks, b)}
      />)
  })
}
