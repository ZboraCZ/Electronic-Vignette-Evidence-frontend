import { routerReducer } from 'react-router-redux'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';

import vignettes from './vignettes'
import user from './user'

const reducers = {
  vignettes,
  user
}

const middlewares = [thunk]
export default createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer
  }),  
  compose(
    applyMiddleware(...middlewares),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)