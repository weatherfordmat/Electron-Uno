import game from './games';
import { combineReducers } from 'redux';
import modal from './modal';

export default combineReducers({
    game,
    modal
});