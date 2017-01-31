import { combineReducers } from 'redux'
import lists from './lists'
import cards from './cards'

const appReducer = combineReducers({
    lists,
    cards
});

export default appReducer;