import { combineReducers } from 'redux-immutable'
import { global } from './global'
import { home } from './home'

/* your reducers */
const rootReducer = combineReducers({
  global,
  home
})
export default rootReducer
