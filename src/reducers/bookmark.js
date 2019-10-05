import { isEqual } from 'lodash'
export const actions = {
  ADD_BOOKMARK: 'ADD_BOOKMARK',
  REMOVE_BOOKMARK: 'REMOVE_BOOKMARK'
}

const initialState = {
  bookmarks: []
}

export function compareBookmark(b1, b2) {
  return b1.word === b2.word &&  b1.form === b2.form
}

const findBookmark = (bookmarks, {form, word})  => {
  const foundBookmarks = bookmarks.filter(b => b.form === form && b.word === word)[0]
  if(!foundBookmarks) return {found: null, bookmarks}
  else return {
    found: foundBookmarks,
    bookmarks: bookmarks.filter(b => !compareBookmark(b, foundBookmarks))
  }
}

export default function(state = initialState, action) {
  const newWord = action.word
  switch(action.type) {
    case actions.ADD_BOOKMARK:
      // if the word is there, do nothing
      if(findBookmark(state.bookmarks, newWord).found) return state
      return {
        ...state,
        bookmarks: state.bookmarks.concat(newWord)
      }
    case actions.REMOVE_BOOKMARK:
      const {found, bookmarks: remainingBookmarks} = findBookmark(state.bookmarks, newWord)
      // if the word is not there, nothing to remove
      if(!found) return state

      return {
        ...state,
        bookmarks: remainingBookmarks
      }
    default: return state
  }
}
