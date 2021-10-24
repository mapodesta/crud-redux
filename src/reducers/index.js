import { combineReducers } from 'redux';
import productosReducers from './productos.Reducers';
import alertasReducer from './alertasReducer';

export default combineReducers({
  productos: productosReducers,
  alertas: alertasReducer,
});
