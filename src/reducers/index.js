import  { combineReducers } from 'redux'
import search from './search'
import bookmark from './bookmark'
import config from './config'

export default combineReducers({
  search,
  bookmark,
  config
})
