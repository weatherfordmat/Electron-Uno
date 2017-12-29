import { combineReducers, createStore } from 'redux';

/**
 * initialize Store
 */
import Deck from '../structs/Deck';

// reducers;
import reducers from '../reducers';

// dev;
import devTools from './devTools';

const store = createStore(
    reducers,
    devTools()
);

if (process.env.NODE_ENV === 'development') {
    window.store = store;
}

const deck = new Deck();
deck.shuffle().shuffle().shuffle();

store.dispatch({
    type: 'ADD_DECK',
    deck: deck.deck
});

store.dispatch({
    type: 'ADD_PLAYER',
    player: {
        connectionID: '22312',
        username: 'marisaPierotti',
        score: 0,
        deck: []
    }
});

store.dispatch({
    type: 'ADD_PLAYER',
    player: {
        connectionID: '123Ab@',
        username: 'weatherfordmat',
        score: 0,
        deck: []
    }
});

store.dispatch({
    type: 'DEAL_CARDS'
});

export default store;