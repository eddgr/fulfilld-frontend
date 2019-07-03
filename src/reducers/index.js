import { combineReducers } from "redux"
import messages from './messageReducer'
import venues from './venueReducer'
import currentUser from './userReducer'
import loggedIn from './loggedInReducer'

export default combineReducers({
  messages,
  venues,
  currentUser,
  loggedIn
})
