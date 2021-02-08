import {createStore, applyMiddleware} from 'redux';
import RootReducer from './root.reducer';
import thunk from 'redux-thunk';

const store = createStore(RootReducer, applyMiddleware(thunk));

export type RootStore = ReturnType<typeof RootReducer>;

export default store;
