import update from 'immutability-helper';

const game = (state = {
    turn: 0,
    players: [],
    direction: 1,
    color: null,
    discardStack: [],
    drawStack: [],
    drawTwo: true, 
    get playerCount () {
        return this.players.length === 0 ? null : this.players.length;
    },
    get hasWon() {
        let hasWon = false;
        this.players.forEach(element => {
            if (element.deck === 0) {
                hasWon = true;
            };
        });
        return hasWon;
    }
  }, action) => {
  switch (action.type) {
    case 'ADD_DECK':
        console.log(action.deck.length)
        let newState = Object.assign({}, state, {
            drawStack: action.deck
        });
        return newState
    case 'SWITCH_TURN':
        return Object.assign({}, state, {
            turn: action.turn,
            get hasWon() {
                let hasWon = false;
                state.players.forEach(element => {
                    if (element.deck.length === 0) {
                        hasWon = true;
                    };
                });
                return hasWon;
            }
        });
    case 'DEAL_CARDS':
        var cp = state.drawStack.slice();
        return Object.assign({}, state, {
            players: update(state.players, {
                $apply: p => p.map((item, index) => {
                    return {
                        [index]: {
                            deck: update([], {$set: cp.splice(0, 7)}),
                            connectionID: item.connectionID,
                            username: item.username,
                            score: item.score
                        },
                    }[index]
                })
            }),
            discardStack: cp.slice(0,1),
            drawStack: cp
        });
    case 'SKIP_TURN':
        return Object.assign({}, state, {
            turn: 2
        });
    case 'DRAW_TWO':
        return Object.assign({}, state, {
            drawTwo: true
        });
    case 'ADD_PLAYER':
        return Object.assign({}, state, {
            players: update(state.players, {$push: [action.player]}),
            get playerCount () {
                return state.players.length;
            }  
        });
    case 'PLAY_CARD':
        var item = state.players[action.player];
        return Object.assign({}, state, {
            discardStack: update(state.discardStack, { $push: [action.card ]}),
            players: update(state.players, {$merge: {
                [action.player]: {
                    deck: update(item.deck, {$splice: [[action.key, 1]]}),
                    connectionID: item.connectionID,
                    username: item.username,
                    score: item.score
                }
            }})
        });
    case 'DRAW_CARD':
        cp = state.drawStack.slice();
        item = state.players[action.player];
        return Object.assign({}, state, {
            players: update(state.players, {$merge: {
                [action.player]: {
                    deck: update(item.deck, {$push: cp.slice(0, 1)}),
                    connectionID: item.connectionID,
                    username: item.username,
                    score: item.score
                }
            }}),
            drawStack: cp.slice(1)
        });
    case 'CARD_REVERSE':
        return Object.assign({}, state, {
            direction: action.direction
        });
    case 'CHANGE_COLOR':
        return Object.assign({}, state, {
            color: action.color
        });
    default:
      return state
    }
}

export default game;