
export const actions = {
  ADD_SEARCH: 'ADD_SEARCH',
  CLEAR_SEARCH: 'CLEAR_SEARCH'
}

const initialState = {
  rawSearches: [],
  searches: []
}

export default function(state = initialState, action) {
  switch(action.type) {
    case actions.ADD_SEARCH: // if the search wasn't there, add the record. Otherwise update the count
      const { word, form } = action.search
      const rawSearches = [...state.rawSearches, {
        ...action.search, date: new Date()
      }]
      const relatedSearch = state.searches.filter(search => {
        return search.word === word && search.form === form
      })
      if(relatedSearch.length === 0) {
        return {
          ...state,
          searches: state.searches.concat({
            ...action.search,
            searchCount: 1
          })
        }
      } else {
        return {
          ...state,
          searches: [
            ...state.searches.filter(search => search.word !== word || search.form !== form),
            {...action.search, searchCount: relatedSearch[0].searchCount + 1}
          ]
        }
      }
    case actions.CLEAR_SEARCH:
      return {...state, searches: []}
    default:
      return state
  }
}
